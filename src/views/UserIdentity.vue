<template>
  <div>
    <header-component></header-component>
    <TitleComponent :pageTitle="`Formulaire d'utilisateur`" />
    <div class="form-container">
      <personnal-info class="form-item"></personnal-info>
      <emergency-info class="form-item"></emergency-info>
    </div>
  </div>
</template>

<script lang="ts">
import PersonnalInfoComponent from '@/components/forms/useridentity/PersonnalInfoComponent.vue';
import EmergencyInfoComponent from '@/components/forms/useridentity/EmergencyInfoComponent.vue';
import TitleComponent from '@/components/header/TitleComponent.vue';
import HeaderComponent from '@/components/header/HeaderComponent.vue'

export default {
  components: {
    'personnal-info': PersonnalInfoComponent,
    'emergency-info': EmergencyInfoComponent,
    TitleComponent,
    HeaderComponent
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
