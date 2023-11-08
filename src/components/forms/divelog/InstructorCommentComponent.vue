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
import { defineComponent } from 'vue';
import { IComment } from '@/interfaces/InstructorComment';
import InstructorCommentService from '@/services/InstructorCommentService';

export default defineComponent({
    name: 'CommentComponent',
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
                if (this.comment && this.comment.id) {
                    InstructorCommentService.updateComment(this.comment.id, this.instructorId, this.editContent)
                        .then(response => {
                            this.comment = response.data;
                            this.editMode = false;
                            this.editContent = '';
                            this.$emit('comment-updated', this.comment);
                        })
                        .catch(error => {
                            console.error('Failed to update comment:', error);
                        });
                } else {
                    InstructorCommentService.postComment(this.divingLogId, this.instructorId, this.editContent)
                        .then(response => {
                            this.comment = response.data;
                            this.editContent = '';
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
                InstructorCommentService.deleteComment(this.comment.id)
                    .then(() => {
                        this.comment = null;
                        this.editMode = false;
                        this.editContent = '';
                        this.$emit('comment-deleted');
                    })
                    .catch(error => {
                        console.error('Failed to delete comment:', error);
                    });
            }
        }
    },
});
</script>
  