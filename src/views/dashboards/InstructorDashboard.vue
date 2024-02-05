<template>
    <header-component class="mb-4"></header-component>
    <TitleComponent class="text-center text-blue-900 mb-8" :pageTitle="'Dashboard de ' + userData.username" />
    <div class="dashboard-container">
        <PersonalInfo :personal-information="userData.personalInformation" @update-user-data="updateUserData" />
        <EmergencyInfo :emergency-info="userData.emergencyContact" @update-emergency-info="updateUserData" />
    </div>
    <div class="bg-gray-100 w-full p-6">
        <div v-for="log in divingLogs" :key="log.id" class="mb-4 p-4 bg-white shadow rounded">
            <div class="mb-2">
                <span class="font-semibold">Dive Log ID:</span>
                <span>{{ log.id.toString() }}</span>
            </div>
            <InstructorCommentComponent v-if="instructorId !== null" :diving-log-id="log.id.toString()"
                :instructor-id="instructorId" @comment-posted="handleCommentPost($event)" />

        </div>
    </div>
</template>
  
<script lang="ts">
import InstructorCommentComponent from '@/components/forms/divelog/InstructorCommentComponent.vue';
import DiveLogService from '@/services/forms/DiveLogService';
import { IDivingLog } from '@/interfaces/DivingLog';
import { defineComponent } from 'vue';
import CustomUserService from '@/services/gatekeepers/CustomUserService';
import { IComment } from '@/interfaces/InstructorComment';
import { ICustomUser } from '@/interfaces/Users/CustomUser';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export default defineComponent({
    components: {
        InstructorCommentComponent,
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
            DiveLogService.getAllDiveLogs()
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
    },
});
</script>