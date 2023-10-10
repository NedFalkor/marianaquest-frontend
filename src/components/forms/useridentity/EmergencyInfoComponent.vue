<template>
  <div class="flex flex-col items-center">

    <div class="flex flex-col items-center mb-7 p-5 border border-gray-300 rounded w-4/5 min-w-[300px]">
      <h3 class="text-xl mb-4 text-center">En Cas de Nécessité</h3>
      <h4 class="text-base mb-4 text-left">Personne à Prévenir</h4>
    </div>

    <div class="flex flex-col items-center mb-7 p-5 border border-gray-300 rounded w-4/5 min-w-[300px]">
      <h3 class="text-xl mb-4 text-center">Nom de Famille</h3>
      <input type="text" id="personneNom" class="w-full p-2 mb-4 border border-gray-300 rounded" />

      <h3 class="text-xl mb-4 text-center">Prénom</h3>
      <input type="text" id="personnePrenom" class="w-full p-2 mb-4 border border-gray-300 rounded" />

      <h3 class="text-xl mb-4 text-center">Adresse</h3>
      <input type="text" id="personneAdresse" class="w-full p-2 mb-4 border border-gray-300 rounded" />
    </div>

    <div class="flex flex-col items-center mb-7 p-5 border border-gray-300 rounded w-4/5 min-w-[300px]">
      <h3 class="text-xl mb-4 text-center">Téléphone Fixe</h3>
      <input type="tel" id="personneTelFixe" class="w-full p-2 mb-4 border border-gray-300 rounded" />

      <h3 class="text-xl mb-4 text-center">Téléphone Portable</h3>
      <input type="tel" id="personneMobile" class="w-full p-2 mb-4 border border-gray-300 rounded" />

      <h3 class="text-xl mb-4 text-center">Adresse Email</h3>
      <input type="email" id="personneCourriel" class="w-full p-2 border border-gray-300 rounded" />
    </div>
  </div>
</template>


<script lang="ts">
export default {
  name: 'EmergencyInfo',
  data() {
    return {
      personneNom: '',
      personnePrenom: '',
      personneAdresse: '',
      personneTelFixe: '',
      personneMobile: '',
      personneCourriel: ''
    };
  },
  methods: {
  }
};
</script>

<style>
    
</style>