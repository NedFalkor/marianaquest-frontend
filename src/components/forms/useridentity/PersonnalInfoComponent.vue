<template>
  <div class="bg-gray-100 w-1/2 p-6">
    <h3 class="text-2xl mb-5 text-center">Identité du plongeur</h3>

    <div class="mb-4">
      <input type="file" accept="image/*" @change="onFileSelected"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block" />
      <div v-if="imageURL" class="image-container mt-4">
        <img :src="imageURL" alt="Chosen Image" />
      </div>
    </div>

    <div class="mb-4">
      <h3 class="text-xl mb-4 text-center">Nom de Famille</h3>
      <input v-model="lastName" type="text" id="lastName"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Prénom</h3>
      <input v-model="firstName" type="text" id="firstName"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Adresse</h3>
      <input v-model="address" type="text" id="address"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Code Postal</h3>
      <input v-model="postalCode" type="text" id="postalCode"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Ville</h3>
      <input v-model="city" type="text" id="city"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Pays</h3>
      <input v-model="country" type="text" id="country"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div class="mb-4">
      <h3 class="text-xl mb-4 text-center">Téléphone Fixe</h3>
      <input v-model="landline" type="tel" id="landlinePhone"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Téléphone Portable</h3>
      <input v-model="mobile" type="tel" id="mobilePhone"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Adresse Email</h3>
      <input v-model="email" type="email" id="emailAddress"
        class="w-full p-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
  </div>
</template>


<script lang="ts">
import { IPersonalInfo } from '@/interfaces/DiverProfile';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PersonalInfo',
  data(): Partial<IPersonalInfo> {
    return {
      lastName: '',
      firstName: '',
      address: '',
      postalCode: '',
      city: '',
      country: '',
      landline: null,
      mobile: null,
      email: '',
      imageURL: null,
      selectedImage: null
    };
  },
  methods: {
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedImage = input.files[0];
        this.imageURL = URL.createObjectURL(this.selectedImage);
      }
    },
    emitData() {
      this.$emit('update:personalInfo', {
        ...this.$data
      });
    }
  }
});
</script>