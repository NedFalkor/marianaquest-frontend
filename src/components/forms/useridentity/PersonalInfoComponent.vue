<template>
  <div class="bg-gray-100 w-1/2 p-6">
    <h3 class="text-2xl mb-5 text-center">Identité du plongeur</h3>

    <!-- photo de profil -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Photo de Profil</h3>
      <div class="relative">
        <i class="fas fa-image absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input type="file" accept="image/*" @change="onFileSelected"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Nom de Famille -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Nom de Famille</h3>
      <div class="relative">
        <i class="fas fa-users absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="last_name" type="text" id="lastName"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Prénom -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Prénom</h3>
      <div class="relative">
        <i class="fas fa-user absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="first_name" type="text" id="firstName"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Adresse -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Adresse</h3>
      <div class="relative">
        <i class="fas fa-map-marker-alt absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="address" type="text"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
    </div>

    <!-- Code Postal -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Code Postal</h3>
      <div class="relative">
        <i class="fas fa-mail-bulk absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="postal_code" type="text" id="postalCode"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Ville -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Ville</h3>
      <div class="relative">
        <i class="fas fa-city absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="city" type="text" id="city"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Pays -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Pays</h3>
      <div class="relative">
        <i class="fa-solid fa-globe absolute left-2 top-3 text-gray-600 text-lg"></i>
        <select v-model="selectedCountry"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>
    </div>

    <!-- Téléphone Fixe -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Téléphone Fixe</h3>
      <div class="relative">
        <i class="fas fa-phone absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="landline" type="tel" id="landlinePhone"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Téléphone Portable -->
    <div class="mb-4">
      <h3 class="text-xl mb-2 text-center">Téléphone Portable</h3>
      <div class="relative">
        <i class="fas fa-mobile-alt absolute left-2 top-3 text-gray-600 text-lg"></i>
        <input v-model="mobile" type="tel" id="mobilePhone"
          class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>

    <!-- Adresse Email -->
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
import { defineComponent, ref } from 'vue';
import { getNames } from 'country-list';

interface PersonalInfo {
  last_name: string;
  first_name: string;
  address: string;
  postal_code: string;
  city: string;
  country: string | null;
  landline: string;
  mobile: string;
  email: string;
  identity_photo: File | null;
}

export default defineComponent({
  name: 'PersonalInfoForm',
  props: {
    personalInfo: {
      type: Object,
      default: () => ({
        last_name: '',
        first_name: '',
        address: '',
        postal_code: '',
        city: '',
        country: '',
        landline: '',
        mobile: '',
        email: '',
        identity_photo: null,
      }),
    },
  },
  setup(props, { emit }) {
    const last_name = ref(props.personalInfo.last_name);
    const first_name = ref(props.personalInfo.first_name);
    const address = ref(props.personalInfo.address);
    const postal_code = ref(props.personalInfo.postal_code);
    const city = ref(props.personalInfo.city);
    const countries = ref(getNames());
    const selectedCountry = ref(props.personalInfo.country);
    const landline = ref(props.personalInfo.landline);
    const mobile = ref(props.personalInfo.mobile);
    const email = ref(props.personalInfo.email);
    const identity_photo = ref(props.personalInfo.identity_photo);

    // sélection d'une photo de profil
    function onFileSelected(event: Event) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        identity_photo.value = files[0];
        emit('update:identityPhoto', files[0]);
      }
    }

    // soumettre les données du formulaire
    function submitData() {
      const personalInfo: PersonalInfo = {
        last_name: last_name.value,
        first_name: first_name.value,
        address: address.value,
        postal_code: postal_code.value,
        city: city.value,
        country: selectedCountry.value,
        landline: landline.value,
        mobile: mobile.value,
        email: email.value,
        identity_photo: identity_photo.value,
      };
      emit('updatePersonalInfo', personalInfo);
    }

    return {
      last_name,
      first_name,
      address,
      postal_code,
      city,
      countries,
      selectedCountry,
      landline,
      mobile,
      email,
      identity_photo,
      onFileSelected,
      submitData,
    };
  },
});
</script>
