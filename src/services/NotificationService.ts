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
    notifyCommentAdded(logId: number, commenterId: number, commentText: string) {
        return axios.post(`${backendUrl}/api/notify-comment/`, {
            logId: logId,
            commenterId: commenterId,
            commentText: commentText,
        });
    },
    requestLogModification(logId: number, diverId: number, modificationDetails: string) {
        return axios.post(`${backendUrl}/api/modification-request/`, {
            logId: logId,
            diverId: diverId,
            modificationDetails: modificationDetails,
        });
    },
    confirmLogDeletion(logId: number, diverId: number) {
        return axios.post(`${backendUrl}/api/confirm-deletion/`, {
            logId: logId,
            diverId: diverId,
        });
    },
    sendGeneralNotification(userId: number, message: string) {
        return axios.post(`${backendUrl}/api/general-notification/`, {
            userId: userId,
            message: message,
        });
    },
    notifyUser(message: string) {
        // Implement your notification logic here
        // For example, this could be a simple alert, a toast notification, or a modal dialog
        alert(message);
    }
};
