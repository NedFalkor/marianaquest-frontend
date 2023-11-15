<template>
  <div class="bg-gray-100 w-1/4 p-6">
    <h2 class="font-bold text-xl mb-4">Equipement</h2>
    <div class="parameter space-y-2">
      <label for="tankType" class="block text-gray-700 text-sm font-bold mb-2">Type de bouteille :</label>
      <select id="tankType" v-model="tankType"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="6l">6L</option>
        <option value="12l">12L</option>
        <option value="15l">15L</option>
      </select>
    </div>
    <div class="parameter space-y-2">
      <label for="wetSuit" class="block text-gray-700 text-sm font-bold mb-2">Combinaison :</label>
      <select id="wetSuit" v-model="wetSuit"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    </div>
    <div class="parameter space-y-2">
      <label for="diveType" class="block text-gray-700 text-sm font-bold mb-2">Type de plongée :</label>
      <select id="diveType" v-model="diveType"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="training">Enseignement</option>
        <option value="exploration">Exploration</option>
        <option value="night">Plongée de nuit</option>
        <option value="drift">Plongée dérivante</option>
        <option value="wreck">Épave</option>
        <option value="other">Autre</option>
      </select>
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
      <input type="text" id="rebreatherType" v-model="typeRebreather"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    <div class="parameter">
      <label for="supervisedGroup" class="mr-4">Palanquée : Encadrée</label>
      <input type="radio" id="supervisedGroup" v-model="groupType" value="supervised" class="mr-2">
      <label for="autonomousGroup" class="mr-4">Autonome</label>
      <input type="radio" id="autonomousGroup" v-model="groupType" value="autonomous" class="mr-2">
    </div>
    <div class="parameter space-y-2">
      <label for="startConsumption" class="block text-gray-700 text-sm font-bold mb-2">Consommation (début) :</label>
      <input type="number" id="startConsumption" v-model="consumptionStart"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    <div class="parameter space-y-2">
      <label for="endConsumption" class="block text-gray-700 text-sm font-bold mb-2">Consommation (fin) :</label>
      <input type="number" id="endConsumption" v-model="consumptionEnd"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DiveEquipment',
  data() {
    return {
      tankType: '---',
      wetSuit: '---',
      diveType: '---',
      ballast: '',
      typeNitrox: false,
      typeTrimix: false,
      typeRebreather: '',
      groupType: null,
      consumptionStart: null,
      consumptionEnd: null
    };
  },
  computed: {
    gasType(): string {
      let gases = [];
      if (this.typeNitrox) gases.push('nitrox');
      if (this.typeTrimix) gases.push('trimix');
      if (this.typeRebreather) gases.push('rebreather');
      return gases.join(' ');
    }
  },
  watch: {
    tankType: 'emitData',
    wetSuit: 'emitData',
    ballast: 'emitData',
    diveType: 'emitData',
    gasType: 'emitData',
    groupType: 'emitData',
    consumptionStart: 'emitData',
    consumptionEnd: 'emitData'
  },
  methods: {
    emitData() {
      this.$emit('update:equipment', {
        bottle_type: this.tankType,
        wet_suit: this.wetSuit,
        ballast: this.ballast,
        dive_type: this.diveType,
        gas_type: this.gasType,
        group: this.groupType,
        consumption_start: this.consumptionStart,
        consumption_end: this.consumptionEnd
      });
    }
  }
});
</script>