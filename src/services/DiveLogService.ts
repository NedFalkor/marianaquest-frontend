import { IDivingLog } from '@/interfaces/DivingLog';
import axios from 'axios';

export const backendUrl = 'http://127.0.0.1:8000';

export default {
    // Créer un nouveau log de plongée
    createDiveLog(data: IDivingLog) {
        return axios.post(`${backendUrl}/api/diving-logs/`, data);
    },

    // Récupérer tous les logs de plongée
    getAllDiveLogs() {
        return axios.get(`${backendUrl}/api/diving-logs/`);
    },

    // Récupérer un log de plongée spécifique par ID
    getDiveLogById(id: number) {
        return axios.get(`${backendUrl}/api/diving-logs/${id}/`);
    },

    // Mettre à jour un log de plongée spécifique
    updateDiveLog(id: number, data: IDivingLog) {
        return axios.put(`${backendUrl}/api/diving-logs/${id}/`, data);
    },

    // Supprimer un log de plongée
    deleteDiveLog(id: number) {
        return axios.delete(`${backendUrl}/api/diving-logs/${id}/`);
    },

    getDiveLogsByDiver(diverId: number) {
        return axios.get(`${backendUrl}/api/diving-logs/diver/${diverId}/`);
    },
};
