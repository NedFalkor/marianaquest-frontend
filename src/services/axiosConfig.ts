// axiosConfig.ts
import axios from 'axios';

const apiBaseUrl: string = process.env.VUE_APP_API_BASE_URL as string;

const instance = axios.create({
  baseURL: apiBaseUrl,
});

// Ajoutez un intercepteur de requête pour ajouter le jeton d'authentification à chaque requête sortante.
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
