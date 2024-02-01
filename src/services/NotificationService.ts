import instance from "./axiosConfig";


export default {
    requestDeleteDiveLog(logId: number, diverId: number) {
        return instance.post('api/delete-request/', {
            logId: logId,
            diverId: diverId,
        });
    },
    notifyCommentAdded(logId: number, commenterId: number, commentText: string) {
        return instance.post('api/notify-comment/', {
            logId: logId,
            commenterId: commenterId,
            commentText: commentText,
        });
    },
    requestLogModification(logId: number, diverId: number, modificationDetails: string) {
        return instance.post('api/modification-request/', {
            logId: logId,
            diverId: diverId,
            modificationDetails: modificationDetails,
        });
    },
    confirmLogDeletion(logId: number, diverId: number) {
        return instance.post('api/confirm-deletion/', {
            logId: logId,
            diverId: diverId,
        });
    },
    sendGeneralNotification(userId: number, message: string) {
        return instance.post('api/general-notification/', {
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
