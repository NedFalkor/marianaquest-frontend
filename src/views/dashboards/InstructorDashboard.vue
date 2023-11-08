<template>
    <div class="instructor-dashboard">
        <h1>Dashboard Instructeur</h1>

        <div v-for="log in divingLogs" :key="log.id" class="diving-log-entry">
            <div>{{ log.settings.dive_site }} - {{ log.settings.dive_date }}</div>
            <button @click="selectLog(log)">Ajouter Commentaire</button>
        </div>

        <instructor-comment-component v-if="selectedLog && instructorId" :diving-log-id="selectedLog.id"
            :instructor-id="instructorId" @comment-posted="loadDivingLogs" />
    </div>
</template>


<script lang="ts">
import InstructorCommentComponent from '@/components/forms/divelog/InstructorCommentComponent.vue';
import DiveLogService from '@/services/DiveLogService';
import { IDivingLog } from '@/interfaces/DivingLog';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        InstructorCommentComponent
    },
    data() {
        return {
            instructorId: null as number | null,
            divingLogs: [] as IDivingLog[],
            selectedLog: null as IDivingLog | null,
        };
    },
    methods: {
        loadDivingLogs(): void {
            DiveLogService.getAllDiveLogs()
                .then(response => {
                    this.divingLogs = response.data;
                })
                .catch(error => {
                    console.error('Failed to load diving logs:', error);
                });
        },
        selectLog(log: IDivingLog): void {
            this.selectedLog = log;
        },
        getCurrentUserId(): string | null {
            return sessionStorage.getItem('userId');
        }
    },
    mounted(): void {
        const instructorProfileRaw = sessionStorage.getItem('instructorProfile');
        if (instructorProfileRaw) {
            const instructorProfile = JSON.parse(instructorProfileRaw);
            if (instructorProfile && instructorProfile.role === 'FORMATEUR') {
                this.instructorId = instructorProfile.id;
                this.loadDivingLogs();
            } else {
                // Redirection ou autre logique si l'utilisateur n'est pas un formateur
                this.$router.push('/unauthorized'); // Redirige vers une page 'Non autorisé' par exemple
            }
        } else {
            // Si aucun profil n'est trouvé, redirigez ou gérez comme nécessaire
            this.$router.push('/login'); // Redirige vers la page de connexion par exemple
        }
    }

}
);
</script>

