import api from './api';

const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs/';
const GIPHY_STICKERS_URL = 'https://api.giphy.com/v1/stickers/';

// Sanitize API key (strip quotes/spaces that may come from .env)
const apiKey = (process.env.REACT_APP_GIPHY_API_KEY || '').replace(/[" ]/g, '');

const defaultParams = {
  api_key: apiKey,
  limit: 50,
};

export const fetchTrendingGiphys = () => {
  return api.get('trending', {
    baseURL: GIPHY_BASE_URL,
    params: defaultParams,
  });
};

export const fetchSearchGiphys = (query) => {
  return api.get('search', {
    baseURL: GIPHY_BASE_URL,
    params: {
      ...defaultParams,
      q: query,
    },
  });
};

export const fetchArtistGiphys = (artistName) => {
  return api.get('search', {
    baseURL: GIPHY_BASE_URL,
    params: {
      api_key: apiKey,
      q: artistName,
      limit: 10,
    },
  });
};

export const fetchClipsGiphys = () => {
  return api.get('search', {
    baseURL: GIPHY_BASE_URL,
    params: {
      api_key: apiKey,
      q: 'funny clips moments',
      limit: 20,
    },
  });
};

export const fetchStoriesGiphys = () => {
  return api.get('trending', {
    baseURL: GIPHY_STICKERS_URL,
    params: {
      api_key: apiKey,
      limit: 20,
    },
  });
};
