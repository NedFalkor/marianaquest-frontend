import { IDiverProfile } from '@/interfaces/DiverProfile';
import axios from 'axios';

export const backendUrl = 'http://127.0.0.1:8000';

export default {
    createDiverProfile(formData: FormData) {
        return axios.post(`${backendUrl}/api/diver-profiles/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log("Réponse du serveur lors de la création:", response);
            return response;
        })
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

    updateDiverProfile(id: number, formData: FormData) {
        return axios.put(`${backendUrl}/api/diver-profiles/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    deleteDiverProfile(id: number): Promise<void> {
        return axios.delete(`${backendUrl}/api/diver-profiles/${id}/`);
    }
};
