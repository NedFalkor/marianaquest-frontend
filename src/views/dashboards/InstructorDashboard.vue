<template>
    <header-component class="mb-4"></header-component>
    <TitleComponent class="text-center text-blue-900 mb-8" :pageTitle="pageTitle" />
    <div class="dashboard-container">
        <personnal-info :personal-information="userData.personalInformation" @update-user-data="updateUserData" />
        <emergency-info :emergency-info="userData.emergencyContact" @update-emergency-info="updateUserData" />
    </div>
    <div class="bg-gray-100 w-full p-6">
        <div class="mb-4">Liste des Logs plongeurs en attente</div>
        <dive-log-list-component :diveLogs="divingLogs" :isInstructor="true" @comment-posted="handleCommentPost"
            @request-modification="handleRequestModification"
            @confirm-deletion="handleConfirmDeletion"></dive-log-list-component>
    </div>
</template>

<script lang="ts">
import DiveLogService from '@/services/forms/DiveLogService';
import { IDivingLog } from '@/interfaces/DivingLog';
import { defineComponent } from 'vue';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import TitleComponent from '@/components/header/TitleComponent.vue';
import DiveLogListComponent from '@/components/lists/DiveLogListComponent.vue';
import CustomUserService from '@/services/gatekeepers/CustomUserService';
import { IComment } from '@/interfaces/InstructorComment';
import { ICustomUser } from '@/interfaces/Users/CustomUser';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import NotificationService from '@/services/NotificationService';
import PersonnalInfoComponent from '@/components/forms/useridentity/PersonalInfoComponent.vue';
import EmergencyInfoComponent from '@/components/forms/useridentity/EmergencyInfoComponent.vue';

export default defineComponent({
    components: {
        HeaderComponent,
        TitleComponent,
        DiveLogListComponent,
        'personnal-info': PersonnalInfoComponent,
        'emergency-info': EmergencyInfoComponent,
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
        instructorIdFromRoute(): number | null {
            const route = this.$route as RouteLocationNormalizedLoaded;
            return route.params.instructorId ? parseInt(route.params.instructorId as string, 10) : null;
        },
        pageTitle() {
            return this.userData && this.userData.username ? `Dashboard de ${this.userData.username}` : 'Dashboard';
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
                    console.error('Erreur recup data user:', error);
                }
            }
        },
        loadDivingLogs() {
            DiveLogService.getAllAwaitingDiveLogs()
                .then(response => { this.divingLogs = response.data; })
                .catch(error => { console.error('échoué à charger les logs:', error); });
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
            if (this.userData.id !== undefined && divingLogId !== undefined) {
                try {
                    const response = await DiveLogService.requestLogModification(divingLogId, this.userData.id, modificationDetails);
                    console.log('requete de modif validée', response.data);
                    NotificationService.notifyUser('requete de modif validé');
                } catch (error) {
                    console.error('echec requete modif:', error);
                    NotificationService.notifyUser('echec requete modif');
                }
            } else {
                console.error('user data id ou diving lof id est undefined');
                NotificationService.notifyUser('user data id ou diving lof id est undefined');
            }
        },

        async handleConfirmDeletion(divingLogId: number) {
            if (this.userData.id !== undefined && divingLogId !== undefined) {
                try {
                    const response = await DiveLogService.confirmLogDeletion(divingLogId, this.userData.id);
                    console.log('log effacement validé', response.data);
                    NotificationService.notifyUser('effacement log valide');
                    this.loadDivingLogs();
                } catch (error) {
                    console.error('échoué à confirmer la suppression:', error);
                    NotificationService.notifyUser('échoué à confirmer la suppression:');
                }
            } else {
                console.error('userdata ou diving log id est undefined');
                NotificationService.notifyUser('Error: userdata ou diving log id est undefined');
            }
        },
    },
});
</script>