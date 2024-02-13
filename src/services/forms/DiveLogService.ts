import instance from '../axiosConfig';
import { IDivingLog } from '@/interfaces/DivingLog';

export default {
    // Créer un nouveau log de plongée
    createDiveLog(data: IDivingLog) {
        return instance.post('diving-logs/', data);
    },

    // Récupérer tous les logs de plongée
    getAllDiveLogs() {
        return instance.get('diving-logs/');
    },

    // Récupérer tous les logs AWAITING
    getAllAwaitingDiveLogs() {
        return instance.get('diving-logs/?status=AWAITING');
    },

    // Récupérer un log de plongée spécifique par ID
    getDiveLogById(id: number) {
        return instance.get(`diving-logs/${id}/`);
    },

    // Mettre à jour un log de plongée spécifique
    updateDiveLog(id: number, data: IDivingLog) {
        return instance.put(`diving-logs/${id}/`, data);
    },

    // Supprimer un log de plongée
    deleteDiveLog(id: number) {
        return instance.delete(`diving-logs/${id}/`);
    },

    // Récupérer les logs de plongée de l'utilisateur
    getDiveLogsByDiver(diverId: number) {
        return instance.get(`diving-logs/diver/${diverId}/`);
    },

    // Demander une modification du log
    requestLogModification(logId: number, userId: number, modificationDetails: string) {
        return instance.post(`/api/logs/${logId}/modification-request`, {
            userId,
            modificationDetails
        });
    },

    // Confirmer une suppression du log
    confirmLogDeletion(logId: number, userId: number) {
        return instance.post(`/api/logs/${logId}/confirm-deletion`, {
            userId
        });
    },
};
