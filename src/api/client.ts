import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true, 
  withXSRFToken: true,
  headers: { Accept: 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.error(error); 
    }
    return Promise.reject(error);
  }
);   