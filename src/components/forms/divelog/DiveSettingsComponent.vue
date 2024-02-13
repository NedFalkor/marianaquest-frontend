<template>
  <div class="marine-style w-1/4 p-6">
    <h2 class="text-2c5282 font-bold text-xl mb-4">Paramètres de la plongée</h2>

    <!-- Numéro de plongée -->
    <div class="mb-4">
      <label for="diveNumber" class="block text-gray-700 text-sm font-bold mb-2">Numéro de plongée :</label>
      <input type="number" id="diveNumber" v-model="diveNumber"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <!-- Date de plongée -->
    <div class="mb-4">
      <label for="diveDate" class="block text-gray-700 text-sm font-bold mb-2">Date :</label>
      <input type="date" id="diveDate" v-model="diveDate"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <!-- Site de plongée -->
    <div class="mb-4">
      <label for="diveLocation" class="block text-gray-700 text-sm font-bold mb-2">Site de plongée :</label>
      <input type="text" id="diveLocation" v-model="diveSite"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <!-- Environement -->
    <div class="mb-4">
      <span class="block text-gray-700 text-sm font-bold mb-2">Milieu :</span>
      <div class="flex items-center mb-2">
        <input type="radio" id="environmentSea" v-model="environment" value="sea" class="mr-2">
        <label for="environmentSea" class="mr-4 flex items-center">Mer</label>

        <input type="radio" id="environmentOcean" v-model="environment" value="ocean" class="mr-2">
        <label for="environmentOcean" class="mr-4 flex items-center">Océan</label>

        <input type="radio" id="environmentLake" v-model="environment" value="lake" class="mr-2">
        <label for="environmentLake" class="flex items-center">Lac</label>
      </div>
    </div>

    <!-- Profondeur -->
    <div class="mb-4">
      <label for="depth" class="block text-gray-700 text-sm font-bold mb-2">Profondeur (m) :</label>
      <input type="number" id="depth" v-model="depth"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <!-- Durée -->
    <div class="mb-4">
      <label for="diveDuration" class="block text-gray-700 text-sm font-bold mb-2">Durée de plongée (min) :</label>
      <input type="number" id="diveDuration" v-model="durationDive"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <!-- Retour temps surface -->
    <div class="mb-4">
      <label for="returnSurfaceTime" class="block text-gray-700 text-sm font-bold mb-2">Retour surface (h/min) :</label>
      <input type="text" id="returnSurfaceTime" v-model="surfaceReturn"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <!-- Palier -->
    <div class="mb-4">
      <label for="decompressionStop" class="block text-gray-700 text-sm font-bold mb-2">Palier :</label>
      <input type="text" id="decompressionStop" v-model="decompressionStop"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DiveSettings',
  data() {
    return {
      diveNumber: null,
      diveDate: null,
      diveSite: '',
      environment: '',
      depth: null,
      durationDive: null,
      surfaceReturn: '',
      decompressionStop: ''
    };
  },
  watch: {
    diveNumber: 'emitData',
    diveDate: 'emitData',
    diveSite: 'emitData',
    environment: 'emitData',
    depth: 'emitData',
    durationDive: 'emitData',
    surfaceReturn: 'emitData',
    decompressionStop: 'emitData'
  },
  methods: {
    emitData() {
      this.$emit('update:settings', {
        diveNumber: this.diveNumber,
        diveDate: this.diveDate,
        diveSite: this.diveSite,
        environment: this.environment,
        depth: this.depth,
        durationDive: this.durationDive,
        surfaceReturn: this.surfaceReturn,
        decompressionStop: this.decompressionStop
      });
    }
  }
});
</script>

<style>
div.bg-gray-100 {
  background-color: #ebf8ff;
}

h2.font-bold {
  color: #2c5282;
}

label.block,
span.block {
  color: #2c5282;
}

input.shadow,
input[type="radio"]+label {
  color: #2c5282;
  border-color: #2c5282;
}

input[type="radio"]:checked+label {
  background-color: #bee3f8;
  border-color: #2c5282;
}
</style>