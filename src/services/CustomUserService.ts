
import { ICustomUser } from '@/interfaces/CustomUser';
import axios from 'axios';

export const backendUrl = 'http://127.0.0.1:8000';

export default {
    // Créer un nouvel utilisateur
    createUser(data: ICustomUser) {
        return axios.post(`${backendUrl}/api/register/`, data);
    },

    // Récupérer un utilisateur spécifique par ID
    getUserById(id: number) {
        return axios.get(`${backendUrl}/api/users/${id}/`);
    },

    // Mettre à jour un utilisateur spécifique
    updateUser(id: number, data: ICustomUser) {
        return axios.put(`${backendUrl}/api/users/${id}/`, data);
    },

    // Supprimer un utilisateur
    deleteUser(id: number) {
        return axios.delete(`${backendUrl}/api/users/${id}/`);
    },

    deleteAccount() {
        return axios.delete(`${backendUrl}/api/auth/delete_account/`);
    },

    // Authentifier un utilisateur
    loginUser(data: { email: string, username: string, password: string }) {
        return axios.post(`${backendUrl}/api/login/`, data);
    },

    logoutUser() {
        return axios.post(`${backendUrl}/api/auth/logout/`);
    },
    
};

