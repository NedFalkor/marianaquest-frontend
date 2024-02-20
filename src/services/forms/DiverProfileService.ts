import instance from '../axiosConfig';
import Cookies from 'js-cookie';

export default {
  // Créer un profil de plongeur
  createDiverProfile(data: FormData) {
    return instance.post('diver-profiles/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Récupérer un profil de plongeur spécifique par ID
  getDiverProfileById(id: number) {
    return instance.get(`diver-profiles/${id}/`);
  },

  // Récupérer tous les profils de plongeurs
  getAllDiverProfiles() {
    return instance.get('diver-profiles/');
  },

  // Mettre à jour un profil de plongeur spécifique
  updateDiverProfile(id: number, data: FormData) {
    return instance.put(`api/diver-profiles/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Supprimer un profil de plongeur
  deleteDiverProfile(id: number) {
    return instance.delete(`diver-profiles/${id}/`);
  },

  // effacer les cookies d'authentification
  clearAuthCookies() {
    Cookies.remove('jwtToken');
  },
}