<template>
    <div>
        <DiveLogList :diveLogs="divingLogs">
            <template #default="{ log }">
                <!-- Ensure that the instructorId passed down is not null -->
                <InstructorCommentComponent v-if="instructorId !== null" :divingLogId="log.id" :instructorId="instructorId"
                    @comment-posted="handleCommentPosted" @comment-updated="handleCommentUpdated"
                    @comment-deleted="handleCommentDeleted" />
            </template>
        </DiveLogList>
    </div>
</template>
  
<script lang="ts">
import InstructorCommentComponent from '@/components/forms/divelog/InstructorCommentComponent.vue';
import DiveLogService from '@/services/forms/DiveLogService';
import { IDivingLog } from '@/interfaces/DivingLog';
import { defineComponent } from 'vue';
import InstructorCommentService from '@/services/InstructorCommentService';
import { IComment } from '@/interfaces/InstructorComment';

export default defineComponent({
    components: {
        InstructorCommentComponent,
    },
    data() {
        return {
            instructorId: null as number | null,
            divingLogs: [] as IDivingLog[],
            selectedLog: null as IDivingLog | null,
        };
    },
    methods: {
        loadDivingLogs(): void {
            DiveLogService.getAllDiveLogs()
                .then((response) => {
                    this.divingLogs = response.data;
                })
                .catch((error) => {
                    console.error('Failed to load diving logs:', error);
                });
        },
        selectLog(log: IDivingLog): void {
            this.selectedLog = log;
        },
        getCurrentUserId(): string | null {
            return sessionStorage.getItem('userId');
        },
        handleCommentPosted(diveLogId: number, commentText: string): void {
            if (this.instructorId) {
                InstructorCommentService.postComment(diveLogId, this.instructorId, commentText)
                    .then((response) => {
                        this.updateDiveLogComments(diveLogId, response.data);
                        this.notifyUser('Comment posted successfully.');
                    })
                    .catch((error) => {
                        this.notifyUser('Error posting comment.');
                        console.error('Error posting comment:', error);
                    });
            }
        },

        handleCommentUpdated(commentId: number, updatedCommentText: string): void {
            if (this.instructorId) {
                InstructorCommentService.updateComment(commentId, this.instructorId, updatedCommentText)
                    .then((response) => {
                        this.updateCommentInDiveLog(commentId, response.data);
                        this.notifyUser('Comment updated successfully.');
                    })
                    .catch((error) => {
                        this.notifyUser('Error updating comment.');
                        console.error('Error updating comment:', error);
                    });
            }
        },

        handleCommentDeleted(commentId: number): void {
            InstructorCommentService.deleteComment(commentId)
                .then(() => {
                    this.removeCommentFromDiveLog(commentId);
                    this.notifyUser('Comment deleted successfully.');
                })
                .catch((error) => {
                    this.notifyUser('Error deleting comment.');
                    console.error('Error deleting comment:', error);
                });
        },

        updateDiveLogComments(diveLogId: number, newComment: IComment): void {
            const diveLog = this.divingLogs.find((log) => log.id === diveLogId);
            if (diveLog) {
                if (!diveLog.comments) {
                    diveLog.comments = []; // Initialize the comments array if it does not exist
                }
                diveLog.comments.push(newComment);
            }
        },

        updateCommentInDiveLog(commentId: number, updatedComment: IComment): void {
            this.divingLogs.forEach((log) => {
                if (log.comments) {
                    const commentIndex = log.comments.findIndex((c) => c.id === commentId);
                    if (commentIndex !== -1) {
                        log.comments[commentIndex] = updatedComment;
                    }
                }
            });
        },

        removeCommentFromDiveLog(commentId: number): void {
            this.divingLogs.forEach((log) => {
                if (log.comments) {
                    const commentIndex = log.comments.findIndex((c) => c.id === commentId);
                    if (commentIndex !== -1) {
                        log.comments.splice(commentIndex, 1);
                    }
                }
            });
        },

        notifyUser(_message: string): void {
            // Logic to notify user, can be a toast message, modal, etc.
        },
    },
    mounted(): void {
        const instructorProfileRaw = sessionStorage.getItem('instructorProfile');
        if (instructorProfileRaw) {
            const instructorProfile = JSON.parse(instructorProfileRaw);
            if (instructorProfile && instructorProfile.role === 'FORMATEUR') {
                this.instructorId = instructorProfile.id;
                this.loadDivingLogs();
            } else {
                // Redirection or other logic if the user is not an instructor
                this.$router.push('/unauthorized'); // Redirect to an 'Unauthorized' page, for example
            }
        } else {
            // If no profile is found, redirect or handle as necessary
            this.$router.push('/login'); // Redirect to the login page, for example
        }
    },
});
</script>