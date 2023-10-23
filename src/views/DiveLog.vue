<template>
  <div>
    <header-component></header-component>
    <TitleComponent :pageTitle="`Formulaire de plongée`" />
    <div class="form-container">
      <dive-settings-component class="form-item"></dive-settings-component>
      <dive-equipment-component class="form-item"></dive-equipment-component>
      <dive-conditions-component class="form-item"></dive-conditions-component>
      <button @click="submitForm">Enregistrer</button>
    </div>
  </div>
</template>

<script lang="ts">
import DiveSettingsComponentVue from '@/components/forms/divelog/DiveSettingsComponent.vue';
import DiveEquipmentComponentVue from '@/components/forms/divelog/DiveEquipmentComponent.vue';
import DiveConditionsComponent from '@/components/forms/divelog/DiveConditionsComponent.vue';
import TitleComponent from '@/components/header/TitleComponent.vue';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import DiveLogService from '@/services/DiveLogService';
import { DivingLog } from '@/interfaces/DivingLog'; // Importez DivingLog depuis votre interface

export default {
  components: {
    'dive-settings-component': DiveSettingsComponentVue,
    'dive-equipment-component': DiveEquipmentComponentVue,
    'dive-conditions-component': DiveConditionsComponent,
    TitleComponent,
    HeaderComponent,
  },
  methods: {
    async submitForm() {
      try {
        const response = await DiveLogService.createDiveLog(this.data); // Utilisez this.data au lieu de this.formData
        console.log('Dive log created:', response.data);
      } catch (error) {
        console.error('Error creating dive log:', error);
      }
    },
  },
  data() {
    return {
      data: {} as DivingLog, // Initialisez data avec le type DivingLog
    };
  },
};
</script>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form-item {
  width: 70%;
  margin: 0 auto;
}
</style>
