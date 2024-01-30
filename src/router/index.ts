import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DiveLog from '@/views/forms/DiveLog.vue';
import UserIdentity from '@/views/forms/UserIdentity.vue';
import NemoCounter from '@/views/NemoCounter.vue';
import UserRegister from '@/views/gatekeepers/UserRegister.vue';
import UserAuthVue from '@/views/gatekeepers/UserAuth.vue';
import { jwtDecode } from 'jwt-decode';

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
  const role = getUserRole();

  const requiresRole = to.meta.requiresRole as string[] | undefined;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated()) {
    return next({ name: 'UserAuth' });
  }

  if (requiresRole && role && !requiresRole.includes(role)) { // Make sure role is not null before calling includes
    return next({ name: 'UserAuth' });
  }

  next();
});

export default router;