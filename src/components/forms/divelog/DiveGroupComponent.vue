<template>
    <div class="bg-gray-100 w-1/2 p-6">
        <h2 class="font-bold text-xl mb-4">Dive Group Form</h2>

        <!-- Group Description -->
        <div class="mb-4">
            <label for="groupDescription" class="block text-gray-700 text-sm font-bold mb-2">Group Description:</label>
            <input type="text" id="groupDescription" v-model="diveGroup.groupDescription"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- Boat Driver -->
        <div class="mb-4">
            <label for="boatDriver" class="block text-gray-700 text-sm font-bold mb-2">Boat Driver:</label>
            <!-- Remplacer 'select' par un composant de sélection approprié -->
            <select id="boatDriver" v-model="diveGroup.boatDriver"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                <option v-for="driver in boatDrivers" :key="driver.id" :value="driver.id">
                    {{ driver.username }}
                </option>
            </select>
        </div>

        <!-- Trainer One -->
        <div class="mb-4">
            <label for="trainerOne" class="block text-gray-700 text-sm font-bold mb-2">First Trainer:</label>
            <select id="trainerOne" v-model="diveGroup.trainerOne"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                <option v-for="trainer in trainers" :key="trainer.id" :value="trainer.id">
                    {{ trainer.username }}
                </option>
            </select>
        </div>

        <!-- Trainer Two -->
        <div class="mb-4">
            <label for="trainerTwo" class="block text-gray-700 text-sm font-bold mb-2">Second Trainer:</label>
            <select id="trainerTwo" v-model="diveGroup.trainerTwo"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                <option v-for="trainer in boatDrivers" :key="trainer.id" :value="trainer.id">
                    {{ trainer.username }}
                </option>
            </select>
        </div>

        <!-- Divers -->
        <div class="mb-4">
            <label for="divers" class="block text-gray-700 text-sm font-bold mb-2">Divers:</label>
            <select multiple id="divers" v-model="diveGroup.divers"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                <option v-for="driver in allDivers" :key="driver.id" :value="driver.id">
                    {{ driver.username }}
                </option>
            </select>
        </div>

        <!-- Submit Button -->
        <button @click="submitForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IDiveGroup } from '@/interfaces/DiveGroup';
import { ICustomUser } from '@/interfaces/CustomUser';
<<<<<<< HEAD
=======
import DiveGroupService from '@/services/forms/DiveGroupService';
import { AxiosError } from 'axios';
>>>>>>> 1dace89dadf7b599b7019b630de2a19a76353744

export default defineComponent({
    name: 'DiveGroupForm',
    data() {
        return {
            diveGroup: {
                groupDescription: '',
                boatDriver: null,
                trainerOne: null,
                trainerTwo: null,
                divers: [],
            } as IDiveGroup,
            boatDrivers: [] as ICustomUser[],
            trainers: [] as ICustomUser[],
            allDivers: [] as ICustomUser[],
        };
    },
    mounted() {
<<<<<<< HEAD
        // Chargez les données ici (boatDrivers, trainers, allDivers)
    },
    methods: {
        submitForm() {
            // Logique de soumission du formulaire
        },
    },
});
</script>
=======
        this.loadInitialData();
    },
    methods: {
        loadInitialData() {
            DiveGroupService.getAllInstructors()
                .then((response: any) => { // Typage de la réponse
                    this.trainers = response.data;
                    this.boatDrivers = response.data;
                })
                .catch((error: AxiosError) => { // Typage de l'erreur
                    console.error('Erreur lors du chargement des instructeurs', error.message);
                });

            DiveGroupService.getAllDivers()
                .then((response: any) => { // Typage de la réponse
                    this.allDivers = response.data;
                })
                .catch((error: AxiosError) => { // Typage de l'erreur
                    console.error('Erreur lors du chargement des plongeurs', error.message);
                });
        },
        submitForm() {
            DiveGroupService.createDiveGroup(this.diveGroup)
                .then((response: any) => {
                    console.log('Groupe de plongée créé avec succès', response.data);
                    // Gérer la soumission réussie ici (par exemple, redirection ou message de succès)
                })
                .catch((error: any) => {
                    console.error('Erreur lors de la création du groupe de plongée', error);
                    // Gérer l'erreur ici (par exemple, afficher un message d'erreur)
                });
        }
    }
});
</script>
>>>>>>> 1dace89dadf7b599b7019b630de2a19a76353744
