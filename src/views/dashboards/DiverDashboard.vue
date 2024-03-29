<template>
    <header-component class="mb-4"></header-component>
    <TitleComponent class="text-center text-blue-900 mb-8" :pageTitle="'Dashboard de ' + userData.username" />
    <div class="dashboard-container">
        <personnal-info :personal-information="userData.personalInformation" @update-user-data="updateUserData" />
        <emergency-info :emergency-info="userData.emergencyContact" @update-emergency-info="updateUserData" />
    </div>
    <div class="bg-gray-100 w-full p-6">
        <dive-log-list-component :diveLogs="divingLogs" @edit-log="handleEditLog"
            @delete-log="handleDeleteLog"></dive-log-list-component>
    </div>
    <div class="bg-gray-100 w-full p-6">

        <!-- Liste des logs -->
        <div v-for="log in divingLogs" :key="log.id" class="mb-4 p-4 bg-white shadow rounded">
            <div class="mb-2">
                <span class="font-semibold">ID Log de plongée:</span> {{ log.id }}
            </div>
            <button @click="handleEditLog(log)"
                class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Modifier
            </button>
            <button @click="handleDeleteLog(log)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Effacer
            </button>
            <!-- Détails -->
            <button @click="viewDetails(log)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Voir les détails
            </button>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import DiveLogService from '@/services/forms/DiveLogService';
import NotificationService from '@/services/NotificationService';
import { IDivingLog } from '@/interfaces/DivingLog';
import CustomUserService from '@/services/gatekeepers/CustomUserService';
import { ICustomUser } from '@/interfaces/Users/CustomUser';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import TitleComponent from '@/components/header/TitleComponent.vue';
import DiveLogListComponent from '@/components/lists/DiveLogListComponent.vue';
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
    data() {
        return {
            diverId: null as number | null,
            divingLogs: [] as IDivingLog[],
            selectedLog: null as IDivingLog | null,
            editedLog: null as IDivingLog | null,
            isEditing: false,
            viewingDetails: false,
            userData: {} as ICustomUser,
        };
    },
    methods: {
        async fetchUserData() {
            const userId = sessionStorage.getItem('userId');
            console.log("UserID:", userId);
            if (userId) {
                try {
                    const response = await CustomUserService.getUserById(Number(userId));
                    console.log("UserData:", response.data);
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
                // gérer si id pas défini
                try {
                    const response = await CustomUserService.createUser(updatedData);
                    this.userData = response.data;
                    NotificationService.notifyUser('New user created successfully');
                } catch (error) {
                    console.error('Error creating new user:', error);
                    NotificationService.notifyUser('Error creating new user');
                }
            }
        },

        loadDivingLogs() {
            if (this.diverId !== null) {
                DiveLogService.getDiveLogsByDiver(this.diverId)
                    .then(response => {
                        console.log("DivingLogs:", response.data);
                        this.divingLogs = response.data;
                    })
                    .catch(error => {
                        console.error('Failed to load diving logs:', error);
                    });
            }
        },

        handleEditLog(log: IDivingLog) {
            console.log("Editing Log:", log);
            this.editedLog = { ...log };
            this.isEditing = true;
        },

        handleDeleteLog(log: IDivingLog) {
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