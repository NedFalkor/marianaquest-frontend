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
          <!-- Ajout du champ pour le nom d'utilisateur -->
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium mb-2">Nom d'utilisateur</label>
            <input class="input w-full p-2 border rounded-md" type="text" id="username" v-model="username" required />
          </div>

          <!-- Champ existant pour l'e-mail -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium mb-2">Adresse e-mail</label>
            <input class="input w-full p-2 border rounded-md" type="email" id="email" v-model="email" required />
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
import { AxiosError } from 'axios';

export default defineComponent({
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