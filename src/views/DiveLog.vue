<template>
  <div class="min-h-screen bg-blue-50">
    <header-component class="mb-4"></header-component>
    <TitleComponent class="text-center text-blue-900 mb-8" :pageTitle="'Formulaire de plongée'" />
    <div class="min-w-screen min-h-screen bg-blue-50 flex items-center justify-center px-5 py-5">
      <div class="w-3/4 mx-auto rounded-xl bg-f5e7bc shadow-xl text-gray-800 relative overflow-hidden p-6">
        <dive-settings-component class="marine-style p-4 mt-4 rounded-md shadow-md"
          @update:settings="updateData('settings', $event)" />
        <dive-equipment-component class="marine-style p-4 mt-4 rounded-md shadow-md"
          @update:equipment="updateData('equipment', $event)" />
        <dive-conditions-component class="marine-style p-4 mt-4 rounded-md shadow-md"
          @update:conditions="updateData('conditions', $event)" />
        <div class="signature mt-4 p-4 rounded-md shadow-md bg-gray-100">
          <p class="text-2c5282 block">Signature du moniteur :</p>
          <div class="signature-container flex items-center mt-4">
            <canvas class="border-2c5282 border shadow rounded-md mr-4" ref="signatureCanvas"></canvas>
            <button class="clear-button bg-red-500 text-white rounded-md px-2 py-1" @click="clearSignature">Effacer la
              signature</button>
          </div>
        </div>
        <div class="stamp mt-4 p-4 rounded-md shadow-md bg-gray-100">
          <p class="text-2c5282 block">Tampon du club ou du moniteur :</p>
          <input type="file"
            class="mt-4 shadow appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ref="stampInput" @change="showStampPreview" />
          <button class="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md px-4 py-2"
            @click="generatePDFPreview">Aperçu PDF</button>
        </div>
        <div class="validation-button mt-4">
          <button class="button is-large bg-green-500 text-white rounded-md px-6 py-3" @click="validateDiving">Valider la
            plongée</button>
        </div>
        <button class="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md px-4 py-2"
          @click="submitForm">Enregistrer</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DiveSettingsComponentVue from "@/components/forms/divelog/DiveSettingsComponent.vue";
import DiveEquipmentComponentVue from "@/components/forms/divelog/DiveEquipmentComponent.vue";
import DiveConditionsComponent from "@/components/forms/divelog/DiveConditionsComponent.vue";
import TitleComponent from "@/components/header/TitleComponent.vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import DiveLogService from "@/services/DiveLogService";
import { jsPDF } from "jspdf";
import {
  IDiveConditions,
  IDiveEquipment,
  IDiveSettings,
  IDivingLog,
  ISignatureData,
} from "@/interfaces/DivingLog";

@Options({
  components: {
    "dive-settings-component": DiveSettingsComponentVue,
    "dive-equipment-component": DiveEquipmentComponentVue,
    "dive-conditions-component": DiveConditionsComponent,
    TitleComponent,
    HeaderComponent,
  },
})
export default class DiveLog extends Vue {
  diveData: IDivingLog = {
    id: 0,
    user: 0,
    settings: {
      dive_number: null,
      dive_date: null,
      dive_site: "",
      environment: "",
      depth: null,
      duration_dive: null,
      surface_return: "",
      decompression_stop: "",
    },
    equipment: {
      bottle_type: null,
      wet_suit: "",
      ballast: "",
      dive_type: "",
      gas_type: "",
      group: "",
      consumption_start: null,
      consumption_end: null,
    },
    conditions: {
      air_temperature: null,
      water_temperature: null,
      weather: "",
      visibility: "",
      current: "",
      observations: "",
    },
    signatureData: {
      signature: "",
      stamp: "",
    },
  };

  stampPreview: string | null = null;
  signatureCanvas!: HTMLCanvasElement;

  updateData(section: keyof IDivingLog, updatedData: unknown) {
    this.diveData[section] = updatedData as any;
  }

  clearSignature() {
    const context = this.signatureCanvas.getContext("2d");
    context?.clearRect(
      0,
      0,
      this.signatureCanvas.width,
      this.signatureCanvas.height
    );
  }

  showStampPreview() {
    const fileInput = this.$refs.stampInput as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.stampPreview = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.stampPreview = "";
    }
  }

  generatePDFContent(doc: jsPDF) {
    let yPosition = 10;

    const displayData = (label: string, value: any) => {
      doc.text(`${label}: ${value || "N/A"}`, 10, yPosition);
      yPosition += 10;
    };

    displayData("ID", this.diveData.id);
    displayData("Utilisateur", this.diveData.user);

    for (const key in this.diveData.settings) {
      const value = this.diveData.settings[key as keyof IDiveSettings];
      displayData(key, value);
    }

    for (const key in this.diveData.equipment) {
      const value = this.diveData.equipment[key as keyof IDiveEquipment];
      displayData(key, value);
    }

    for (const key in this.diveData.conditions) {
      const value = this.diveData.conditions[key as keyof IDiveConditions];
      displayData(key, value);
    }

    for (const key in this.diveData.signatureData) {
      const value = this.diveData.signatureData[key as keyof ISignatureData];
      displayData(key, value);
    }
  }

  generatePDFPreview() {
    const doc = new jsPDF();
    this.generatePDFContent(doc);
    const pdfOutput = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfOutput);
    window.open(pdfUrl, "_blank");
  }

  validateDiving() {
    this.diveData.signatureData.signature =
      this.signatureCanvas?.toDataURL() ?? "";
    this.diveData.signatureData.stamp = this.stampPreview ?? "";
  }

  async submitForm() {
    const response = await DiveLogService.createDiveLog(this.diveData);
    if (response && response.data) {
      console.log("Dive log created:", response.data);
    } else {
      alert("Erreur lors de la création du journal de plongée.");
    }
  }
}
</script>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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