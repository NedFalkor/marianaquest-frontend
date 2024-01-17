<template>
  <div>
    <header-component></header-component>
    <TitleComponent :pageTitle="'Profil Utilisateur'" />
    <div class="form-container">
      <div class="personal-info">
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
              <input v-model="personalInfoData.last_name" type="text" id="lastName"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour le Prénom -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Prénom</h3>
            <div class="relative">
              <i class="fas fa-user absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="personalInfoData.first_name" type="text" id="firstName"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour l'Adresse -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Adresse</h3>
            <div class="relative">
              <i class="fas fa-map-marker-alt absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="personalInfoData.address" type="text"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
          </div>

          <!-- Champ pour le Code Postal -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Code Postal</h3>
            <div class="relative">
              <i class="fas fa-mail-bulk absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="personalInfoData.postal_code" type="text" id="postalCode"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour la Ville -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Ville</h3>
            <div class="relative">
              <i class="fas fa-city absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="personalInfoData.city" type="text" id="city"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour le Pays -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Pays</h3>
            <div class="relative">
              <i class="fas fa-flag absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="personalInfoData.country" type="text" id="country"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour le Téléphone Fixe -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Téléphone Fixe</h3>
            <div class="relative">
              <i class="fas fa-phone absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="personalInfoData.landline" type="tel" id="landlinePhone"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour le Téléphone Portable -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Téléphone Portable</h3>
            <div class="relative">
              <i class="fas fa-mobile-alt absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="personalInfoData.mobile" type="tel" id="mobilePhone"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour l'Adresse Email -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Adresse Email</h3>
            <div class="relative">
              <i class="fas fa-envelope absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="personalInfoData.email" type="email" id="emailAddress"
                class="pl-10 p-2 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>
        </div>
      </div>
      <div class="emergency-info">
        <div class="bg-gray-100 w-1/2 p-6">

          <div class="mb-4">
            <h3 class="text-2xl mb-5 text-center"><i class="fa-solid fa-heart-circle-exclamation"></i> En Cas de Nécessité
              <i class="fa-solid fa-heart-circle-exclamation"></i>
            </h3>
            <h4 class="text-sm mb-2 text-center italic">Personne à Prévenir</h4>
          </div>

          <!-- Champ pour le Nom de Famille -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Nom de Famille</h3>
            <div class="relative">
              <i class="fas fa-users absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="emergencyInfoData.last_name" type="text" id="emergencyLastName"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour le Prénom -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Prénom</h3>
            <div class="relative">
              <i class="fas fa-user absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="emergencyInfoData.first_name" type="text" id="emergencyFirstName"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour l'Adresse -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Adresse</h3>
            <div class="relative">
              <i class="fas fa-map-marker-alt absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="emergencyInfoData.address" type="text" id="emergencyAddress"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour le Téléphone Fixe -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Téléphone Fixe</h3>
            <div class="relative">
              <i class="fas fa-phone absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="emergencyInfoData.landline" type="tel" id="emergencyLandline"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour le Téléphone Portable -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Téléphone Portable</h3>
            <div class="relative">
              <i class="fas fa-mobile-alt absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="emergencyInfoData.mobile" type="tel" id="emergencyMobile"
                class="pl-10 p-2 mb-4 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <!-- Champ pour l'Adresse Email -->
          <div class="mb-4">
            <h3 class="text-xl mb-2 text-center">Adresse Email</h3>
            <div class="relative">
              <i class="fas fa-envelope absolute left-2 top-3 text-gray-600 text-lg"></i>
              <input v-model="emergencyInfoData.email" type="email" id="emergencyEmail"
                class="pl-10 p-2 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>
        </div>
      </div>
      <button @click="accept">Accepter</button>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import TitleComponent from '@/components/header/TitleComponent.vue';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import DiverProfileService from '@/services/forms/DiverProfileService';
import { IPersonalInfo, IEmergencyContact } from '@/interfaces/DiverProfile';
import axios from 'axios';

export default defineComponent({
  components: {
    TitleComponent,
    HeaderComponent
  },
  setup() {
    const personalInfoData = reactive<IPersonalInfo>({
      last_name: '',
      first_name: '',
      address: '',
      postal_code: '',
      city: '',
      country: '',
      landline: null, // now correctly typed as string | null
      mobile: null, // now correctly typed as string | null
      email: '',
      imageURL: null, // if you plan to use imageURL, it should also be initialized
      identity_photo: null // now correctly typed as File | null
    });

    const emergencyInfoData = reactive<IEmergencyContact>({
      last_name: '',
      first_name: '',
      address: '',
      landline: null, // now correctly typed as string | null
      mobile: null, // now correctly typed as string | null
      email: ''
    });

    const diverProfileId = ref<number | null>(null);

    function onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        personalInfoData.identity_photo = input.files[0];
      }
    }

    const accept = async () => {
      const formData = new FormData();

      // Append personal and emergency info data to formData
      Object.entries(personalInfoData).forEach(([key, value]) => {
        if (value !== null) { // Check for non-null values to include in formData
          formData.append(key, value);
        }
      });

      // Serialize emergency contact data as a JSON string
      formData.append('emergency_contact', JSON.stringify(emergencyInfoData));

      try {
        let response;
        if (diverProfileId.value) {
          response = await DiverProfileService.updateDiverProfile(diverProfileId.value, formData);
        } else {
          response = await DiverProfileService.createDiverProfile(formData);
          diverProfileId.value = response.data.id;
        }
        console.log("Server response:", response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Error submitting data:", error);
        }
      }
    };

    return {
      personalInfoData,
      emergencyInfoData,
      diverProfileId,
      onFileSelected,
      accept
    };
  }
});
</script>
