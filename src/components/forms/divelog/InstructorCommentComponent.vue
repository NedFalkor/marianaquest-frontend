<template>
    <div class="bg-gray-100 p-6 rounded-lg">
        <!-- Section displaying the comment -->
        <div v-if="comment" class="mb-4">
            <p class="text-gray-700">{{ comment.content }}</p>
            <button @click="editMode = true"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Modifier</button>
            <button @click="deleteComment"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Supprimer</button>
        </div>

        <!-- Form for adding or editing a comment -->
        <div v-if="!comment || editMode">
            <textarea v-model="editContent"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            <button @click="saveComment"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Enregistrer</button>
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