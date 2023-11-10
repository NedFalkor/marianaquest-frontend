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
    name: 'InstructorCommentComponent',
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
        async saveComment() {
            if (!this.editContent.trim()) {
                console.error('Comment content cannot be empty');
                return;
            }

            try {
                let response;
                if (this.comment && this.comment.id) {
                    response = await InstructorCommentService.updateComment(this.comment.id, this.instructorId, this.editContent);
                } else {
                    response = await InstructorCommentService.postComment(this.divingLogId, this.instructorId, this.editContent);
                }

                this.comment = response.data;
                this.editMode = false;
                this.editContent = '';
                this.$emit(this.comment && this.comment.id ? 'comment-updated' : 'comment-posted', this.comment);
            } catch (error) {
                console.error('Failed to save comment:', error);
            }
        },
        async deleteComment() {
            if (this.comment && this.comment.id) {
                try {
                    await InstructorCommentService.deleteComment(this.comment.id);
                    this.comment = null;
                    this.editMode = false;
                    this.editContent = '';
                    this.$emit('comment-deleted');
                } catch (error) {
                    console.error('Failed to delete comment:', error);
                }
            }
        }
    },
});
</script>

  