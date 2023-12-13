// axiosConfig.ts
import axios from 'axios';

const token = localStorage.getItem('jwtToken');
const authHeader = token ? `Bearer ${token}` : '';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: { 'Authorization': authHeader }
});

export default instance;
