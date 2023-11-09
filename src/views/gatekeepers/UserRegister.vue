<template>
  <header-component class="mb-4"></header-component>
  <div class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
    <div class="w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden"
      style="max-width: 500px">
      <div class="bg-indigo-600 w-full py-5 px-6 text-3xl text-white font-thin text-center">
        Inscription
      </div>
      <div class="container bg-white p-6 rounded-xl">
        <form @submit.prevent="registerUser">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium mb-2">Nom d'utilisateur</label>
            <input class="input w-full p-2 border rounded-md" type="text" id="username" v-model="user.username"
              required />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium mb-2">Adresse e-mail</label>
            <input class="input w-full p-2 border rounded-md" type="email" id="email" v-model="user.email" required />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium mb-2">Mot de passe</label>
            <input class="input w-full p-2 border rounded-md" type="password" id="password" v-model="user.password"
              required />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-sm font-medium mb-2">Rôle</label>
            <select id="role" v-model="user.role" class="input w-full p-2 border rounded-md" required>
              <option value="">Sélectionnez un rôle</option>
              <option value="PLONGEUR">Plongeur</option>
              <option value="FORMATEUR">Formateur</option>
            </select>
          </div>
          <button type="submit"
            class="w-full h-16 text-xl font-light bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
            Accepter
          </button>
        </form>
        <div class="mt-4 text-center">
          <a href="/user-auth" class="text-indigo-600 hover:underline">Vous possédez déjà un compte ?</a>
        </div>
      </div>
    </div>
    <div v-if="successMessage" class="mt-4 text-center text-green-500">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mt-4 text-center text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { ErrorResponse } from '@/interfaces/ErrorResponse';
import CustomUserService from '@/services/CustomUserService';
import { defineComponent } from 'vue';
import { AxiosError } from 'axios';
import { ICustomUser } from '@/interfaces/CustomUser';

export default defineComponent({
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
      errorMessage: "",
      successMessage: ""
    };
  },
  methods: {
    async registerUser() {
      try {
        const userData: ICustomUser = {
          email: this.user.email,
          username: this.user.username,
          password: this.user.password,
          role: this.user.role,
        };
        await CustomUserService.createUser(userData);
        this.successMessage = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
        this.errorMessage = ""; // Clear any previous error message
      } catch (error) {
        this.handleRegistrationError(error);
      }
    },


    handleRegistrationError(error: unknown) {
      if (this.isAxiosError(error)) {
        const { data } = error.response || {};

        // Assert the type of `data` to `ErrorResponse`
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
  }
});
</script>
