<template>
  <header-component class="mb-4"></header-component>
  <div class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
    <div class="w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden"
      style="max-width: 500px">
      <div class="bg-indigo-600 w-full py-5 px-6 text-3xl text-white font-thin text-center">
        Authentification
      </div>
      <user-subscription-form-component></user-subscription-form-component>
      <button type="submit"
        class="w-full h-16 text-xl font-light bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
        Se connecter
      </button>
      <div class="mt-4 text-center">
        <a href="/user-register" class="text-indigo-600 hover:underline">Vous n'avez pas de compte ?</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomUserService from '@/services/CustomUserService';
import { AxiosError } from 'axios';
import UserSubscriptionFormComponent from '@/components/forms/gatekeepers/UserSubscriptionFormComponent.vue';

export default defineComponent({
  components: { UserSubscriptionFormComponent },
  data() {
    return {
      email: "",
      username: "",
      password: "",
      errorMessage: "",
      successMessage: ""
    };
  },
  methods: {
    async loginUser() {
      try {
        const loginData = {
          email: this.email,
          username: this.username,
          password: this.password
        };

        await CustomUserService.loginUser(loginData);
        this.successMessage = "Connexion réussie ! Vous êtes maintenant connecté. ;)";
        this.errorMessage = "";
      } catch (error) {
        this.handleLoginError(error);
      }
    },

    handleLoginError(error: unknown) {
      if (error instanceof AxiosError) {
        this.errorMessage = error.response?.data.error || error.response?.data.message || "Une erreur s'est produite lors de la connexion.";
      } else if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = "Une erreur inattendue s'est produite.";
      }
      this.successMessage = "";
    }
  }
});
</script>