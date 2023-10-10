<template>
    <div class="bg-gray-100 w-1/4 p-6">
        <h2 class="font-bold text-xl mb-4">Equipement</h2>
                <div class="parameter space-y-2">
                    <label for="tankType" class="block text-gray-700 text-sm font-bold mb-2">Type de bouteille (L) :</label>
                    <input type="number" id="tankType" v-model="tankType" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="parameter space-y-2">
                    <label for="wetSuit" class="block text-gray-700 text-sm font-bold mb-2">Combinaison :</label>
                    <input type="text" id="wetSuit" v-model="wetSuit" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="parameter space-y-2">
                    <label for="ballast" class="block text-gray-700 text-sm font-bold mb-2">Lest :</label>
                    <input type="text" id="ballast" v-model="ballast" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="parameter flex flex-wrap items-center space-x-2 space-y-2">
                    <span class="block text-gray-700 text-sm font-bold mb-2">Type de plongée :</span>
                    <div class="flex items-center">
                        <input type="checkbox" id="trainingType" v-model="typeTraining" class="mr-2">
                        <label for="trainingType" class="mr-4">Enseignement</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="explorationType" v-model="typeExploration" class="mr-2">
                        <label for="explorationType" class="mr-4">Exploration</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="nightDiveType" v-model="typeNightDive" class="mr-2">
                        <label for="nightDiveType" class="mr-4">Plongée de nuit</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="driftDiveType" v-model="typeDriftDive" class="mr-2">
                        <label for="driftDiveType" class="mr-4">Plongée dérivante</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="wreckType" v-model="typeWreck" class="mr-2">
                        <label for="wreckType" class="mr-4">Épave</label>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="otherType" v-model="typeOther" class="mr-2">
                        <label for="otherType" class="mr-4">Autre</label>
                    </div>
                </div>
                <div class="parameter">
                    <input type="checkbox" id="nitroxType" v-model="typeNitrox" class="mr-2">
                    <label for="nitroxType">Nitrox</label>
                </div>
                <div class="parameter">
                    <input type="checkbox" id="trimixType" v-model="typeTrimix" class="mr-2">
                    <label for="trimixType">Trimix</label>
                </div>
                <div class="parameter space-y-2">
                    <label for="rebreatherType" class="block text-gray-700 text-sm font-bold mb-2">Recycleur (type de machine) :</label>
                    <input type="text" id="rebreatherType" v-model="typeRebreather" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="parameter">
                    <label for="supervisedGroup" class="mr-4">Palanquée : Encadrée</label>
                    <input type="radio" id="supervisedGroup" v-model="groupType" value="supervised" class="mr-2">
                    <label for="autonomousGroup" class="mr-4">Autonome</label>
                    <input type="radio" id="autonomousGroup" v-model="groupType" value="autonomous" class="mr-2">
                </div>
                <div class="parameter space-y-2">
                    <label for="startConsumption" class="block text-gray-700 text-sm font-bold mb-2">Consommation (début) :</label>
                    <input type="number" id="startConsumption" v-model="consumptionStart" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="parameter space-y-2">
                    <label for="endConsumption" class="block text-gray-700 text-sm font-bold mb-2">Consommation (fin) :</label>
                    <input type="number" id="endConsumption" v-model="consumptionEnd" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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