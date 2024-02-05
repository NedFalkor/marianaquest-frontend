<template>
  <div class="min-h-screen bg-blue-50">
    <header-component class="mb-4"></header-component>
    <TitleComponent class="text-center text-blue-900 mb-8" :pageTitle="'Formulaire de plongée'" />
    <div class="flex justify-center px-5 py-5">
      <div class="w-3/4 mx-auto rounded-xl bg-f5e7bc shadow-xl text-gray-800 relative overflow-hidden p-6">
        <dive-settings-component class="marine-style p-4 mt-4 rounded-md shadow-md"
          @update:settings="updateData('settings', $event)" />
        <dive-equipment-component class="marine-style p-4 mt-4 rounded-md shadow-md"
          @update:equipment="updateData('equipment', $event)" />
        <dive-conditions-component class="marine-style p-4 mt-4 rounded-md shadow-md"
          @update:conditions="updateData('conditions', $event)" />
        <button class="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md px-4 py-2"
          @click="submitForm">Enregistrer</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IDiveConditions, IDiveEquipment, IDiveSettings, IDivingLog } from "@/interfaces/DivingLog";
import DiveConditionsComponentVue from "@/components/forms/divelog/DiveConditionsComponent.vue";
import DiveSettingsComponentVue from "@/components/forms/divelog/DiveSettingsComponent.vue";
import DiveEquipmentComponentVue from "@/components/forms/divelog/DiveEquipmentComponent.vue";
import DiveLogService from "@/services/forms/DiveLogService";
import TitleComponent from "@/components/header/TitleComponent.vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";

@Options({
  components: {
    "dive-settings-component": DiveSettingsComponentVue,
    "dive-equipment-component": DiveEquipmentComponentVue,
    "dive-conditions-component": DiveConditionsComponentVue,
    TitleComponent,
    HeaderComponent,
  },
})
export default class DiveLog extends Vue {
  private diveData: IDivingLog = {
    id: 0,
    user: 0,
    settings: {} as IDiveSettings,
    status: '',
    equipment: {} as IDiveEquipment,
    conditions: {} as IDiveConditions
  };

  updateData<K extends keyof IDivingLog>(section: K, updatedData: IDivingLog[K]) {
    this.diveData[section] = updatedData;
  }

  async submitForm() {
    console.log("Envoi des données au backend:", this.diveData);
    try {
      const response = await DiveLogService.createDiveLog(this.diveData);
      console.log("Dive log created:", response.data);
      // Handle successful form submission, like redirecting to another page or showing a success message
    } catch (error) {
      console.error("Erreur lors de la création du journal de plongée:", error);
      // Handle error, like showing an error message to the user
    }
  }
}
</script>


<style>
.form-container {
  width: 75%;
  margin: 0 auto;
}

.form-item {
  width: 100%;
  margin: 0 auto;
  background-color: #ebf8ff;
  border: 2px solid #2c5282;
}

.marine-style {
  background-color: #ebf8ff;
  border: 2px solid #2c5282;
}

.text-2c5282 {
  color: #2c5282;
}

.border-2c5282 {
  border-color: #2c5282;
}

.bg-sand {
  background-color: #f5e7bc;
}
</style>