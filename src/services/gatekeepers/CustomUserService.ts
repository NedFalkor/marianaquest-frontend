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
          clearAuthCookies();
        } else {
          console.log('autre chose est arrivée:', response.status);
        }
        return response;
      } catch (error) {
        console.error('erreur effacement compte:', error);
        throw error;
      }
    },

    // Authentifier un utilisateur
    async loginUser(data: { email: string, username: string, password: string }) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
    
      console.log('essaie de se connecter avec:', data);
    
      try {
        const response = await instance.post('auth/login/', data);
        console.log('réponse login:', response);
    
        if (response.data && response.data.access) {
          localStorage.setItem('jwtToken', response.data.access);
          console.log('nouveau access token:', response.data.access);
    
          if (response.data.refresh) {
            localStorage.setItem('refreshToken', response.data.refresh);
            console.log('nouveau refresh token:', response.data.refresh);
          }
        } else {
          console.error('aucun token trouvé:', response.data);
        }
    
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.handleLoginError(error);
        } else {
          console.error('erreur inattendue:', error);
        }
        throw error;
      }
    },
    
    handleLoginError(error: AxiosError) {
      if (error.response) {
        console.error('erreur login:', error.response);
      } else if (error.request) {
        console.error('erreur requete login:', error.request);
      } else {
        console.error('erreur message login:', error.message);
      }
    
      console.error('erreur login config:', error.config);
    },
    
    
    // Déconnecter un utilisateur
    async logoutUser() {
      try {
        const response = await instance.post('auth/logout/');
        if (response.status === 200) {
          clearAuthCookies();
        } else {
          console.log('déco avec statut:', response.status);
        }
        return response;
      } catch (error) {
        console.error('Erreur déco:', error);
        throw error;
      }
    },
    
};