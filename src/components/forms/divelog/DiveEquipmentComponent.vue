<template>
    <div class="bg-cover bg-center h-full w-full" style="background-image: url('/assets/NemoCounter.png')">
        <div class="flex flex-col space-y-6 m-8">
            <!-- Equipment section -->
            <div class="equipment border border-gray-300 rounded p-5 space-y-4">
                <h2 class="text-center text-xl mb-4">Équipement</h2>

                <div class="parameter space-y-2">
                    <label for="tankType" class="mr-2">Type de bouteille (L) :</label>
                    <input type="number" id="tankType" v-model="tankType" class="border border-gray-300 rounded p-2 w-full">
                </div>

                <div class="parameter space-y-2">
                    <label for="wetSuit" class="mr-2">Combinaison :</label>
                    <input type="text" id="wetSuit" v-model="wetSuit" class="border border-gray-300 rounded p-2 w-full">
                </div>

                <div class="parameter space-y-2">
                    <label for="ballast" class="mr-2">Lest :</label>
                    <input type="text" id="ballast" v-model="ballast" class="border border-gray-300 rounded p-2 w-full">
                </div>

                <!-- Dive type checkboxes -->
                <div class="parameter flex flex-wrap items-center space-x-2 space-y-2">
                    <label class="mr-2">Type de plongée :</label>
                    <label for="trainingType">Enseignement</label>
                    <input type="checkbox" id="trainingType" v-model="typeTraining">
                    <label for="explorationType">Exploration</label>
                    <input type="checkbox" id="explorationType" v-model="typeExploration">
                    <label for="nightDiveType">Plongée de nuit</label>
                    <input type="checkbox" id="nightDiveType" v-model="typeNightDive">
                    <label for="driftDiveType">Plongée dérivante</label>
                    <input type="checkbox" id="driftDiveType" v-model="typeDriftDive">
                    <label for="wreckType">Épave</label>
                    <input type="checkbox" id="wreckType" v-model="typeWreck">
                    <label for="otherType">Autre</label>
                    <input type="checkbox" id="otherType" v-model="typeOther">
                </div>

                <div class="parameter">
                    <label for="nitroxType">Nitrox</label>
                    <input type="checkbox" id="nitroxType" v-model="typeNitrox">
                </div>

                <div class="parameter">
                    <label for="trimixType">Trimix</label>
                    <input type="checkbox" id="trimixType" v-model="typeTrimix">
                </div>

                <div class="parameter">
                    <label for="rebreatherType">Recycleur (type de machine) :</label>
                    <input type="text" id="rebreatherType" v-model="typeRebreather" class="border border-gray-300 rounded p-2 w-full">
                </div>

                <div class="parameter">
                    <label>Palanquée :</label>
                    <label for="supervisedGroup">Encadrée</label>
                    <input type="radio" id="supervisedGroup" v-model="groupType" value="supervised">
                    <label for="autonomousGroup">Autonome</label>
                    <input type="radio" id="autonomousGroup" v-model="groupType" value="autonomous">
                </div>

                <div class="parameter">
                    <label for="startConsumption">Consommation (début) :</label>
                    <input type="number" id="startConsumption" v-model="consumptionStart" class="border border-gray-300 rounded p-2 w-full">
                </div>

                <div class="parameter">
                    <label for="endConsumption">Consommation (fin) :</label>
                    <input type="number" id="endConsumption" v-model="consumptionEnd" class="border border-gray-300 rounded p-2 w-full">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            tankType: null,
            wetSuit: '',
            ballast: '',
            typeTraining: false,
            typeExploration: false,
            typeNightDive: false,
            typeDriftDive: false,
            typeWreck: false,
            typeOther: false,
            typeNitrox: false,
            typeTrimix: false,
            typeRebreather: '',
            groupType: null,
            consumptionStart: null,
            consumptionEnd: null
        }
    }
}
</script>
<style lang="">
    
</style>