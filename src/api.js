import axios from 'axios';

export const API = axios.create({
  baseURL: `http://localhost:8000`,
  // baseURL: `http://24.144.104.232:1337`,
  // baseURL: `http://${process.env.REACT_APP_API_URL}:8000`,
});
