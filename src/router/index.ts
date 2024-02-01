import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DiveLog from '@/views/forms/DiveLog.vue';
import UserIdentity from '@/views/forms/UserIdentity.vue';
import NemoCounter from '@/views/NemoCounter.vue';
import UserRegister from '@/views/gatekeepers/UserRegister.vue';
import UserAuthVue from '@/views/gatekeepers/UserAuth.vue';
import { jwtDecode  } from "jwt-decode";
import { ICustomJwtPayload } from '@/interfaces/CustomJWTPayload';

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
    name: 'DiveDashboard',
    component: () => import('@/views/dashboards/DiverDashboard.vue'),
    meta: { requiresRole: ['DIVER'] }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Guard global pour vérifier l'authentification et les rôles
router.beforeEach((to, from, next) => {
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return false;
    }
    try {
      const decodedToken = jwtDecode<ICustomJwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return !!decodedToken.exp && decodedToken.exp > currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const getUserRole = (): string | null => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode<ICustomJwtPayload>(token);
      return decodedToken.role ?? null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  if (to.meta.requiresRole) {
    if (!isAuthenticated()) {
      next({ name: 'UserAuth' });
    } else {
      const role = getUserRole();  // Now using the getUserRole function
      if (role && Array.isArray(to.meta.requiresRole) && to.meta.requiresRole.includes(role)) {
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

