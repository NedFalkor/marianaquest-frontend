<template>
  <div class="bg-gray-100 w-1/4 p-6">
    <h2 class="font-bold text-xl mb-4">Conditions</h2>

    <!-- Air Temperature -->
    <div class="mb-4">
      <label for="airTemperature" class="block text-gray-700 text-sm font-bold mb-2">Température de l'air (°C) :</label>
      <input type="number" id="airTemperature" v-model="airTemperature"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <!-- Eau Temperature -->
    <div class="mb-4">
      <label for="waterTemperature" class="block text-gray-700 text-sm font-bold mb-2">Température de l'eau (°C) :</label>
      <input type="number" id="waterTemperature" v-model="waterTemperature"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>

    <!-- Meteo -->
    <div class="mb-4">
      <span class="block text-gray-700 text-sm font-bold mb-2">Météo :</span>
      <div class="flex items-center mb-2">
        <input type="radio" id="sunnyWeather" value="soleil" v-model="weather" class="mr-2">
        <label for="sunnyWeather" class="flex items-center"><i class="fas fa-sun mr-1"></i>Soleil</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="cloudyWeather" value="nuage" v-model="weather" class="mr-2">
        <label for="cloudyWeather" class="flex items-center"><i class="fas fa-cloud mr-1"></i>Nuage</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="rainyWeather" value="pluie" v-model="weather" class="mr-2">
        <label for="rainyWeather" class="flex items-center"><i class="fas fa-cloud-showers-heavy mr-1"></i>Pluie</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="showerWeather" value="averse" v-model="weather" class="mr-2">
        <label for="showerWeather" class="flex items-center"><i class="fas fa-cloud-rain mr-1"></i>Averse</label>
      </div>
    </div>

    <!-- Visibilité -->
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

    <div class="mb-4">
      <span class="block text-gray-700 text-sm font-bold mb-2">Courant :</span>
      <div class="flex items-center mb-2">
        <input type="radio" id="noCurrent" value="none" v-model="current" class="mr-2">
        <label for="noCurrent" class="flex items-center"><i class="fas fa-water mr-1"></i>Nul</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="weakCurrent" value="weak" v-model="current" class="mr-2">
        <label for="weakCurrent" class="flex items-center"><i class="fas fa-tint mr-1"></i>Faible</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="mediumCurrent" value="medium" v-model="current" class="mr-2">
        <label for="mediumCurrent" class="flex items-center"><i class="fas fa-tint mr-1"></i>Moyen</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="strongCurrent" value="strong" v-model="current" class="mr-2">
        <label for="strongCurrent" class="flex items-center"><i class="fas fa-wind mr-1"></i>Fort</label>
      </div>
    </div>

    <!-- Vent -->
    <div class="mb-4">
      <span class="block text-gray-700 text-sm font-bold mb-2">Vent :</span>
      <div class="flex items-center mb-2">
        <input type="radio" id="noWind" v-model="wind" value="none" class="mr-2">
        <label for="noWind" class="flex items-center"><i class="fas fa-water mr-1"></i>Nul</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="weakWind" v-model="wind" value="weak" class="mr-2">
        <label for="weakWind" class="flex items-center"><i class="fas fa-tint mr-1"></i>Faible</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="mediumWind" v-model="wind" value="medium" class="mr-2">
        <label for="mediumWind" class="flex items-center"><i class="fas fa-tint mr-1"></i>Moyen</label>
      </div>
      <div class="flex items-center mb-2">
        <input type="radio" id="strongWind" v-model="wind" value="strong" class="mr-2">
        <label for="strongWind" class="flex items-center"><i class="fas fa-wind mr-1"></i>Fort</label>
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConditionsComponent',
  data() {
    return {
      airTemperature: null as number | null,
      waterTemperature: null as number | null,
      weather: '',
      visibility: '',
      current: '',
      wind: '',
      observations: '',
    };
  },
  watch: {
    airTemperature: 'emitData',
    waterTemperature: 'emitData',
    weather: 'emitData',
    visibility: 'emitData',
    current: 'emitData',
    wind: 'emitData',
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
        wind: this.wind,
        observations: this.observations
      });
    }
  }
});
</script>


<style></style>