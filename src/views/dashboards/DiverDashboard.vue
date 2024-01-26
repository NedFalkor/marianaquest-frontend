<template>
    <header-component class="mb-4"></header-component>
    <TitleComponent class="text-center text-blue-900 mb-8" :pageTitle="'Dashboard de ' + userData.username" />
    <div class="dashboard-container">
        <PersonalInfo :personal-information="userData.personalInformation" @update-user-data="updateUserData" />
        <EmergencyInfo :emergency-info="userData.emergencyContact" @update-emergency-info="updateUserData" />
    </div>
    <div class="bg-gray-100 w-full p-6">

        <!-- List of Dive Logs -->
        <div v-for="log in divingLogs" :key="log.id" class="mb-4 p-4 bg-white shadow rounded">
            <div class="mb-2">
                <span class="font-semibold">Dive Log ID:</span> {{ log.id }}
            </div>
            <!-- Edit and Delete buttons -->
            <button @click="editLog(log)" class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
            <button @click="deleteLogRequest(log)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
            </button>
            <!-- View Details -->
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
            console.log("UserID:", userId); // Log pour vérifier le userID
            if (userId) {
                try {
                    const response = await CustomUserService.getUserById(Number(userId));
                    console.log("UserData:", response.data); // Log pour vérifier les données de l'utilisateur
                    this.userData = response.data;
                } catch (error) {
                    console.error('Erreur lors de la récupération des détails de l’utilisateur:', error);
                }
            }
        },

        async updateUserData(updatedData: ICustomUser) {
            if (this.userData && this.userData.id !== undefined) {
                try {
                    const response = await CustomUserService.updateUser(this.userData.id, updatedData);
                    this.userData = response.data;
                    NotificationService.notifyUser('User data updated successfully');
                } catch (error) {
                    console.error('Error updating user data:', error);
                    NotificationService.notifyUser('Error updating user data');
                }
            } else {
                console.error('User ID is undefined');
                // Gérer le cas où l'ID utilisateur n'est pas défini
            }
        },

        loadDivingLogs() {
            if (this.diverId !== null) {
                DiveLogService.getDiveLogsByDiver(this.diverId)
                    .then(response => {
                        console.log("DivingLogs:", response.data); // Log pour vérifier les journaux de plongée
                        this.divingLogs = response.data;
                    })
                    .catch(error => {
                        console.error('Failed to load diving logs:', error);
                    });
            }
        },

        editLog(log: IDivingLog) {
            console.log("Editing Log:", log);
            this.editedLog = { ...log };
            this.isEditing = true;
            // Navigate to edit page or open edit modal
        },

        deleteLogRequest(log: IDivingLog) {
            console.log("Deleting Log:", log);
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
            console.log("Viewing Details for Log:", log);
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
