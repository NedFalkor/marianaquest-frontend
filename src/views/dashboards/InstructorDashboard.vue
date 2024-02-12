<template>
    <header-component class="mb-4"></header-component>
    <TitleComponent class="text-center text-blue-900 mb-8" :pageTitle="'Dashboard de ' + userData.username" />
    <div class="bg-gray-100 w-full p-6">
        <!-- Affichage de la liste des logs de plongée avec la possibilité de commenter pour l'instructeur -->
        <dive-log-list-component :diveLogs="divingLogs" :isInstructor="true" @comment-posted="handleCommentPost"
            @request-modification="handleRequestModification"
            @confirm-deletion="handleConfirmDeletion"></dive-log-list-component>
    </div>
</template>

<script lang="ts">
import DiveLogService from '@/services/forms/DiveLogService';
import DiveLogListComponent from '@/components/forms/divelog/DiveLogListComponent.vue';
import { IDivingLog } from '@/interfaces/DivingLog';
import { defineComponent } from 'vue';
import CustomUserService from '@/services/gatekeepers/CustomUserService';
import { IComment } from '@/interfaces/InstructorComment';
import { ICustomUser } from '@/interfaces/Users/CustomUser';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import NotificationService from '@/services/NotificationService';

export default defineComponent({
    components: {
        DiveLogListComponent,
    },
    props: {
        divingLogId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            instructorId: (null as number | null),
            divingLogs: [] as IDivingLog[],
            userData: {} as ICustomUser,
        };
    },
    async mounted() {
        await this.fetchUserData();
        this.loadDivingLogs();
    },
    computed: {
        // Use a computed property to get the instructorId from the route
        instructorIdFromRoute(): number | null {
            const route = this.$route as RouteLocationNormalizedLoaded;
            return route.params.instructorId ? parseInt(route.params.instructorId as string, 10) : null;
        },
    },
    methods: {
        async fetchUserData() {
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await CustomUserService.getUserById(Number(userId));
                    this.userData = response.data;
                    if (this.userData?.role === 'FORMATEUR') {
                        this.instructorId = this.userData.id as number | null;
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        },
        loadDivingLogs() {
            DiveLogService.getAllAwaitingDiveLogs()
                .then(response => { this.divingLogs = response.data; })
                .catch(error => { console.error('Failed to load diving logs:', error); });
        },
        handleCommentPost(comment: IComment) {
            const log = this.divingLogs.find(l => l.id === comment.diving_log);
            if (log) {
                log.comments = log.comments || [];
                log.comments.push(comment);
            }
        },
        updateUserData(updatedUserData: ICustomUser) {
            this.userData = updatedUserData;
        },

        async handleRequestModification(divingLogId: number, modificationDetails: string) {
            // Assurez-vous que instructorId et divingLogId sont définis
            if (this.userData.id !== undefined && divingLogId !== undefined) {
                try {
                    const response = await DiveLogService.requestLogModification(divingLogId, this.userData.id, modificationDetails);
                    console.log('Modification requested successfully', response.data);
                    NotificationService.notifyUser('Modification requested successfully');
                } catch (error) {
                    console.error('Failed to request modification:', error);
                    NotificationService.notifyUser('Failed to request modification');
                }
            } else {
                console.error('UserData ID or DivingLog ID is undefined');
                NotificationService.notifyUser('Error: User or Diving Log ID is undefined');
            }
        },

        async handleConfirmDeletion(divingLogId: number) {
            // Assurez-vous que instructorId et divingLogId sont définis
            if (this.userData.id !== undefined && divingLogId !== undefined) {
                try {
                    const response = await DiveLogService.confirmLogDeletion(divingLogId, this.userData.id);
                    console.log('Log deletion confirmed successfully', response.data);
                    NotificationService.notifyUser('Log deletion confirmed successfully');
                    // Après confirmation, rechargez ou mettez à jour la liste des journaux de plongée
                    this.loadDivingLogs();
                } catch (error) {
                    console.error('Failed to confirm deletion:', error);
                    NotificationService.notifyUser('Failed to confirm deletion');
                }
            } else {
                console.error('UserData ID or DivingLog ID is undefined');
                NotificationService.notifyUser('Error: User or Diving Log ID is undefined');
            }
        },
    },
});
</script>