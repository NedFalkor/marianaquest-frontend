<template>
    <div class="bloc alerte flex flex-col items-center p-5 border border-gray-300 rounded w-4/5 min-w-[300px] mb-7">
      <h3 class="alert-title text-left text-lg mb-2.5">En Cas de Nécessité</h3>
      <h4 class="input-subtitle text-left text-base">Personne à Prévenir</h4>
      <div class="bloc-content flex flex-col items-center w-full">
        <h3 class="input-title text-center text-xl">Nom de Famille</h3>
        <input type="text" id="personneNom" class="input w-full p-2 border border-gray-300 rounded mb-3.5" />
  
        <h3 class="input-title text-center text-xl">Prénom</h3>
        <input type="text" id="personnePrenom" class="input w-full p-2 border border-gray-300 rounded mb-3.5" />
  
        <h3 class="input-title text-center text-xl">Adresse</h3>
        <input type="text" id="personneAdresse" class="input w-full p-2 border border-gray-300 rounded mb-3.5" />
  
        <h3 class="input-title text-center text-xl">Téléphone Fixe</h3>
        <input type="tel" id="personneTelFixe" class="input w-full p-2 border border-gray-300 rounded mb-3.5" />
  
        <h3 class="input-title text-center text-xl">Téléphone Portable</h3>
        <input type="tel" id="personneMobile" class="input w-full p-2 border border-gray-300 rounded mb-3.5" />
  
        <h3 class="input-title text-center text-xl">Adresse Email</h3>
        <input type="email" id="personneCourriel" class="input w-full p-2 border border-gray-300 rounded" />
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