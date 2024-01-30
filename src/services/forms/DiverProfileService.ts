import instance from '../axiosConfig';

export default {
    createDiverProfile(data: any) {
        return instance.post('diver-profiles/', data);
    },

    getAllDiverProfiles() {
        return instance.get('diver-profiles/');
    },

    getDiverProfileById(id: number) {
        return instance.get(`diver-profiles/${id}/`);
    },

    updateDiverProfile(id: number, data: any) {
        return instance.put(`diver-profiles/${id}/`, data);
    },

    deleteDiverProfile(id: number) {
        return instance.delete(`diver-profiles/${id}/`);
    }
};
