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
import axios from 'axios';
import { IDiverProfile, IEmergencyContact, IPersonalInfo } from '@/interfaces/Users/DiverProfile';

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
      // Assuming `userId` is available from your application's state or a similar source
      const currentUserId = 1; // Placeholder value, replace with actual logic to obtain userId

      const formData = new FormData();
      // Append personal info data except for the 'identity_photo'
      for (const [key] of Object.entries(personalInfoData.value)) {
        if (key !== 'identity_photo') {
          if (personalInfoData.value.identity_photo) {
            formData.append('identity_photo', personalInfoData.value.identity_photo);
          }

        }
      }

      // Append identity_photo if it exists and is a File object
      if (personalInfoData.value.identity_photo instanceof File) {
        formData.append('identity_photo', personalInfoData.value.identity_photo);
      }

      // Serialize emergency contact data as a JSON string and append
      const emergencyContactJSON = JSON.stringify(emergencyInfoData.value);
      formData.append('emergency_contact', emergencyContactJSON);

      // Prepare the diverProfile object for JSON-based APIs
      // Note: This step might be unnecessary if you're solely using FormData for your request.
      // Adjust according to your backend API requirements.
      const diverProfile: IDiverProfile = {
        userId: currentUserId, // Correctly set the userId
        personalInfo: personalInfoData.value,
        emergencyContact: emergencyInfoData.value,
      };

      try {
        let response;
        // Determine if you are creating a new profile or updating an existing one
        if (diverProfileId.value) {
          // For APIs expecting JSON payload:
          // response = await DiverProfileService.updateDiverProfile(diverProfileId.value, diverProfile);

          // For APIs expecting FormData (e.g., for file uploads):
          formData.append('diverProfile', JSON.stringify({ userId: currentUserId, ...diverProfile }));
          response = await axios.put(`/api/diver-profile/${diverProfileId.value}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } else {
          // For APIs expecting JSON payload:
          // response = await DiverProfileService.createDiverProfile(diverProfile);

          // For APIs expecting FormData:
          formData.append('diverProfile', JSON.stringify({ userId: currentUserId, ...diverProfile }));
          response = await axios.post('/api/diver-profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          diverProfileId.value = response.data.id; // Assuming the API returns the id of the created profile
        }
        console.log("Server response:", response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
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