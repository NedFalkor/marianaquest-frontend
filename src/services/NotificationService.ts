import instance from "./axiosConfig";


export default {

    // Demander la suppression d'un log 
    requestDeleteDiveLog(logId: number, diverId: number) {
        return instance.post('api/delete-request/', {
            logId: logId,
            diverId: diverId,
        });
    },

    // Notifier un commentaire ajouté
    notifyCommentAdded(logId: number, commenterId: number, commentText: string) {
        return instance.post('api/notify-comment/', {
            logId: logId,
            commenterId: commenterId,
            commentText: commentText,
        });
    },

    // Demander une modification d'un log
    requestLogModification(logId: number, diverId: number, modificationDetails: string) {
        return instance.post('api/modification-request/', {
            logId: logId,
            diverId: diverId,
            modificationDetails: modificationDetails,
        });
    },

    // Confirmer la suppression d'un log
    confirmLogDeletion(logId: number, diverId: number) {
        return instance.post('api/confirm-deletion/', {
            logId: logId,
            diverId: diverId,
        });
    },

    // Envoyer une notification générale
    sendGeneralNotification(userId: number, message: string) {
        return instance.post('api/general-notification/', {
            userId: userId,
            message: message,
        });
    },

    // Notifier un utilisateur
    notifyUser(message: string) {
        alert(message);
    }
};
