<template>
  <div>
    <header-component></header-component>
    <TitleComponent :pageTitle="`Formulaire d'utilisateur`" />
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
      if (personalInfoData.value.identity_photo) {
        formData.append('identity_photo', personalInfoData.value.identity_photo);
      }

      const combinedData = {
        ...personalInfoData.value,
        emergency_contact: emergencyInfoData.value
      };
      delete combinedData.identity_photo;
      formData.append('diverProfile', JSON.stringify(combinedData));

      console.log("Données combinées à envoyer:", combinedData);
      try {
        let response;
        if (diverProfileId.value) {
          response = await DiverProfileService.updateDiverProfile(diverProfileId.value, formData);
        } else {
          response = await DiverProfileService.createDiverProfile(formData);
          diverProfileId.value = response.data.id;
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi des données:", error);
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