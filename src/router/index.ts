import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DiveLog from '@/views/forms/DiveLog.vue';
import UserIdentity from '@/views/forms/UserIdentity.vue';
import NemoCounter from '@/views/NemoCounter.vue';
import UserRegister from '@/views/gatekeepers/UserRegister.vue';
import UserAuthVue from '@/views/gatekeepers/UserAuth.vue';
import {jwtDecode } from 'jwt-decode';
import axios from 'axios';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/userregister'
  },
  {
    path: '/divelog',
    name: 'DiveLog',
    component: DiveLog
  },
  {
    path: '/useridentity',
    name: 'UserIdentity',
    component: UserIdentity
  },
  {
    path: '/nemocounter',
    name: 'NemoCounter',
    component: NemoCounter
  },
  {
    path: '/userregister',
    name: 'UserRegister',
    component: UserRegister
  },
  {
    path: '/userauth',
    name: 'UserAuth',
    component: UserAuthVue
  },
  {
    path: '/instructordashboard',
    name: 'InstructorDashboard',
    component: () => import('@/views/dashboards/InstructorDashboard.vue'),
    meta: { requiresRole: ['INSTRUCTOR'] }
  },
  {
    path: '/diverdashboard',
    name: 'DiverDashboard',
    component: () => import('@/views/dashboards/DiverDashboard.vue'),
   meta: { requiresRole: ['DIVER'] }
  }
];

const isAuthenticated = async () => {
  const accessToken = localStorage.getItem('jwtToken');
  const refreshToken = localStorage.getItem('refreshToken'); // Assuming you also store the refresh token

  if (!accessToken || !refreshToken) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp !== undefined && decodedToken.exp > currentTime) {
      return true;
    } else {
      // Access token has expired, try to refresh it
      const response = await axios.post('/api/auth/token/refresh/', { refresh: refreshToken });

      if (response.data.access) {
        // If the refresh was successful, update the tokens in local storage
        localStorage.setItem('jwtToken', response.data.access);
        // Optional: Update the refresh token if a new one is returned
        if (response.data.refresh) {
          localStorage.setItem('refreshToken', response.data.refresh);
        }
        return true;
      }
    }
  } catch (error) {
    console.error("Error with token authentication:", error);
  }
  return false;
};


export const getUserRole = (): string | null => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;

  try {
    const decodedToken: { role?: string } = jwtDecode(token); // Specify the expected properties and types within the decoded token
    return decodedToken.role ?? null; // Use the nullish coalescing operator to return null if role is undefined
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresRole) {
    const role = getUserRole(); // Assurez-vous que cette fonction renvoie le rôle correctement
    if (!isAuthenticated()) {
      next({ name: 'UserAuth' });
    } else {
      if (Array.isArray(to.meta.requiresRole) && to.meta.requiresRole.includes(role)) {
        next();
      } else {
        next(false); // ou rediriger vers une page d'erreur ou d'accueil
      }
    }
  } else {
    next();
  }
});

export default router;