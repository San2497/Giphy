import axios from 'axios';

// Create an isolated instance of Axios
const axiosInstance = axios.create();

// Track pending requests to allow automated cancellation tokens behind the scenes
const activeRequests = {};

/**
 * Global request wrapper module that intercept calls,
 * automatically appends tracking hooks, and cleanly flattens responses.
 */
const requestHandler = async (method, url, config = {}) => {
  // Create a unique cache key based on the full request identity (method + baseURL + url + params)
  const baseURL = config.baseURL || '';
  const paramString = config.params ? JSON.stringify(config.params) : '';
  const requestKey = `${method}_${baseURL}${url}_${paramString}`;

  // If a previous uncompleted network call exists for this exact stream, terminate it
  if (activeRequests[requestKey]) {
    activeRequests[requestKey].cancel("Operation aborted due to a newer concurrent call request.");
  }

  // Generate a fresh tracking cancel token source for this execution line
  activeRequests[requestKey] = axios.CancelToken.source();

  try {
    const response = await axiosInstance({
      method,
      url,
      ...config,
      cancelToken: activeRequests[requestKey].token,
    });
    
    return response;
  } catch (error) {
    // If the error stems strictly from an intentional cancellation event, intercept silently
    if (axios.isCancel(error)) {
      console.log("Stale side request successfully discarded:", error.message);
      return new Promise(() => {}); // Returns a pending promise to cleanly halt downstream rendering
    }
    
    console.error("Network interface error status encountered:", error);
    throw error;
  }
};

// Export individual REST methods to precisely mirror the application syntax used later (e.g., api.get)
const api = {
  get: (url, config) => requestHandler('get', url, config),
  post: (url, data, config) => requestHandler('post', url, { ...config, data }),
  put: (url, data, config) => requestHandler('put', url, { ...config, data }),
  delete: (url, config) => requestHandler('delete', url, config),
};

export default api;