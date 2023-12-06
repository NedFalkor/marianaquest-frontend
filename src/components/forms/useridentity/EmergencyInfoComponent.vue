<template>
  <div class="bg-gray-100 w-1/2 p-6">

    <div class="mb-4">
      <h3 class="text-2xl mb-5 text-center">En Cas de Nécessité</h3>
      <h4 class="text-sm mb-2 text-center italic">Personne à Prévenir</h4>
    </div>

    <div class="mb-4">
      <h3 class="text-xl mb-4 text-center">Nom de Famille</h3>
      <input v-model="last_name" type="text" id="emergencyLastName"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Prénom</h3>
      <input v-model="first_name" type="text" id="emergencyFirstName"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Adresse</h3>
      <input v-model="address" type="text" id="emergencyAddress"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div class="mb-4">
      <h3 class="text-xl mb-4 text-center">Téléphone Fixe</h3>
      <input v-model="landline" type="tel" id="emergencyLandline"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Téléphone Portable</h3>
      <input v-model="mobile" type="tel" id="emergencyMobile"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Adresse Email</h3>
      <input v-model="email" type="email" id="emergencyEmail"
        class="w-full p-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
