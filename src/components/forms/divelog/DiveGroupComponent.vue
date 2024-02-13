<template>
    <div class="bg-gray-100 w-1/2 p-6">
        <h2 class="font-bold text-xl mb-4">Formulaire de groupe de plongée</h2>

        <div class="mb-4">
            <label for="existingGroups" class="block text-gray-700 text-sm font-bold mb-2">Groupes de plongée
                existants:</label>
            <select id="existingGroups" v-model="selectedDiveGroup"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                <option disabled value="">Veuillez sélectionner un groupe</option>
                <option v-for="group in existingDiveGroups" :key="group.id" :value="group.id">
                    {{ group.groupDescription }}
                </option>
            </select>
        </div>


        <!-- Description -->
        <div class="mb-4">
            <label for="groupDescription" class="block text-gray-700 text-sm font-bold mb-2">Description du groupe:</label>
            <input type="text" id="groupDescription" v-model="diveGroup.groupDescription"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- Timonier -->
        <div class="mb-4">
            <label for="boatDriver" class="block text-gray-700 text-sm font-bold mb-2">Timonier:</label>
            <select id="boatDriver" v-model="diveGroup.boatDriver"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                <option v-for="driver in boatDrivers" :key="driver.id" :value="driver.id">
                    {{ driver.username }}
                </option>
            </select>
        </div>

        <!-- premier instructeur -->
        <div class="mb-4">
            <label for="trainerOne" class="block text-gray-700 text-sm font-bold mb-2">Premier Instructeur: </label>
            <select id="trainerOne" v-model="diveGroup.trainerOne"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                <option v-for="trainer in trainers" :key="trainer.id" :value="trainer.id">
                    {{ trainer.username }}
                </option>
            </select>
        </div>

        <!-- Second instructeur -->
        <div class="mb-4">
            <label for="trainerTwo" class="block text-gray-700 text-sm font-bold mb-2">Second Instructeur: </label>
            <select id="trainerTwo" v-model="diveGroup.trainerTwo"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                <option v-for="trainer in boatDrivers" :key="trainer.id" :value="trainer.id">
                    {{ trainer.username }}
                </option>
            </select>
        </div>

        <!-- Plongeurs -->
        <div class="mb-4">
            <label for="divers" class="block text-gray-700 text-sm font-bold mb-2">Plongeurs:</label>
            <select multiple id="divers" v-model="diveGroup.divers"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                <option v-for="driver in allDivers" :key="driver.id" :value="driver.id">
                    {{ driver.username }}
                </option>
            </select>
        </div>

        <!-- Soumettre -->
        <button @click="submitForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Soumettre
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DiveGroupService from '@/services/forms/DiveGroupService';
import { ICustomUser } from '@/interfaces/Users/CustomUser';
import { IDiveGroup } from '@/interfaces/Users/DiveGroup';

export default defineComponent({
    name: 'DiveGroupForm',
    data() {
        return {
            existingDiveGroups: [] as IDiveGroup[],
            selectedDiveGroup: null,
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
        this.loadInitialData();
    },
    watch: {
        selectedDiveGroup(newVal) {
            const selectedGroup = this.existingDiveGroups.find(group => group.id === newVal);
            if (selectedGroup) {
                this.diveGroup = { ...selectedGroup };
            }
        }
    },
    methods: {
        async loadInitialData() {
            try {
                const instructorsResponse = await DiveGroupService.getAllInstructors();
                this.trainers = instructorsResponse.data;
                this.boatDrivers = instructorsResponse.data;

                const diversResponse = await DiveGroupService.getAllDivers();
                this.allDivers = diversResponse.data;

                const groupsResponse = await DiveGroupService.getAllDiveGroups();
                this.existingDiveGroups = groupsResponse.data;
            } catch (error) {
                console.error('Erreur lors du chargement des données', error);
            }
        },

        submitForm() {
            DiveGroupService.createDiveGroup(this.diveGroup)
                .then((response) => {
                    console.log('Groupe de plongée créé avec succès', response.data);
                })
                .catch((error) => {
                    console.error('Erreur lors de la création du groupe de plongée', error.message);
                });
        }
    }
});
</script>