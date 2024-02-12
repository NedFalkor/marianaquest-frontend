import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DiveLog from '@/views/forms/DiveLog.vue';
import UserIdentity from '@/views/forms/UserIdentity.vue';
import NemoCounter from '@/views/NemoCounter.vue';
import UserRegister from '@/views/gatekeepers/UserRegister.vue';
import UserAuthVue from '@/views/gatekeepers/UserAuth.vue';
import {jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { RouteMeta } from '@/interfaces/JWT Tokens/RouteMeta';
import { ICustomJwtPayload } from '@/interfaces/JWT Tokens/CustomJWTPayload';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/userregister'
  },
  {
    path: '/divelog',
    name: 'DiveLog',
    component: DiveLog,
    meta: { requiresAuth: true }
  },
  {
    path: '/useridentity',
    name: 'UserIdentity',
    component: UserIdentity,
    meta: { requiresAuth: true }
  },
  {
    path: '/nemocounter',
    name: 'NemoCounter',
    component: NemoCounter,
    meta: { requiresAuth: true }
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
    path: '/instructordashboard/:instructorId',
    name: 'InstructorDashboard',
    component: () => import('@/views/dashboards/InstructorDashboard.vue'),
    meta: { requiresAuth: true, requiresRole: ['INSTRUCTOR'] } as Record<string, any>
  },
  {
    path: '/diverdashboard',
    name: 'DiverDashboard',
    component: () => import('@/views/dashboards/DiverDashboard.vue'),
    meta: { requiresAuth: true, requiresRole: ['DIVER'] } as Record<string, any> 
  }
];

const clearAuthStorage = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('refreshToken');
};

const isAuthenticated = async () => {
  const accessToken = localStorage.getItem('jwtToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    clearAuthStorage();
    return false;
  }

  try {
    const decodedToken = jwtDecode<ICustomJwtPayload>(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp > currentTime) {
      return true;
    }

    // Access token has expired, try to refresh it
    const response = await axios.post('/api/auth/token/refresh/', { refresh: refreshToken });

    if (response.data.access) {
      localStorage.setItem('jwtToken', response.data.access);
      if (response.data.refresh) {
        localStorage.setItem('refreshToken', response.data.refresh);
      }
      return true;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    clearAuthStorage();
    return false;
  }

  clearAuthStorage();
  return false;
};


export const getUserRole = (): string | null => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;

  try {
    // Use the jwt-decode library to decode the token and specify the expected payload type
    const decodedToken = jwtDecode<ICustomJwtPayload>(token);

    // Now you can access the custom claims directly with type safety
    return decodedToken.role ?? null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};


const router = createRouter({
  history: createWebHashHistory(),
  routes
});


router.beforeEach(async (to, from, next) => {
  const meta = to.meta as RouteMeta;
  const isAuthenticatedResult = await isAuthenticated();
  const userRole = getUserRole();

  if (meta.requiresAuth && !isAuthenticatedResult) {
    return next({ name: 'UserAuth' });
  }

  if (meta.requiresRole) {
    if (!userRole || !meta.requiresRole.includes(userRole)) {
      // Redirect to the error page if the user does not have the required role
      return next({ name: 'ErrorPage' });
    }
  }

  // Proceed to the route if the user is authenticated and has the required role (or no specific role is required)
  next();
});




export default router;