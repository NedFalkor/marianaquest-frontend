<template>
  <div>
    <header-component></header-component>
    <TitleComponent :pageTitle="'Profil Utilisateur'" />
    <div class="form-container">
      <personnal-info class="form-item" :personalInfo="personalInfoData"
        @update:personalInfo="updatePersonalInfo"></personnal-info>
      <emergency-info class="form-item" @update:emergencyInfo="updateEmergencyInfo"></emergency-info>
      <button @click="accept">Accepter</button>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import PersonnalInfoComponent from '@/components/forms/useridentity/PersonnalInfoComponent.vue';
import EmergencyInfoComponent from '@/components/forms/useridentity/EmergencyInfoComponent.vue';
import TitleComponent from '@/components/header/TitleComponent.vue';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import DiverProfileService from '@/services/DiverProfileService';
import { IPersonalInfo, IEmergencyContact } from '@/interfaces/DiverProfile';
import axios from 'axios';

export default defineComponent({
  components: {
    'personnal-info': PersonnalInfoComponent,
    'emergency-info': EmergencyInfoComponent,
    TitleComponent,
    HeaderComponent
  },
  setup() {
    const personalInfoData = ref<IPersonalInfo>({} as IPersonalInfo);
    const emergencyInfoData = ref<IEmergencyContact>({} as IEmergencyContact);
    const diverProfileId = ref<number | null>(null);

    const updatePersonalInfo = (data: IPersonalInfo) => {
      personalInfoData.value = data;
    };

    const updateEmergencyInfo = (data: IEmergencyContact) => {
      emergencyInfoData.value = data;
    };

    const accept = async () => {
      const formData = new FormData();
      // Append personal info data except for the 'identity_photo'
      for (const [key, value] of Object.entries(personalInfoData.value)) {
        if (key !== 'identity_photo') {
          formData.append(key, value as string);
        }
      }

      // Append identity_photo if it exists and is a File object
      if (personalInfoData.value.identity_photo instanceof File) {
        formData.append('identity_photo', personalInfoData.value.identity_photo);
      }

      // Serialize emergency contact data as a JSON string
      formData.append('emergency_contact', JSON.stringify(emergencyInfoData.value));

      try {
        let response;
        if (diverProfileId.value) {
          response = await DiverProfileService.updateDiverProfile(diverProfileId.value, formData);
        } else {
          response = await DiverProfileService.createDiverProfile(formData);
          diverProfileId.value = response.data.id;
        }
        console.log("Server response:", response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Handle Axios error here
          console.error("Axios error:", error.message);
        } else {
          // Handle generic errors here
          console.error("Error submitting data:", error);
        }
      }
    };

    return {
      personalInfoData,
      emergencyInfoData,
      diverProfileId,
      updatePersonalInfo,
      updateEmergencyInfo,
      accept
    };
  }
});
</script>


