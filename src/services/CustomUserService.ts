// Importez l'instance Axios configurée
import instance from './axiosConfig';
import { ICustomUser } from '@/interfaces/CustomUser';

export default {
    // Créer un nouvel utilisateur
    createUser(data: ICustomUser) {
        return instance.post('register/', data);
    },

    // Récupérer un utilisateur spécifique par ID
    getUserById(id: number) {
        return instance.get(`users/${id}/`);
    },

    // Mettre à jour un utilisateur spécifique
    updateUser(id: number, data: ICustomUser) {
        return instance.put(`users/${id}/`, data);
    },

    // Supprimer un utilisateur
    deleteUser(id: number) {
        return instance.delete(`users/${id}/`);
    },

    // supprimer un compte utilisateur
    deleteAccount() {
        return instance.delete('auth/delete_account/');
    },

    // Authentifier un utilisateur
    loginUser(data: { email: string, username: string, password: string }) {
        return instance.post('auth/login/', data);
    },

    // Déconnecter un utilisateur
    logoutUser() {
        return instance.post('auth/logout/');
    },
    
};
