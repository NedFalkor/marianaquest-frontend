import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DiveLog from '@/views/forms/DiveLog.vue';
import UserIdentity from '@/views/forms/UserIdentity.vue';
import NemoCounter from '@/views/NemoCounter.vue';
import UserRegister from '@/views/gatekeepers/UserRegister.vue';
import UserAuthVue from '@/views/gatekeepers/UserAuth.vue';

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

const isAuthenticated = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    return false;
  }
  try {
    const decodedToken: { exp?: number } = jwtDecode(token); // Add an explicit type for decodedToken
    const currentTime = new Date().getTime() / 1000;
    // Check if exp is defined and compare
    if (decodedToken.exp !== undefined && decodedToken.exp > currentTime) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
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
  // Supposons que vous ayez une fonction qui vérifie si l'utilisateur est authentifié
  const isAuthenticated = () => {
    // Vérifier si le token JWT est stocké et valide
    return localStorage.getItem('jwtToken') ? true : false;
  };

  // Supposons que vous ayez une fonction qui obtient le rôle de l'utilisateur
  const userRole = () => {
    // Obtenir le rôle de l'utilisateur à partir du store ou d'une API
    return 'FORMATEUR'; // ou 'PLONGEUR', selon l'utilisateur
  };

  if (to.meta.requiresRole) {
    const role = userRole();
    if (!isAuthenticated()) {
      next({ name: 'UserAuth' }); // Assurez-vous que le nom de la route est correct.
    } else {
      // Assurez-vous que `requiresRole` est un tableau avant d'utiliser `includes`.
      if (Array.isArray(to.meta.requiresRole) && to.meta.requiresRole.includes(role)) {
        next();
      } else {
        next(false);
      }
    }
  } else {
    next();
  }
});

export default router;
