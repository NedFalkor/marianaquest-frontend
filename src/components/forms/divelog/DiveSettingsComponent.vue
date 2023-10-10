<template>
  <div class="mb-6">
    <h2 class="text-center text-2xl mb-4">Paramètres de la plongée</h2>

    <div class="mb-4">
      <label for="diveNumber" class="mr-1">Numéro de plongée :</label>
      <input type="number" id="diveNumber" v-model="diveNumber" class="border rounded-lg border-gray-300 p-2 w-full">
    </div>

    <div class="mb-4">
      <label for="diveDate" class="mr-1">Date :</label>
      <input type="date" id="diveDate" v-model="diveDate" class="border rounded-lg border-gray-300 p-2 w-full">
    </div>

    <div class="mb-4">
      <label for="diveLocation" class="mr-1">Site de plongée :</label>
      <input type="text" id="diveLocation" v-model="diveSite" class="border rounded-lg border-gray-300 p-2 w-full">
    </div>

    <div class="mb-4">
      <span class="mr-1">Milieu :</span>
      <label for="environmentSea" class="mr-1">Mer</label>
      <input type="radio" id="environmentSea" v-model="environment" value="sea" class="mr-1 transform scale-120">
      <label for="environmentOcean" class="mr-1">Océan</label>
      <input type="radio" id="environmentOcean" v-model="environment" value="ocean" class="mr-1 transform scale-120">
      <label for="environmentLake" class="mr-1">Lac</label>
      <input type="radio" id="environmentLake" v-model="environment" value="lake" class="mr-1 transform scale-120">
    </div>

    <div class="mb-4">
      <label for="depth" class="mr-1">Profondeur (m) :</label>
      <input type="number" id="depth" v-model="depth" class="border rounded-lg border-gray-300 p-2 w-full">
    </div>

    <div class="mb-4">
      <label for="diveDuration" class="mr-1">Durée de plongée (min) :</label>
      <input type="number" id="diveDuration" v-model="durationDive" class="border rounded-lg border-gray-300 p-2 w-full">
    </div>

    <div class="mb-4">
      <label for="returnSurfaceTime" class="mr-1">Retour surface (h/min) :</label>
      <input type="text" id="returnSurfaceTime" v-model="surfaceReturn" class="border rounded-lg border-gray-300 p-2 w-full">
    </div>

    <div class="mb-4">
      <label for="decompressionStop" class="mr-1">Palier :</label>
      <input type="text" id="decompressionStop" v-model="decompressionStop" class="border rounded-lg border-gray-300 p-2 w-full">
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
}
});
</script>

<style lang="">
</style>