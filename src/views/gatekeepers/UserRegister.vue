<template>
  <div class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
    <div class="w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden"
      style="max-width: 500px">
      <div class="bg-indigo-600 w-full py-5 px-6 text-3xl text-white font-thin text-center">Inscription</div>
      <user-register-form-component ref="userForm" @registration-data="handleRegistration"></user-register-form-component>
      <button @click="submitForm"
        class="w-full h-16 text-xl font-light bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Créer un
        compte</button>
      <div class="mt-4 text-center">
        <router-link to="/userauth" class="text-indigo-600 hover:underline">Vous possédez déjà un compte ?</router-link>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { AxiosError } from 'axios';
import UserRegisterFormComponentVue from '@/components/forms/gatekeepers/UserRegisterFormComponent.vue';
import router from '@/router';
import CustomUserService from '@/services/gatekeepers/CustomUserService';
import { ICustomUser } from '@/interfaces/CustomUser';

export default defineComponent({
  components: {
    "user-register-form-component": UserRegisterFormComponentVue,
  },
  methods: {
    async handleRegistration(userData: ICustomUser) {
      const dataToSend = {
        ...userData,
        confirm_password: userData.password,
      };

      try {
        const response = await CustomUserService.createUser(dataToSend);
        if (response.status === 201) {
          console.log('Inscription réussie, redirection vers la page d\'authentification...');
          router.push('/userauth');
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          this.errorMessage = error.response?.data.error || "Une erreur s'est produite lors de l'inscription.";
        } else {
          this.errorMessage = "Une erreur inattendue s'est produite.";
        }
      }
    },
    submitForm() {
      (this.$refs.userForm as typeof UserRegisterFormComponentVue).emitRegistrationData();
    }
  },
  data() {
    return {
      errorMessage: "",
      successMessage: ""
    };
  },
});
</script>