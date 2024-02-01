// axiosConfig.ts
import axios from 'axios';

const apiBaseUrl: string = process.env.VUE_APP_API_BASE_URL as string;

const instance = axios.create({
  baseURL: apiBaseUrl,
});

// Add an interceptor to add the authentication token to each outgoing request.
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken');
    console.log('Retrieving token from local storage:', token); // Logging the token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers['Authorization']); // Logging the header
    }
    return config;
  },
  error => {
    console.error('Error in request interceptor:', error); // Logging request error
    return Promise.reject(error);
  }
);

export default instance;