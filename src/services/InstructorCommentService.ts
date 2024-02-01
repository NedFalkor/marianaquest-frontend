import instance from "./axiosConfig";


export default {
    postComment(diveLogId: number, instructorId: number, commentText: string) {
        const commentData = { diving_log: diveLogId, instructor: instructorId, content: commentText };
        return instance.post('divelog-comments/', commentData);
    },

    getCommentsByDiveLog(diveLogId: number) {
        return instance.get(`divelog-comments/?diving_log=${diveLogId}`);
    },

    updateComment(commentId: number, instructorId: number, updatedCommentText: string) {
        const updatedCommentData = { instructor: instructorId, content: updatedCommentText };
        return instance.put(`divelog-comments/${commentId}/`, updatedCommentData);
    },

    deleteComment(commentId: number) {
        return instance.delete(`divelog-comments/${commentId}/`);
    },
};

