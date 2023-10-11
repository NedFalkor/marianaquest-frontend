<template>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 py-2">
          <div class="flex items-center justify-between h-13">
            <div class="flex items-center">
              <img class="h-20 w-auto rounded-full" src="@/assets/MQ_Logo.png" alt="Mariana Quest"/> <!-- Ajustez la hauteur à h-20 ou selon vos préférences -->
            </div>

        <div class="flex items-center space-x-4">
  <router-link
      v-for="item in navigation"
      :key="item.name"
      :to="item.href"
      :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']">
      {{ item.name }}
  </router-link>
          <div class="relative">
            <button @click="showDropdown = !showDropdown" class="rounded-full bg-gray-800 text-sm focus:outline-none">
              <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </button>
            <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

  <script lang="ts">
  import { ref } from 'vue';
  
  export default {
  name: 'HeaderNavbar',
  setup() {
      const navigation = ref([
        { name: 'Formulaire Utilisateur', href: '/useridentity', current: false },
        { name: 'Formulaire Plongée', href: '/divelog', current: false },
        { name: 'NemoCounter', href: '/nemocounter', current: false } // Assuming the route path for NemoCounter is '/nemocounter'
      ]);
    const showDropdown = ref(false);
    return {
      navigation,
      showDropdown
    };
  }
}

  </script>