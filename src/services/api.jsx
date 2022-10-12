import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '29451964-958278d8f10d2abadadf36c5e';
const searchOption = 'image_type=photo&orientation=horizontal';
const HITS_PER_PAGE = 12;

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&${searchOption}&per_page=${HITS_PER_PAGE}&page=${page}`
  );
  return response.data;
};
