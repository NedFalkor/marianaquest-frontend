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
      <input v-model="last_name" type="text" id="lastName"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Prénom</h3>
      <input v-model="first_name" type="text" id="firstName"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

      <h3 class="text-xl mb-4 text-center">Adresse</h3>
      <input v-model="address"
        class="w-full p-2 mb-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline">

      <h3 class="text-xl mb-4 text-center">Code Postal</h3>
      <input v-model="postal_code" type="text" id="postalCode"
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PersonalInfo',
  props: {
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

      console.log("PersonalInfo Data:", {
        last_name: this.last_name,
        first_name: this.first_name,
        address: this.address,
        postal_code: this.postal_code,
        city: this.city,
        country: this.country,
        landline: this.landline,
        mobile: this.mobile,
        email: this.email,
        imageURL: this.imageURL,
        identity_photo: this.identity_photo
      });

      this.$emit('updatePersonalInfo', formData);
    }
  }
});
</script>