<template>
  <div class="bg-gray-100 w-1/2 p-6">

    <div class="mb-4">
      <h3 class="text-2xl mb-5 text-center"><i class="fa-solid fa-heart-circle-exclamation"></i> En Cas de Nécessité <i
          class="fa-solid fa-heart-circle-exclamation"></i></h3>
      <h4 class="text-sm mb-2 text-center italic">Personne à Prévenir</h4>
    </div>

    <!-- Champ pour le Nom de Famille -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Nom de Famille</h3>
      <div class="relative">
        <i class="fas fa-user absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="last_name" type="text" id="emergencyLastName"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour le Prénom -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Prénom</h3>
      <div class="relative">
        <i class="fas fa-user absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="first_name" type="text" id="emergencyFirstName"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour l'Adresse -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Adresse</h3>
      <div class="relative">
        <i class="fas fa-map-marker-alt absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="address" type="text" id="emergencyAddress"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour le Téléphone Fixe -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Téléphone Fixe</h3>
      <div class="relative">
        <i class="fas fa-phone absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="landline" type="tel" id="emergencyLandline"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour le Téléphone Portable -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Téléphone Portable</h3>
      <div class="relative">
        <i class="fas fa-mobile-alt absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="mobile" type="tel" id="emergencyMobile"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour l'Adresse Email -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Adresse Email</h3>
      <div class="relative">
        <i class="fas fa-envelope absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="email" type="email" id="emergencyEmail"
          class="pl-10 p-2 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmergencyInfo',
  data() {
    return {
      last_name: '',
      first_name: '',
      address: '',
      landline: '',
      mobile: '',
      email: ''
    };
  },
  methods: {
    emitEmergencyData() {
      console.log("EmergencyInfo Data:", {
        last_name: this.last_name,
        first_name: this.first_name,
        address: this.address,
        landline: this.landline,
        mobile: this.mobile,
        email: this.email
      });
      this.$emit('update:emergencyInfo', {
        ...this.$data
      });
    }
  }
});
</script>
