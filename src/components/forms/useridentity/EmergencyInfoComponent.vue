<template>
  <div class="bg-gray-100 w-1/2 p-6">

    <div class="mb-4">
      <h3 class="text-2xl mb-5 text-center">En Cas de Nécessité</h3>
      <h4 class="text-sm mb-2 text-center italic">Personne à Prévenir</h4>
    </div>

    <div class="mb-4">
      <h3 class="text-xl mb-4 text-center">Nom de Famille</h3>
      <input v-model="emergencyLastName" type="text" id="emergencyLastName"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Prénom</h3>
      <input v-model="emergencyFirstName" type="text" id="emergencyFirstName"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Adresse</h3>
      <input v-model="emergencyAddress" type="text" id="emergencyAddress"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div class="mb-4">
      <h3 class="text-xl mb-4 text-center">Téléphone Fixe</h3>
      <input v-model="emergencyLandline" type="tel" id="emergencyLandline"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Téléphone Portable</h3>
      <input v-model="emergencyMobile" type="tel" id="emergencyMobile"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Adresse Email</h3>
      <input v-model="emergencyEmail" type="email" id="emergencyEmail"
        class="w-full p-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
  </div>
</template>


<script lang="ts">
export default {
  name: 'EmergencyInfo',
  data() {
    return {
      emergencyLastName: '',
      emergencyFirstName: '',
      emergencyAddress: '',
      emergencyLandline: '',
      emergencyMobile: '',
      emergencyEmail: ''
    };
  },

  methods: {
    // Ajoutez ici les méthodes si nécessaire.
  }
};
</script>


<style>
    
</style>