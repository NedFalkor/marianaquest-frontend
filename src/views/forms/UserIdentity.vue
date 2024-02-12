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
import PersonnalInfoComponent from '@/components/forms/useridentity/PersonalInfoComponent.vue';
import EmergencyInfoComponent from '@/components/forms/useridentity/EmergencyInfoComponent.vue';
import TitleComponent from '@/components/header/TitleComponent.vue';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import { IEmergencyContact, IPersonalInfo, IDiverProfile } from '@/interfaces/Users/DiverProfile';
import DiverProfileService from '@/services/forms/DiverProfileService';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default defineComponent({
  components: {
    'personnal-info': PersonnalInfoComponent,
    'emergency-info': EmergencyInfoComponent,
    TitleComponent,
    HeaderComponent
  },
  setup() {
    const personalInfoData = ref<IPersonalInfo>({
      last_name: '',
      first_name: '',
      address: '',
      postal_code: '',
      city: '',
      country: '',
      email: '',
    });
    const emergencyInfoData = ref<IEmergencyContact>({
      last_name: '',
      first_name: '',
      address: '',
      landline: null,
      mobile: null,
      email: '',
    });

    const diverProfileId = ref<number | null>(null);

    const updatePersonalInfo = (data: IPersonalInfo) => {
      personalInfoData.value = data;
    };

    const updateEmergencyInfo = (data: IEmergencyContact) => {
      emergencyInfoData.value = data;
    };

    const accept = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('Token not found');
          return;
        }
        const decodedToken: { user_id: number } = jwtDecode(token);
        const currentUserId = decodedToken.user_id;

        // Créer un objet de type IDiverProfile à partir des données de formulaire et d'urgence
        const diverProfileData: IDiverProfile = {
          personalInfo: personalInfoData.value,
          emergencyContact: emergencyInfoData.value
        };

        // Utilisation de DiverProfileService pour envoyer les données
        let response;
        if (diverProfileId.value) {
          response = await DiverProfileService.updateDiverProfile(diverProfileId.value, diverProfileData);
        } else {
          response = await DiverProfileService.createDiverProfile(diverProfileData);
          diverProfileId.value = response.data.id;
        }
        console.log("Server response:", response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error submitting data:", error.response?.data || error.message);
        } else if (error instanceof Error) {
          console.error("Error submitting data:", error.message);
        } else {
          console.error("An unexpected error occurred", error);
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
