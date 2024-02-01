import instance from '../axiosConfig';

export default {
    createDiverProfile(data: any) {
<<<<<<< HEAD
        return instance.post(`${backendUrl}diver-profiles/`, data);
=======
        console.log('Creating diver profile with data:', data);
        return instance.post('diver-profiles/', data);
>>>>>>> 1dace89dadf7b599b7019b630de2a19a76353744
    },

    getAllDiverProfiles() {
<<<<<<< HEAD
        return instance.get(`${backendUrl}diver-profiles/`);
=======
        return instance.get('diver-profiles/');
>>>>>>> 1dace89dadf7b599b7019b630de2a19a76353744
    },

    getDiverProfileById(id: number) {
<<<<<<< HEAD
        return instance.get(`${backendUrl}diver-profiles/${id}/`);
    },

    updateDiverProfile(id: number, data: any) {
        return instance.put(`${backendUrl}diver-profiles/${id}/`, data);
=======
        return instance.get(`diver-profiles/${id}/`);
    },

    updateDiverProfile(id: number, data: any) {
        console.log('Updating diver profile for ID:', id, 'with data:', data);
        return instance.put(`diver-profiles/${id}/`, data);
>>>>>>> 1dace89dadf7b599b7019b630de2a19a76353744
    },

    deleteDiverProfile(id: number) {
<<<<<<< HEAD
        return instance.delete(`${backendUrl}diver-profiles/${id}/`);
=======
        return instance.delete(`diver-profiles/${id}/`);
>>>>>>> 1dace89dadf7b599b7019b630de2a19a76353744
    }
};
