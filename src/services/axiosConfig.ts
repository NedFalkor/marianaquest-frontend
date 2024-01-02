// axiosConfig.ts
import axios from 'axios';

// Créez une instance axios avec des configurations par défaut
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
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
