<template>
    <div>
        <DiveLogList :diveLogs="divingLogs">
            <template #default="{ log }">
                <button @click="editLog(log)">Edit</button>
                <button @click="deleteLogRequest(log)">Delete</button>
            </template>
        </DiveLogList>
    </div>
</template>
  
<script lang="ts">
import DiveLogService from '@/services/forms/DiveLogService';
import NotificationService from '@/services/NotificationService';
import { IDivingLog } from '@/interfaces/DivingLog';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            diverId: null as number | null,
            divingLogs: [] as IDivingLog[],
            selectedLog: null as IDivingLog | null,
            editedLog: null as IDivingLog | null, // Ajouté
            isEditing: false, // Ajouté
        };
    },
    methods: {
        loadDivingLogs(): void {
            if (this.diverId !== null) { // Vérifiez que diverId n'est pas null
                DiveLogService.getDiveLogsByDiver(this.diverId)
                    .then(response => {
                        this.divingLogs = response.data;
                    })
                    .catch(error => {
                        console.error('Failed to load diving logs:', error);
                    });
            }
        },

        selectLog(log: IDivingLog): void {
            this.selectedLog = log;
        },

        getCurrentUserId(): string | null {
            return sessionStorage.getItem('userId');
        },

        editLog(log: IDivingLog): void {
            this.editedLog = { ...log };
            this.isEditing = true;
        },

        deleteLogRequest(log: IDivingLog): void {
            if (this.diverId !== null) { // Vérifiez que diverId n'est pas null
                NotificationService.requestDeleteDiveLog(log.id, this.diverId)
                    .then(() => {
                        // Gérer la réponse ici
                    })
                    .catch(error => {
                        console.error('Failed to request deletion for diving log:', error);
                    });
            }
        }
    },
    mounted(): void {
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
