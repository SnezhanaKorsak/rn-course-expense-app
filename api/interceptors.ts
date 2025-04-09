import axios from 'axios';

export const API_URL = process.env.EXPO_PUBLIC_URL;

export const getContentType = () => ({
  'Content-Type': 'application/json',
});

const instance = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
});

export default instance;