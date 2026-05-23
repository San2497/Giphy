import api from './api';

const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs/';
const defaultParams = {
  api_key: process.env.REACT_APP_GIPHY_API_KEY,
  limit: 50,
};


export const fetchTrendingGiphys = () => {
  return api.get('trending', {
    baseURL: GIPHY_BASE_URL,
    params: defaultParams,
  });
};
