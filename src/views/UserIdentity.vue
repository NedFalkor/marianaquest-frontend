<template>
  <div>
    <header-component></header-component>
    <TitleComponent :pageTitle="`Formulaire d'utilisateur`" />
    <personnal-info></personnal-info>
    <emergency-info></emergency-info>
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