<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-2">
      <div class="flex items-center justify-between h-13">
        <div class="flex items-center">
          <img class="h-20 w-auto rounded-full" src="@/assets/MQ_Logo.png" alt="Mariana Quest"/>
        </div>

        <div class="flex items-center space-x-4">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']">
            {{ item.name }}
          </router-link>
          <div class="mb-3">
            <div class="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                type="search"
                class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon3" />
              <button
                class="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                type="button"
                id="button-addon3"
                data-te-ripple-init>
                Search
              </button>
            </div>
          </div>

          <div class="relative">
            <button @click="showDropdown = !showDropdown" class="rounded-full bg-gray-800 text-sm focus:outline-none">
              <img class="h-8 w-8 rounded-full" :src="userPhoto" alt="User Photo" />
            </button>
            <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Votre profil</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Paramètres</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Se déconnecter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, PropType } from 'vue';

export default {
  name: 'HeaderNavbar',
  props: {
    userPhoto: String as PropType<string>,
  },
  setup() {
    const navigation = ref([
      { name: 'Formulaire Utilisateur', href: '/useridentity', current: false },
      { name: 'Formulaire Plongée', href: '/divelog', current: false },
      { name: 'NemoCounter', href: '/nemocounter', current: false }
    ]);

    const showDropdown = ref(false);

    return {
      navigation,
      showDropdown,
    };
  },
};
</script>