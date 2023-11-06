<template>
    <div class="instructor-dashboard">
        <h1>Dashboard Instructeur</h1>

        <div v-for="log in divingLogs" :key="log.id" class="diving-log-entry">
            <!-- Afficher les détails du log ici -->
            <div>{{ log.settings.dive_site }} - {{ log.settings.dive_date }}</div>

            <!-- Ajouter un bouton pour ouvrir un modal ou une section pour ajouter des commentaires -->
            <button @click="selectLog(log)">Ajouter Commentaire</button>
        </div>

        <!-- Si un log est sélectionné, affichez le composant de commentaire ici -->
        <instructor-comment-component v-if="selectedLog" :diving-log-id="selectedLog.id" @comment-posted="loadDivingLogs" />
    </div>
</template>

<script lang="ts">
import InstructorCommentComponent from '@/components/forms/divelog/InstructorCommentComponent.vue';
import DiveLogService from '@/services/DiveLogService';
import { IDivingLog } from '@/interfaces/DivingLog';

export default {
    components: {
        InstructorCommentComponent
    },
    data() {
        return {
            divingLogs: [] as IDivingLog[],
            selectedLog: null as IDivingLog | null
        };
    },
    methods: {
        loadDivingLogs() {
            // Assume DiveLogService.getAllDiveLogs() returns Promise with DivingLog[]
            DiveLogService.getAllDiveLogs()
                .then(response => {
                    this.divingLogs = response.data.filter(() => {
                        // Replace this comment with your actual condition
                        return true; // this is just a placeholder
                    });
                })
                .catch(error => {
                    console.error('Failed to load diving logs:', error);
                });
        },
        selectLog(log: IDivingLog) {
            this.selectedLog = log;
        }
    },
    mounted() {
        this.loadDivingLogs();
    }
};
</script>
