<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <div>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        </div>

        <!-- Navigation Links and User Dropdown -->
        <div class="flex items-center space-x-4">
          <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']">
            {{ item.name }}
          </a>
          <!-- User Dropdown -->
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
      { name: 'Home', href: '/', current: true },
      { name: 'About', href: '/about', current: false },
    ]);
    const showDropdown = ref(false);
    return {
      navigation,
      showDropdown
    };
  }
}

  </script>