// NotificationService.ts
import axios from 'axios';
const backendUrl = 'http://127.0.0.1:8000';

export default {
    requestDeleteDiveLog(logId: number, diverId: number) {
        return axios.post(`${backendUrl}/api/delete-request/`, {
            logId: logId,
            diverId: diverId,
        });
    },
    // Ajoutez ici d'autres méthodes de notification si nécessaire
};
