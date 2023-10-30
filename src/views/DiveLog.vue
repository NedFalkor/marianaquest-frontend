<template>
  <div>
    <header-component></header-component>
    <TitleComponent :pageTitle="'Formulaire de plongée'" />

    <div class="form-container">
      <dive-settings-component
        class="form-item"
        @update:settings="updateData('settings', $event)"
      ></dive-settings-component>
      <dive-equipment-component
        class="form-item"
        @update:equipment="updateData('equipment', $event)"
      ></dive-equipment-component>
      <dive-conditions-component
        class="form-item"
        @update:conditions="updateData('conditions', $event)"
      ></dive-conditions-component>

      <div class="signature">
        <p>Signature du moniteur :</p>
        <div class="signature-container">
          <canvas ref="signatureCanvas"></canvas>
          <button class="clear-button" @click="clearSignature">
            Effacer la signature
          </button>
        </div>
      </div>

      <div class="stamp">
        <p>Tampon du club ou du moniteur :</p>
        <input type="file" ref="stampInput" @change="showStampPreview" />
      </div>

      <button @click="generatePDFPreview">Aperçu PDF du Formulaire</button>

      <div class="validation-button">
        <button
          class="button is-large"
          style="background-color: #00b289; color: #fff"
          @click="validateDiving"
        >
          Valider la plongée
        </button>
      </div>

      <button @click="submitForm">Enregistrer</button>
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
  width: 100%;
}

.form-item {
  width: 70%;
  margin: 0 auto;
}
</style>
