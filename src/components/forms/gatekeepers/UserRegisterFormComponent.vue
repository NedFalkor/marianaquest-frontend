<template>
  <div class="container bg-white p-6 rounded-xl">
    <form @submit.prevent="emitRegistrationData">
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
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "UserRegisterFormComponent",
  setup(props, { emit }) {
    const user = reactive({
      username: "",
      email: "",
      password: "",
      role: ""
    });

    const emitRegistrationData = () => {
      emit('registration-data', user);
    }

    return {
      user,
      emitRegistrationData
    };
  }
});
</script>

