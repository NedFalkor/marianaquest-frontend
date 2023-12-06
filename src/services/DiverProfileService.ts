import { IDiverProfile } from '@/interfaces/DiverProfile';  // Assurez-vous d'avoir une interface appropriée pour DiverProfile
import axios from 'axios';

export const backendUrl = 'http://127.0.0.1:8000';

export default {
    createDiverProfile(data: any) {
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

    updateDiverProfile(id: number, data: any) {
        return axios.put(`${backendUrl}/api/diver-profiles/${id}/`, data);
    },

    // Supprimer un profil de plongeur
    deleteDiverProfile(id: number) {
        return axios.delete(`${backendUrl}/api/diver-profiles/${id}/`);
    }
};
