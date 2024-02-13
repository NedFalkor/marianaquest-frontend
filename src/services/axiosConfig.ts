import axios from 'axios';
import Cookies from 'js-cookie';

const apiBaseUrl: string = process.env.VUE_APP_API_BASE_URL as string;
console.log('API Base URL:', apiBaseUrl);

const instance = axios.create({
  baseURL: apiBaseUrl,
});

// Fonction pour effacer le cookie en utilisant js-cookie
export const clearAuthCookies = () => {
  Cookies.remove('jwtToken');
  localStorage.removeItem('jwtToken');
};

// intercepteur pour ajouter le token dans le header
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken');
    console.log('Retrieving token from local storage:', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers['Authorization']);
    }
    return config;
  },
  error => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

export default instance;