<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <img class="h-16 w-auto" src="@/assets/MQ_Logo.png" alt="Mariana Quest" />
        </div>
        <div class="flex items-center space-x-4">
          <router-link v-for="item in navigation" :key="item.name" :to="item.href"
            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            {{ item.name }}
          </router-link>
          <div class="relative">
            <input type="search"
              class="bg-gray-700 text-white rounded-full focus:ring-2 focus:ring-primary focus:border-primary block pl-10 pr-3 py-2 leading-5 w-full"
              placeholder="Search">
          </div>
          <div class="relative">
            <button @click="showDropdown = !showDropdown"
              class="bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <img class="h-8 w-8 rounded-full" :src="userPhoto" alt="User Photo" />
            </button>
            <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <div class="banner">
                <div class="banner-content">
                  <h1>Bienvenue {{ username }}</h1>
                  <!-- Lien vers le dashboard approprié -->
                  <router-link :to="dashboardLink" class="dashboard-link">Votre Dashboard</router-link>

                  <!-- Bouton de déconnexion -->
                  <button @click="logout" class="logout-button">Se déconnecter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <user-list></user-list>
</template>


<script lang="ts">
import router, { getUserRole } from '@/router';
import instance from '@/services/axiosConfig';
import Cookies from 'js-cookie';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'HeaderNavbar',
  props: {
    userPhoto: String,
    username: String,
  },
  setup() {
    const navigation = ref([
      { name: 'Formulaire Utilisateur', href: '/useridentity', current: false },
      { name: 'Formulaire Plongée', href: '/divelog', current: false },
      { name: 'NemoCounter', href: '/nemocounter', current: false }
    ]);

    const showDropdown = ref(false);

    const dashboardLink = computed(() => {
      const userRole = getUserRole();
      return userRole === 'INSTRUCTOR' ? '/instructordashboard' : '/diverdashboard';
    });

    const logout = async () => {
      try {
        await instance.post('auth/logout/');
        localStorage.removeItem('jwtToken');
        Cookies.remove('jwtToken'); // If you're using cookies to store the token
        router.push('/userauth'); // Redirect to the login page after logout
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    return {
      navigation,
      showDropdown,
      logout,
      dashboardLink,
    };
  },
});
</script>



<style scoped>
.banner {
  background-color: #f5f5f5;
  padding: 10px;
  text-align: center;
}

.banner-content h1 {
  margin: 0;
  padding: 0;
}

.dashboard-link,
.logout-button {
  margin: 5px;
  padding: 5px 10px;
  background-color: blue;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
}

.logout-button {
  background-color: red;
}

.dashboard-link:hover,
.logout-button:hover {
  opacity: 0.8;
}
</style>