<template>
  <header-component class="mb-4"></header-component>
  <div class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
    <div class="w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden"
      style="max-width: 500px">
      <div class="bg-indigo-600 w-full py-5 px-6 text-3xl text-white font-thin text-center">
        Connexion
      </div>

      <div class="container bg-white p-6 rounded-xl">
        <form @submit.prevent="loginUser">
          <div class="mb-4">
            <label for="emailOrUsername" class="block text-sm font-medium mb-2">Adresse e-mail ou nom
              d'utilisateur</label>
            <input class="input w-full p-2 border rounded-md" type="text" id="emailOrUsername" v-model="emailOrUsername"
              required />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium mb-2">Mot de passe</label>
            <input class="input w-full p-2 border rounded-md" type="password" id="password" v-model="password" required />
          </div>

          <button type="submit"
            class="w-full h-16 text-xl font-light bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
            Se connecter
          </button>
        </form>

        <div class="mt-4 text-center">
          <a href="/user-register" class="text-indigo-600 hover:underline">Vous n'avez pas de compte ?</a>
        </div>
      </div>
    </div>
  </div>
  <div v-if="successMessage" class="mt-4 text-center text-green-500">
    {{ successMessage }}
  </div>
  <div v-if="errorMessage" class="mt-4 text-center text-red-500">
    {{ errorMessage }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomUserService from '@/services/CustomUserService';

export default defineComponent({
  data() {
    return {
      emailOrUsername: "",
      password: "",
      errorMessage: "",
      successMessage: ""
    };
  },
  methods: {
    async loginUser() {
      try {
        await CustomUserService.loginUser({ emailOrUsername: this.emailOrUsername, password: this.password });
        this.successMessage = "Connexion réussie ! Vous êtes maintenant connecté.";
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
          this.errorMessage = error.response.data.error;
        } else {
          this.errorMessage = "Une erreur s'est produite lors de la connexion.";
        }
      }
    }
  }
});
</script>

<style></style>
