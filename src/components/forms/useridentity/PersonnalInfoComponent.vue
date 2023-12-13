<template>
  <div class="bg-gray-100 w-1/2 p-6">
    <h3 class="text-2xl mb-5 text-center">Identité du plongeur</h3>

    <!-- Champ pour la photo de profil -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Photo de Profil</h3>
      <div class="relative">
        <i class="fas fa-image absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input type="file" accept="image/*" @change="onFileSelected"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour le Nom de Famille -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Nom de Famille</h3>
      <div class="relative">
        <i class="fas fa-users absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="last_name" type="text" id="lastName"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour le Prénom -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Prénom</h3>
      <div class="relative">
        <i class="fas fa-user absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="first_name" type="text" id="firstName"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour l'Adresse -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Adresse</h3>
      <div class="relative">
        <i class="fas fa-map-marker-alt absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="address" type="text"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
    </div>

    <!-- Champ pour le Code Postal -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Code Postal</h3>
      <div class="relative">
        <i class="fas fa-mail-bulk absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="postal_code" type="text" id="postalCode"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour la Ville -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Ville</h3>
      <div class="relative">
        <i class="fas fa-city absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="city" type="text" id="city"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour le Pays -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Pays</h3>
      <div class="relative">
        <i class="fas fa-flag absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="country" type="text" id="country"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour le Téléphone Fixe -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Téléphone Fixe</h3>
      <div class="relative">
        <i class="fas fa-phone absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="landline" type="tel" id="landlinePhone"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour le Téléphone Portable -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Téléphone Portable</h3>
      <div class="relative">
        <i class="fas fa-mobile-alt absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="mobile" type="tel" id="mobilePhone"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Champ pour l'Adresse Email -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Adresse Email</h3>
      <div class="relative">
        <i class="fas fa-envelope absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="email" type="email" id="emailAddress"
          class="pl-10 p-2 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PersonalInfo',
  props: {
    personalInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      last_name: '',
      first_name: '',
      address: '',
      postal_code: '',
      city: '',
      country: '',
      landline: '',
      mobile: '',
      email: '',
      imageURL: '',
      identity_photo: null as File | null
    };
  },
  methods: {
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.identity_photo = input.files[0];
        this.imageURL = URL.createObjectURL(this.identity_photo);
        console.log("Image sélectionnée:", this.identity_photo);
      }
    },
    submitData() {
      const formData = new FormData();
      if (this.identity_photo) {
        formData.append('identity_photo', this.identity_photo);
      }
      formData.append('last_name', this.last_name);
      formData.append('first_name', this.first_name);
      formData.append('address', this.address);
      formData.append('postal_code', this.postal_code);
      formData.append('city', this.city);
      formData.append('country', this.country);
      formData.append('landline', this.landline);
      formData.append('mobile', this.mobile);
      formData.append('email', this.email);

      console.log("Données de PersonalInfo soumises:", formData);
      this.$emit('updatePersonalInfo', formData);
    }
  }
});
</script>