<template>
  <header-component class="mb-4"></header-component>
  <div class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
    <div class="w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden"
      style="max-width: 500px">
      <div class="bg-indigo-600 w-full py-5 px-6 text-3xl text-white font-thin text-center">
        Inscription
      </div>
      <user-register-form-component @registration-successful="handleRegistrationSuccess"></user-register-form-component>
      <button type="submit"
        class="w-full h-16 text-xl font-light bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
        Créer un compte
      </button>
      <div class="mt-4 text-center">
        <a href="/user-auth" class="text-indigo-600 hover:underline">Vous possédez déjà un compte ?</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/interfaces/ErrorResponse';
import UserRegisterFormComponentVue from '@/components/forms/gatekeepers/UserRegisterFormComponent.vue';
import router from '@/router';

export default defineComponent({
  components: {
    "user-register-form-component": UserRegisterFormComponentVue
  },
  methods: {
    handleRegistrationSuccess(userData: any) {
      // Réinitialiser les messages
      this.errorMessage = "Inscription échouée :( !";
      this.successMessage = "Inscription réussie :) !";

      // Rediriger vers le tableau de bord approprié en fonction du rôle de l'utilisateur
      const dashboardRoute = userData.role === 'FORMATEUR' ? '/instructordashboard' : '/diverdashboard';
      router.push(dashboardRoute);
    },
    handleRegistrationError(error: unknown) {
      // Gestion des erreurs
      if (error && this.isAxiosError(error)) {
        const { data } = error.response || {};
        if (data && typeof data === 'object') {
          const errorData = data as ErrorResponse;
          this.errorMessage = errorData.error || errorData.message || "Une erreur s'est produite lors de l'inscription.";
        } else {
          this.errorMessage = "Une erreur s'est produite et aucune information supplémentaire n'est disponible.";
        }
      } else if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = "Une erreur inattendue s'est produite.";
      }
      this.successMessage = "";
    },
    isAxiosError(error: unknown): error is AxiosError {
      return (error as AxiosError).isAxiosError === true;
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
