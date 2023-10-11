<template>

  <div class="bg-gray-100 w-1/2 p-6">
    <h3 class="text-2xl mb-5 text-center">Identité du plongeur</h3>

  <div class="mb-4">
    <input type="file" accept="image/*" @change="onFileSelected" 
       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block" />
    <div v-if="imageURL" class="image-container mt-4">
      <img :src="imageURL" alt="Chosen Image"/>
    </div>
  </div>

    <div class="mb-4">
      <h3 class="text-xl mb-4 text-center">Nom de Famille</h3>
      <input type="text" id="lastName"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Prénom</h3>
      <input type="text" id="firstName"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Adresse</h3>
      <input type="text" id="address"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Code Postal</h3>
      <input type="text" id="postalCode"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Ville</h3>
      <input type="text" id="city"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Pays</h3>
      <input type="text" id="country"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div class="mb-4">
      <h3 class="text-xl mb-4 text-center">Téléphone Fixe</h3>
      <input type="tel" id="landlinePhone"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Téléphone Portable</h3>
      <input type="tel" id="mobilePhone"
      class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

    <h3 class="text-xl mb-4 text-center">Adresse Email</h3>
    <input type="email" id="emailAddress"
      class="w-full p-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>
</div>

</template>


<script lang="ts">

import { ref } from 'vue';

export default {
  setup() {
    const selectedImage = ref<File | null>(null);
    const lastName = ref<string>('');
    const firstName = ref<string>('');
    const address = ref<string>('');
    const postalCode = ref<string>('');
    const city = ref<string>('');
    const country = ref<string>('');
    const landlinePhone = ref<string>('');
    const mobilePhone = ref<string>('');
    const emailAddress = ref<string>('');
    const imageURL = ref<string | null>(null);

    function onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        selectedImage.value = input.files[0];
        imageURL.value = URL.createObjectURL(selectedImage.value);
      }
    }

    return {
      selectedImage,
      onFileSelected,
      lastName,
      firstName,
      address,
      postalCode,
      city,
      country,
      landlinePhone,
      mobilePhone,
      emailAddress,
      imageURL
    };
  }
};
</script>

<style>

.image-container {
  width: 150px;
  height: 300px;
  overflow: hidden;
  border-radius: 5px;
  margin: 0 auto;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

</style>