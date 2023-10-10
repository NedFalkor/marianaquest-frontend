import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DiveLog from '@/views/DiveLog.vue';
import UserIdentity from '@/views/UserIdentity.vue'; // Import the UserIdentity component

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/useridentity'
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
