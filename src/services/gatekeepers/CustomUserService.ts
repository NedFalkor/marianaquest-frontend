// Importez l'instance Axios configurée
import axios, { AxiosError } from 'axios';
import instance, { clearAuthCookies } from '../axiosConfig';
import { ICustomUser } from '@/interfaces/Users/CustomUser';

// Écouteur d'événement beforeunload pour effacer les cookies lors de la fermeture de l'onglet ou de la navigation
window.addEventListener('beforeunload', () => {
  clearAuthCookies();
});

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
          clearAuthCookies(); // Utilisez la fonction clearAuthCookies
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
    async loginUser(data: { email: string, username: string, password: string }) {
      // Clear any old tokens before starting a new login process
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
    
      console.log('Attempting to log in with:', data);
    
      try {
        const response = await instance.post('auth/login/', data);
        console.log('Login response:', response);
    
        // Ensure that the response contains the access token
        if (response.data && response.data.access) {
          localStorage.setItem('jwtToken', response.data.access);
          console.log('New access token saved to localStorage:', response.data.access);
    
          if (response.data.refresh) {
            localStorage.setItem('refreshToken', response.data.refresh);
            console.log('New refresh token saved to localStorage:', response.data.refresh);
          }
        } else {
          // If the expected token is not in the response, log an error
          console.error('Access token not found in response data:', response.data);
        }
    
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.handleLoginError(error);
        } else {
          console.error('Unexpected error:', error);
        }
        throw error; // Re-throw the error if you need to handle it further up the chain
      }
    },
    
    handleLoginError(error: AxiosError) {
      // Check if the error is an AxiosError
      if (error.response) {
        console.error('Login error response:', error.response);
      } else if (error.request) {
        console.error('Login error request:', error.request);
      } else {
        // Error message will exist on an instance of an Error
        console.error('Login error message:', error.message);
      }
    
      console.error('Login error config:', error.config);
    },
    
    
    // Déconnecter un utilisateur
    async logoutUser() {
      try {
        const response = await instance.post('auth/logout/');
        if (response.status === 200) {
          clearAuthCookies(); // Utilisez la fonction clearAuthCookies
          // Vous pouvez également effectuer d'autres actions de nettoyage ici
        } else {
          console.log('Logout failed with status:', response.status);
        }
        return response;
      } catch (error) {
        console.error('Error during logout:', error);
        throw error;
      }
    },
    
};