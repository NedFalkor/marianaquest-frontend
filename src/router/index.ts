import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DiveLog from '@/views/forms/DiveLog.vue';
import UserIdentity from '@/views/forms/UserIdentity.vue';
import NemoCounter from '@/views/NemoCounter.vue';
import UserRegister from '@/views/gatekeepers/UserRegister.vue';
import UserAuthVue from '@/views/gatekeepers/UserAuth.vue';
import {jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { clearAuthCookies } from '@/services/axiosConfig';
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


const isAuthenticated = async () => {
  const accessToken = localStorage.getItem('jwtToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    return false;
  }

  try {
    const decodedToken = jwtDecode<ICustomJwtPayload>(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp !== undefined && decodedToken.exp > currentTime) {
      return true;
    }

    // Access token has expired, try to refresh it
    const response = await axios.post('/api/auth/token/refresh/', { refresh: refreshToken });

    if (response.data.access) {
      console.log('Old access token before refresh:', localStorage.getItem('jwtToken')); // Ajout pour diagnostic
      localStorage.setItem('jwtToken', response.data.access);
      console.log('New access token after refresh:', response.data.access); // Ajout pour diagnostic
      if (response.data.refresh) {
        console.log('Old refresh token before refresh:', localStorage.getItem('refreshToken')); // Ajout pour diagnostic
        localStorage.setItem('refreshToken', response.data.refresh);
        console.log('New refresh token after refresh:', response.data.refresh); // Ajout pour diagnostic
      }
      return true;
    }
  } 
  catch (error) {
    // Handle the case where refreshing the token fails
    console.error("Error refreshing token:", error);
    clearAuthCookies(); // Clear tokens as the refresh has failed
    return false;
  }
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

  if (meta.requiresAuth && !isAuthenticatedResult) {
    return next({ name: 'UserAuth' });
  }

  // Define userRole here, after isAuthenticatedResult to ensure it's in scope
  const userRole = getUserRole();

  if (meta.requiresRole) {
    // Ensure userRole is defined before using it
    if (!userRole || !meta.requiresRole.includes(userRole)) {
      return next({ name: 'ErrorPage' });
    }
  }

  next();
});


export default router;