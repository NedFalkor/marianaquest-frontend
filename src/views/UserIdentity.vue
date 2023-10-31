<template>
  <div>
    <header-component></header-component>
    <TitleComponent :pageTitle="`Formulaire d'utilisateur`" />
    <div class="form-container">
      <personnal-info class="form-item" @update:personalInfo="updatePersonalInfo"></personnal-info>
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
import { IPersonalInfo, IEmergencyContact, IDiverProfile } from '@/interfaces/DiverProfile';

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
      const combinedData: IDiverProfile = {
        userId: 0,
        logbookNumber: '',
        cumulativeDivesInLogbook: 0,
        totalDives: 0,
        personalInfo: personalInfoData.value,
        emergencyContact: emergencyInfoData.value
      };

      if (diverProfileId.value) {
        await DiverProfileService.updateDiverProfile(diverProfileId.value, combinedData);
      } else {
        const response = await DiverProfileService.createDiverProfile(combinedData);
        diverProfileId.value = response.data.id;
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
