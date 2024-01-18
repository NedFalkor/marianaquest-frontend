import instance from '../axiosConfig';

export default {
    createDiverProfile(data: any) {
        return instance.post('api/diver-profiles/', data);
    },

    getAllDiverProfiles() {
        return instance.get('api/diver-profiles/');
    },

    getDiverProfileById(id: number) {
        return instance.get(`api/diver-profiles/${id}/`);
    },

    updateDiverProfile(id: number, data: any) {
        return instance.put(`api/diver-profiles/${id}/`, data);
    },

    deleteDiverProfile(id: number) {
        return instance.delete(`api/diver-profiles/${id}/`);
    }
};
