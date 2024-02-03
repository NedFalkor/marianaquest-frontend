// Importez l'instance Axios configurée
import instance, { clearAuthCookies } from '../axiosConfig';
import { ICustomUser } from '@/interfaces/CustomUser';
import Cookies from 'js-cookie';

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
        console.log('Attempting to log in with:', data);
    
        return instance.post('auth/login/', data)
          .then(response => {
            console.log('Login response:', response);
    
            // Ensure that the response contains the access token
            if (response.data && response.data.access) {
              localStorage.setItem('jwtToken', response.data.access);
              console.log('Access token saved to localStorage');
            } else {
              // If the expected token is not in the response, log an error
              console.error('Access token not found in response data:', response.data);
            }
    
            return response;
          })
          .catch(error => {
            // Log detailed error information
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error('Login error response:', error.response);
            } else if (error.request) {
              // The request was made but no response was received
              console.error('Login error request:', error.request);
            } else {
              // Something happened in setting up the request that triggered an error
              console.error('Login error message:', error.message);
            }
    
            // Log the error config if any
            console.error('Login error config:', error.config);
            throw error;
          });
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
