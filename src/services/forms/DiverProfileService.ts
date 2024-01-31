import instance from '../axiosConfig';

export default {
    createDiverProfile(data: any) {
        console.log('Creating diver profile with data:', data);
        return instance.post('diver-profiles/', data);
    },

    getAllDiverProfiles() {
        return instance.get('diver-profiles/');
    },

    getDiverProfileById(id: number) {
        return instance.get(`diver-profiles/${id}/`);
    },

    updateDiverProfile(id: number, data: any) {
        console.log('Updating diver profile for ID:', id, 'with data:', data);
        return instance.put(`diver-profiles/${id}/`, data);
    },

    deleteDiverProfile(id: number) {
        return instance.delete(`diver-profiles/${id}/`);
    }
};
