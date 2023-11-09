<template>
  <header-component class="mb-4"></header-component>
  <div class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
    <div class="w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden"
      style="max-width: 500px">
      <div class="container bg-white p-6 rounded-xl">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginFormComponent',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  watch: {
    username: 'emitData',
    email: 'emitData',
    password: 'emitData'
  },
  methods: {
    emitData() {
      this.$emit('update:loginData', {
        username: this.username,
        email: this.email,
        password: this.password
      });
    }
  }
});
</script>