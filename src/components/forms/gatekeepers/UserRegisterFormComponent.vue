<template>
  <div class="container bg-white p-6 rounded-xl">
    <form @submit.prevent="registerUser">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium mb-2">Nom d'utilisateur</label>
        <input class="input w-full p-2 border rounded-md" type="text" id="username" v-model="user.username" required />
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
      <button type="submit" class="btn-primary">S'inscrire</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance } from "vue";

export default defineComponent({
  name: "UserRegisterFormComponent",
  setup() {
    const user = reactive({
      username: "",
      email: "",
      password: "",
      role: ""
    });
    const successMessage = ref("");
    const errorMessage = ref("");

    const instance = getCurrentInstance();

    const registerUser = async () => {
      if (!user.email && !user.username) {
        errorMessage.value = "Veuillez fournir un e-mail ou un nom d'utilisateur.";
        return;
      }

      try {
        const response = await fetch("/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.ok) {
          instance?.emit('registration-successful', data.user);
        } else {
          errorMessage.value = data.error || "Erreur lors de l'inscription.";
        }
      } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur:", error);
        errorMessage.value = "Une erreur s'est produite lors de la connexion.";
      }
    };

    return {
      user,
      successMessage,
      errorMessage,
      registerUser,
    };
  },
});
</script>
