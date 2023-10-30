<template>
  <header-component class="mb-4"></header-component>
  <div class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
    <div class="w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden"
      style="max-width: 700px">
      <div class="bg-indigo-600 w-full py-5 px-6 text-3xl text-white font-thin text-center">
        {{ pageTitle }}
      </div>

      <div class="container bg-white p-6 rounded-xl">
        <form @submit.prevent="calculateDiveTimeWithEstimation">
          <div class="mb-4">
            <label for="bottleCapacity" class="block text-sm font-medium mb-2">Capacité de la Bouteille (Litres)</label>
            <input class="input w-full p-2 border rounded-md" type="number" id="bottleCapacity" required />
          </div>

          <div class="mb-4">
            <label for="bottlePressure" class="block text-sm font-medium mb-2">Pression de la Bouteille (bar)</label>
            <input class="input w-full p-2 border rounded-md" type="number" id="bottlePressure" required />
          </div>

          <div class="mb-4">
            <label for="safetyReserve" class="block text-sm font-medium mb-2">Réserve de Sécurité (bar)</label>
            <input class="input w-full p-2 border rounded-md" type="number" id="safetyReserve" required />
          </div>

          <div class="mb-4">
            <label for="maxDepth" class="block text-sm font-medium mb-2">Profondeur Maximale (mètres)</label>
            <input class="input w-full p-2 border rounded-md" type="number" id="maxDepth" required />
          </div>

          <button type="submit"
            class="w-full h-16 text-xl font-light bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
            Calculer
          </button>
        </form>

        <div v-if="diveTime !== null" class="result mt-6 bg-white p-6 rounded-md shadow-md">
          <div class="flex items-center mb-4" v-if="calculateTotalCapacity() > 0">
            <!-- Optional: you can add an icon here -->
            <span class="font-semibold text-indigo-600 text-xl mr-4">Capacité totale :</span>
            <span class="text-xl font-bold">{{ calculateTotalCapacity() }} litres</span>
          </div>

          <div class="flex items-center mb-4">
            <!-- Optional: you can add an icon here -->
            <span class="font-semibold text-indigo-600 text-xl mr-4">Temps de plongée à {{ maxDepth }} mètres :</span>
            <span class="text-xl font-bold">{{ diveTime }} minutes</span>
          </div>

          <div class="flex items-center mb-4">
            <!-- Optional: you can add an icon here -->
            <span class="font-semibold text-indigo-600 text-lg mr-4">Temps de montée (à {{ ascentRate }} mètres/minute)
              :</span>
            <span class="text-lg font-bold">{{ maxDepth / ascentRate }} minutes</span>
          </div>

          <div class="flex items-center mb-4" v-if="totalDiveTime !== null">
            <!-- Optional: you can add an icon here -->
            <span class="font-semibold text-indigo-600 text-lg mr-4">Temps total de plongée :</span>
            <span class="text-lg font-bold">{{ totalDiveTime }} minutes</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";

export default defineComponent({
  components: {
    HeaderComponent,
  },
  name: "NemoCounter",
  data() {
    return {
      pageTitle: "Calculateur Nemo",
      capacityBottle: 0,
      bottlePressure: 0,
      safetyReserve: 0,
      maxDepth: 0,
      diveTime: null as number | null,
      airConsumption: 20,
      ascentRate: 15,
      totalDiveTime: null as number | null,
    };
  },
  methods: {
    calculateTotalCapacity(): number {
      return this.capacityBottle * (this.bottlePressure - this.safetyReserve);
    },
    calculateDiveTimeWithEstimation(): void {
      const surfaceAirConsumption = 20;
      const pressureFactor = 20;

      const availableAir = this.calculateTotalCapacity();
      const timeToAscend = this.maxDepth / this.ascentRate;
      const airConsumedDuringDescent =
        (this.maxDepth / 2) *
        (surfaceAirConsumption + (this.maxDepth / 10) * pressureFactor);
      const airConsumedDuringAscent =
        timeToAscend *
        (surfaceAirConsumption + (this.maxDepth / 10) * pressureFactor);
      const totalAirConsumed =
        airConsumedDuringDescent + airConsumedDuringAscent;

      this.diveTime = (availableAir - totalAirConsumed) / surfaceAirConsumption;

      this.totalDiveTime = this.calculateTotalDiveTime();
    },
    calculateTotalDiveTime(): number {
      const timeToSurface = 1.13;
      const timeAtFirstDecoStop = 13;
      const timeBetweenDecoStops = 0.5;

      return timeToSurface + timeAtFirstDecoStop + timeBetweenDecoStops;
    },
  },
});
</script>