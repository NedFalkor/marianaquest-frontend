import { IDiverProfile } from '@/interfaces/DiverProfile';  // Assurez-vous d'avoir une interface appropriée pour DiverProfile
import axios from 'axios';

export const backendUrl = 'http://127.0.0.1:8000';

export default {
    // Créer un nouveau profil de plongeur
    createDiverProfile(data: IDiverProfile) {
        return axios.post(`${backendUrl}/api/diver-profiles/`, data);
    },

    // Récupérer tous les profils de plongeurs
    getAllDiverProfiles() {
        return axios.get(`${backendUrl}/api/diver-profiles/`);
    },

    // Récupérer un profil de plongeur spécifique par ID
    getDiverProfileById(id: number) {
        return axios.get(`${backendUrl}/api/diver-profiles/${id}/`);
    },

    // Mettre à jour un profil de plongeur spécifique
    updateDiverProfile(id: number, data: IDiverProfile) {
        return axios.put(`${backendUrl}/api/diver-profiles/${id}/`, data);
    },

    // Supprimer un profil de plongeur
    deleteDiverProfile(id: number) {
        return axios.delete(`${backendUrl}/api/diver-profiles/${id}/`);
    }
};
