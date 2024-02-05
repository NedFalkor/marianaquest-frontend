import instance from '../axiosConfig';
import { IDiverProfile } from '@/interfaces/Users/DiverProfile';
import Cookies from 'js-cookie';

export default {
  // Créer un profil de plongeur
  createDiverProfile(data: IDiverProfile) {
    return instance.post('diver-profiles/', data);
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
  updateDiverProfile(id: number, data: IDiverProfile) {
    return instance.put(`diver-profiles/${id}/`, data);
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