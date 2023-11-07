import axios from 'axios';
const backendUrl = 'http://127.0.0.1:8000';

export default {
    postComment(diveLogId: number, instructorId: number, commentText: string) {
        const commentData = { diving_log: diveLogId, instructor: instructorId, content: commentText };
        return axios.post(`${backendUrl}/api/divelog-comments/`, commentData);
    },

    // Assuming that getCommentsByDiveLog might be used elsewhere
    getCommentsByDiveLog(diveLogId: number) {
        return axios.get(`${backendUrl}/api/divelog-comments/?diving_log=${diveLogId}`);
    },

    updateComment(commentId: number, instructorId: number, updatedCommentText: string) {
        const updatedCommentData = { instructor: instructorId, content: updatedCommentText };
        return axios.put(`${backendUrl}/api/divelog-comments/${commentId}/`, updatedCommentData);
    },

    deleteComment(commentId: number) {
        return axios.delete(`${backendUrl}/api/divelog-comments/${commentId}/`);
    },
};
