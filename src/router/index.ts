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
    name: '/UserAuth',
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
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return (decodedToken.exp ?? 0) > currentTime;
  } catch (error) {
    return false;
  }
};

export const getUserRole = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    if ('role' in decodedToken) {
      return decodedToken.role;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const role = getUserRole();

  if (to.meta.requiresRole) {
    if (!isAuthenticated()) {
      next({ name: 'UserAuth' });
    } else if (Array.isArray(to.meta.requiresRole) && to.meta.requiresRole.includes(role)) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
  console.log("Navigating to:", to.name, "UserRole:", role);
});

export default router;