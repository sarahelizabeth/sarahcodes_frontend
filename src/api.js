import axios from 'axios';

export const API = axios.create({
  // baseURL: `http://localhost:8000`,
  // baseURL: `https://api.sarahcodes.xyz`,
  baseURL: import.meta.env.VITE_API_URL
});
