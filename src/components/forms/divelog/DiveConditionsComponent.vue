<template>
  <div class="bg-gray-100 w-1/4 p-6">
    <h2 class="font-bold text-xl mb-4">Conditions</h2>

    <!-- Air Temperature -->
    <div class="mb-4">
      <label for="airTemperature" class="block text-gray-700 text-sm font-bold mb-2">Température de l'air (°C) :</label>
      <input type="number" id="airTemperature" v-model="airTemperature"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <!-- Water Temperature -->
    <div class="mb-4">
      <label for="waterTemperature" class="block text-gray-700 text-sm font-bold mb-2">Température de l'eau (°C) :</label>
      <input type="number" id="waterTemperature" v-model="waterTemperature"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <!-- Weather -->
    <div class="mb-4">
      <span class="block text-gray-700 text-sm font-bold mb-2">Météo :</span>
      <div class="flex items-center mb-2">
        <input type="radio" id="sunnyWeather" v-model="sunnyWeather" class="mr-2">
        <label for="sunnyWeather" class="flex items-center"><i class="fas fa-sun mr-1"></i>Soleil</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="cloudyWeather" v-model="cloudyWeather" class="mr-2">
        <label for="cloudyWeather" class="flex items-center"><i class="fas fa-cloud mr-1"></i>Nuage</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="rainyWeather" v-model="rainyWeather" class="mr-2">
        <label for="rainyWeather" class="flex items-center"><i class="fas fa-cloud-showers-heavy mr-1"></i>Pluie</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="showerWeather" v-model="showerWeather" class="mr-2">
        <label for="showerWeather" class="flex items-center"><i class="fas fa-cloud-rain mr-1"></i>Averse</label>
      </div>
    </div>

    <!-- Visibility -->
    <div class="mb-4">
      <span class="block text-gray-700 text-sm font-bold mb-2">Visibilité :</span>
      <div class="flex items-center mb-2">
        <input type="radio" id="goodVisibility" v-model="visibility" value="good" class="mr-2">
        <label for="goodVisibility" class="flex items-center"><i class="fas fa-eye mr-1"></i>Bonne</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="averageVisibility" v-model="visibility" value="average" class="mr-2">
        <label for="averageVisibility" class="flex items-center"><i class="fas fa-low-vision mr-1"></i>Moyenne</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="poorVisibility" v-model="visibility" value="poor" class="mr-2">
        <label for="poorVisibility" class="flex items-center"><i class="fas fa-eye-slash mr-1"></i>Mauvaise</label>
      </div>
    </div>

    <!-- Current -->
    <div class="mb-4">
      <span class="block text-gray-700 text-sm font-bold mb-2">Courant :</span>
      <div class="flex items-center mb-2">
        <input type="radio" id="noCurrent" v-model="current" value="none" class="mr-2">
        <label for="noCurrent" class="flex items-center"><i class="fas fa-water mr-1"></i>Nul</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="mediumCurrent" v-model="current" value="medium" class="mr-2">
        <label for="mediumCurrent" class="flex items-center"><i class="fas fa-tint mr-1"></i>Moyen</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="strongCurrent" v-model="current" value="strong" class="mr-2">
        <label for="strongCurrent" class="flex items-center"><i class="fas fa-wind mr-1"></i>Fort</label>
      </div>
    </div>


    <!-- Observations -->
    <div class="mb-4">
      <label for="observationNotes" class="block text-gray-700 text-sm font-bold mb-2">Observations :</label>
      <textarea id="observationNotes" v-model="observations"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'ConditionsComponent',
  data() {
    return {
      airTemperature: null as number | null,
      waterTemperature: null as number | null,
      sunnyWeather: false,
      cloudyWeather: false,
      rainyWeather: false,
      showerWeather: false,
      visibility: null as 'good' | 'average' | 'poor' | null,
      current: null as 'none' | 'medium' | 'strong' | null,
      observations: '',
    };
  },
  computed: {
    weather(): string {
      if (this.sunnyWeather) return 'soleil';
      if (this.cloudyWeather) return 'nuage';
      if (this.rainyWeather) return 'pluie';
      if (this.showerWeather) return 'averse';
      return '';
    }
  },
  watch: {
    airTemperature: 'emitData',
    waterTemperature: 'emitData',
    weather: 'emitData',
    visibility: 'emitData',
    current: 'emitData',
    observations: 'emitData'
  },
  methods: {
    emitData() {
      this.$emit('update:conditions', {
        air_temperature: this.airTemperature,
        water_temperature: this.waterTemperature,
        weather: this.weather,
        visibility: this.visibility,
        current: this.current,
        observations: this.observations
      });
    }
  }
});
</script>

<style></style>
