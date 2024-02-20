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
import PersonalInfoComponent from '@/components/forms/useridentity/PersonalInfoComponent.vue';
import EmergencyInfoComponent from '@/components/forms/useridentity/EmergencyInfoComponent.vue';
import TitleComponent from '@/components/header/TitleComponent.vue';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import { IEmergencyContact, IPersonalInfo } from '@/interfaces/Users/DiverProfile';
import DiverProfileService from '@/services/forms/DiverProfileService';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { ICustomJwtPayload } from '@/interfaces/JWT Tokens/CustomJWTPayload';

export default defineComponent({
  components: {
    'personnal-info': PersonalInfoComponent,
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
      landline: '',
      mobile: '',
      identity_photo: null
    });
    const emergencyInfoData = ref<IEmergencyContact>({
      last_name: '',
      first_name: '',
      address: '',
      landline: '',
      mobile: '',
      email: ''
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

        const decodedToken = jwtDecode<ICustomJwtPayload>(token);
        const currentUserId = decodedToken.user_id;

        if (!currentUserId) {
          console.error('User ID is undefined or not valid');
          return;
        }

        // Create a single object for both personal and emergency contact data
        const profileData = {
          user: currentUserId,
          ...personalInfoData.value,
          emergency_contact: emergencyInfoData.value,
        };

        let formData = new FormData();

        // Append identity photo if it exists
        if (personalInfoData.value.identity_photo instanceof File) {
          formData.append('identity_photo', personalInfoData.value.identity_photo);
        }

        // Append the combined profileData as a JSON string
        formData.append('diverProfileData', JSON.stringify(profileData));

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

