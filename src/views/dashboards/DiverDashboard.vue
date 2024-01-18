<template>
    <div class="bg-gray-100 w-full p-6">
        <h2 class="font-bold text-xl mb-4">Diver Dashboard {{ userData.username }}</h2>

        <!-- List of Dive Logs -->
        <div v-for="log in divingLogs" :key="log.id" class="mb-4 p-4 bg-white shadow rounded">
            <div class="mb-2">
                <span class="font-semibold">Dive Log ID:</span> {{ log.id }}
                <span v-if="log.status" class="ml-2">(<span :class="statusClass(log.status)">{{ log.status }}</span>)</span>
            </div>
            <!-- Edit and Delete buttons -->
            <button @click="editLog(log)" class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
            <button @click="deleteLogRequest(log)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
            </button>
            <!-- View Details and Comments -->
            <button @click="viewDetails(log)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                View Details
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DiveLogService from '@/services/forms/DiveLogService';
import NotificationService from '@/services/NotificationService';
import { IDivingLog } from '@/interfaces/DivingLog';
import { ICustomUser } from '@/interfaces/CustomUser';
import CustomUserService from '@/services/gatekeepers/CustomUserService';

export default defineComponent({
    data() {
        return {
            diverId: null as number | null,
            divingLogs: [] as IDivingLog[],
            selectedLog: null as IDivingLog | null,
            editedLog: null as IDivingLog | null,
            isEditing: false,
            viewingDetails: false,
            userData: {} as ICustomUser
        };
    },
    methods: {

        async fetchUserData() {
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await CustomUserService.getUserById(Number(userId));
                    this.userData = response.data;
                } catch (error) {
                    console.error('Erreur lors de la récupération des détails de l’utilisateur:', error);
                }
            }
        },
        loadDivingLogs() {
            if (this.diverId !== null) {
                DiveLogService.getDiveLogsByDiver(this.diverId)
                    .then(response => {
                        this.divingLogs = response.data;
                    })
                    .catch(error => {
                        console.error('Failed to load diving logs:', error);
                    });
            }
        },
        editLog(log: IDivingLog) {
            this.editedLog = { ...log };
            this.isEditing = true;
            // Navigate to edit page or open edit modal
        },
        deleteLogRequest(log: IDivingLog) {
            if (confirm('Are you sure you want to delete this log?')) {
                DiveLogService.deleteDiveLog(log.id)
                    .then(() => {
                        this.divingLogs = this.divingLogs.filter(l => l.id !== log.id);
                        NotificationService.notifyUser('Log deleted successfully');
                    })
                    .catch(error => {
                        console.error('Failed to delete diving log:', error);
                        NotificationService.notifyUser('Error deleting log');
                    });
            }
        },
        viewDetails(log: IDivingLog) {
            this.selectedLog = log;
            this.viewingDetails = true;
        },
        statusClass(status: string) {
            switch (status) {
                case 'AWAITING': return 'text-orange-500';
                case 'VALIDATED': return 'text-green-500';
                case 'REFUSED': return 'text-red-500';
                default: return '';
            }
        },

    },
    mounted() {
        this.fetchUserData();
        const diverProfileRaw = sessionStorage.getItem('diverProfile');
        if (diverProfileRaw) {
            const diverProfile = JSON.parse(diverProfileRaw);
            if (diverProfile && diverProfile.role === 'PLONGEUR') {
                this.diverId = diverProfile.id;
                this.loadDivingLogs();
            } else {
                this.$router.push('/unauthorized');
            }
        } else {
            this.$router.push('/login');
        }
    }
});
</script>
