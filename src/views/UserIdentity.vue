<template>
  <div>
    <personnal-info></personnal-info>
    <emergency-info></emergency-info>
  </div>
  </template>
  
  <script lang="ts">
  import PersonnalInfoComponent from '@/components/forms/useridentity/PersonnalInfoComponent.vue';
  import EmergencyInfoComponent from '@/components/forms/useridentity/EmergencyInfoComponent.vue';
  
  export default {
    components: {
      'personnal-info': PersonnalInfoComponent,
      'emergency-info': EmergencyInfoComponent,
    }
  }
  </script>
  
  