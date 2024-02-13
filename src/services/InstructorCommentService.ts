import instance from "./axiosConfig";


export default {

    // Poster un commentaire
    postComment(diveLogId: number, instructorId: number, commentText: string) {
        const commentData = { diving_log: diveLogId, instructor: instructorId, content: commentText };
        return instance.post('divelog-comments/', commentData);
    },

    // Récupérer les commentaires par log
    getCommentsByDiveLog(diveLogId: number) {
        return instance.get(`divelog-comments/?diving_log=${diveLogId}`);
    },

    // Mettre à jour un commentaire
    updateComment(commentId: number, instructorId: number, updatedCommentText: string) {
        const updatedCommentData = { instructor: instructorId, content: updatedCommentText };
        return instance.put(`divelog-comments/${commentId}/`, updatedCommentData);
    },

    // Supprimer un commentaire
    deleteComment(commentId: number) {
        return instance.delete(`divelog-comments/${commentId}/`);
    },
};

