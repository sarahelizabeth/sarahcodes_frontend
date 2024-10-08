import axios from 'axios';

export const API_KEY =
  'standard_10d6c66e867a19b4c9bb50f52a7dba736ff4b9e992c6f060de9306711858dd9af1613be3293f107ab9e5ab96a3fd6a0e42035425c0cbfe26b7db202b0dc29171a8e906637d4e92af293b04b5bd2cf4a60e8d95c2c3faef7b137f0ea2a126161fae8b1570395e3ab3623e247438f90d78c385447ee68635473de123e84ce291f1';

export const API = axios.create({
  // baseURL: `http://localhost:8000`,
  // baseURL: `https://api.sarahcodes.xyz`,
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: 'https://cloud.appwrite.io/v1',
  headers: {
    // 'X-Appwrite-Project': projectId,
    'X-Appwrite-Key': API_KEY,
    'Content-Type': 'application/json',
  },
});