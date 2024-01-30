// Importez l'instance Axios configurée
import instance from '../axiosConfig';
import { ICustomUser } from '@/interfaces/CustomUser';
import Cookies from 'js-cookie';

export default {
    // Créer un nouvel utilisateur
    createUser(data: ICustomUser) {
        return instance.post('register/', data);
    },

    // Récupérer un utilisateur spécifique par ID
    getUserById(id: number) {
        return instance.get(`users/${id}/`);
    },

      // Récupérer tous les utilisateurs
    getAllUsers() {
        return instance.get('users/');
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
    async deleteAccount() {
        try {
            const response = await instance.delete('auth/delete_account/');
            if (response.status === 204) {
                localStorage.removeItem('jwtToken');
                this.clearAuthCookies();
            } else {
                console.log('Something else happened:', response.status);
            }
            return response;
        } catch (error) {
            console.error('Error deleting account:', error);
            throw error;
        }
    },

    // Authentifier un utilisateur
    loginUser(data: { email: string, username: string, password: string }) {
        return instance.post('auth/login/', data);
    },

    // Déconnecter un utilisateur
    async logoutUser() {
        try {
          const response = await instance.post('auth/logout/');
          if (response.status === 200) {
            // Assuming the logout was successful, clear the local storage and cookies
            localStorage.removeItem('jwtToken');
            Cookies.remove('jwtToken'); // Use the correct cookie name if different
            // You can also redirect the user to the login page or perform other cleanup actions here
          } else {
            console.log('Logout failed with status:', response.status);
          }
          return response;
        } catch (error) {
          console.error('Error during logout:', error);
          throw error;
        }
      },

      clearAuthCookies() {
        // Effacement du cookie en utilisant js-cookie
        Cookies.remove('jwtToken');
    },
    
};
