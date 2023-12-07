import { IDiverProfile } from '@/interfaces/DiverProfile';
import axios from 'axios';

export const backendUrl = 'http://127.0.0.1:8000';

export default {
    createDiverProfile(data: IDiverProfile) {
        return axios.post(`${backendUrl}/api/diver-profiles/`, data)
          .catch(error => {
            console.error('Erreur lors de la création du profil de plongeur:', error.response);
            throw error;
          });
    },

    getAllDiverProfiles(): Promise<IDiverProfile[]> {
        return axios.get(`${backendUrl}/api/diver-profiles/`);
    },

    getDiverProfileById(id: number): Promise<IDiverProfile> {
        return axios.get(`${backendUrl}/api/diver-profiles/${id}/`);
    },

    updateDiverProfile(id: number, data: IDiverProfile) {
        return axios.put(`${backendUrl}/api/diver-profiles/${id}/`, data);
    },

    deleteDiverProfile(id: number): Promise<void> {
        return axios.delete(`${backendUrl}/api/diver-profiles/${id}/`);
    }
};
