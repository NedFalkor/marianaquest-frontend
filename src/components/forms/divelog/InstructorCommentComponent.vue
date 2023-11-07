
<template>
    <div>
        <!-- Section displaying the comment -->
        <div v-if="comment">
            <p>{{ comment.content }}</p>
            <button @click="editMode = true">Modifier</button>
            <button @click="deleteComment">Supprimer</button>
        </div>
        <!-- Form for adding or editing a comment -->
        <div v-if="!comment || editMode">
            <textarea v-model="editContent"></textarea>
            <button @click="saveComment">Enregistrer</button>
        </div>
    </div>
</template>

<script lang="ts">
import CommentService from '@/services/InstructorCommentService';
import { IComment } from '@/interfaces/InstructorComment';

export default {
    props: {
        divingLogId: {
            type: Number,
            required: true
        },
        instructorId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            comment: null as IComment | null,
            editMode: false,
            editContent: '',
        };
    },
    methods: {
        saveComment() {
            if (this.editContent) {
                if (this.editContent && this.comment?.id) {
                    CommentService.updateComment(this.comment.id, this.instructorId, this.editContent)
                        .then(response => {
                            this.comment = response.data; // Update the local comment data with the response
                            this.editMode = false;
                            this.$emit('comment-updated', this.comment);
                        })
                        .catch(error => {
                            console.error('Failed to update comment:', error);
                        });
                } else {
                    CommentService.postComment(this.divingLogId, this.instructorId, this.editContent)
                        .then(response => {
                            this.comment = response.data; // Set the newly created comment as the local comment data
                            this.editContent = ''; // Clear the textarea
                            this.$emit('comment-posted', this.comment);
                        })
                        .catch(error => {
                            console.error('Failed to post new comment:', error);
                        });
                }
            }
        },
        deleteComment() {
            if (this.comment && this.comment.id) {
                CommentService.deleteComment(this.comment.id)
                    .then(() => {
                        this.comment = null; // Clear the local comment data
                        this.$emit('comment-deleted');
                    })
                    .catch(error => {
                        console.error('Failed to delete comment:', error);
                    });
            }
        }
    },
    // You can add created or mounted lifecycle hook to fetch the initial comment if necessary
};
</script>

