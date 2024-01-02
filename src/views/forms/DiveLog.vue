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
import TitleComponent from "@/components/header/TitleComponent.vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import DiveLogService from "@/services/forms/DiveLogService";
import { jsPDF } from "jspdf";
import {
  IDiveConditions,
  IDiveEquipment,
  IDiveSettings,
  IDivingLog,
  ISignatureData,
} from "@/interfaces/DivingLog";
import DiveConditionsComponentVue from "@/components/forms/divelog/DiveConditionsComponent.vue";

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
    equipment: {} as IDiveEquipment,
    conditions: {} as IDiveConditions,
    signatureData: {} as ISignatureData
  };

  stampPreview: string | null = null;
  signatureCanvas!: HTMLCanvasElement;
  isDrawing = false;
  lastX = 0;
  lastY = 0;

  mounted() {
    this.$nextTick(() => {
      this.initCanvas();
    });
  }

  initCanvas() {
    const canvasElement = this.$refs.signatureCanvas;
    if (canvasElement instanceof HTMLCanvasElement) {
      this.signatureCanvas = canvasElement;
      this.signatureCanvas.width = this.signatureCanvas.offsetWidth;
      this.signatureCanvas.height = this.signatureCanvas.offsetHeight;
      const ctx = this.signatureCanvas.getContext('2d');
      if (!ctx) return;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      this.signatureCanvas.addEventListener('mousedown', this.startDrawing);
      this.signatureCanvas.addEventListener('mousemove', this.draw);
      this.signatureCanvas.addEventListener('mouseup', () => this.isDrawing = false);
      this.signatureCanvas.addEventListener('mouseout', () => this.isDrawing = false);
    } else {
      console.error('Canvas non trouvé ou élément incorrect');
    }
  }


  startDrawing(e: MouseEvent) {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  draw(e: MouseEvent) {
    if (!this.isDrawing) return;
    const ctx = this.signatureCanvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }


  updateData(section: keyof IDivingLog, updatedData: unknown) {
    this.diveData[section] = updatedData as any;
  }

  clearSignature() {
    if (this.signatureCanvas && this.signatureCanvas.getContext) {
      const context = this.signatureCanvas.getContext('2d');
      context?.clearRect(0, 0, this.signatureCanvas.width, this.signatureCanvas.height);
    }
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
      this.stampPreview = null;
    }
  }

  generatePDFContent(doc: jsPDF) {
    let yPosition = 10;

    const displayData = (label: string, value: string | number | null) => {
      doc.text(`${label}: ${value ?? "N/A"}`, 10, yPosition);
      yPosition += 10;
    };

    const displaySectionData = (sectionData: Record<string, any>, sectionName: string) => {
      doc.text(sectionName, 10, yPosition);
      yPosition += 10;
      for (const key in sectionData) {
        const value = sectionData[key];
        displayData(key, value);
      }
    };

    displaySectionData(this.diveData.settings, "Paramètres de Plongée");
    displaySectionData(this.diveData.equipment, "Équipement de Plongée");
    displaySectionData(this.diveData.conditions, "Conditions de Plongée");
    displaySectionData(this.diveData.signatureData, "Données de Signature");

    if (this.diveData.signatureData.signature) {
      doc.addImage(this.diveData.signatureData.signature, 'JPEG', 10, yPosition, 50, 30);
      yPosition += 40;
    }

    if (this.stampPreview) {
      doc.addImage(this.stampPreview, 'JPEG', 10, yPosition, 50, 30);
      yPosition += 40;
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
    console.log("Envoi des données au backend:", this.diveData);
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
