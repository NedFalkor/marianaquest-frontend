import instance from '../axiosConfig';

export const backendUrl = 'http://127.0.0.1:8000';

export default {
    createDiverProfile(data: any) {
        return instance.post(`${backendUrl}/api/diver-profiles/`, data);
    },

    // Récupérer tous les profils de plongeurs
    getAllDiverProfiles() {
        return instance.get(`${backendUrl}/api/diver-profiles/`);
    },

    // Récupérer un profil de plongeur spécifique par ID
    getDiverProfileById(id: number) {
        return instance.get(`${backendUrl}/api/diver-profiles/${id}/`);
    },

    updateDiverProfile(id: number, data: any) {
        return instance.put(`${backendUrl}/api/diver-profiles/${id}/`, data);
    },

    // Supprimer un profil de plongeur
    deleteDiverProfile(id: number) {
        return instance.delete(`${backendUrl}/api/diver-profiles/${id}/`);
    }
};