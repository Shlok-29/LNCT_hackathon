import axios from 'axios';

// Create an Axios instance with a base URL
// In a real app, this would be an environment variable like process.env.VITE_API_URL
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'https://fincash-1.onrender.com') + '/api', // Production backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized (e.g., logout user)
      localStorage.removeItem('token');
      // window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default api;
