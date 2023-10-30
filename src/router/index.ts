import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DiveLog from '@/views/DiveLog.vue';
import UserIdentity from '@/views/UserIdentity.vue';
import NemoCounter from '@/views/NemoCounter.vue';  // Import the NemoCounter component

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
  },
  {
    path: '/nemocounter',
    name: 'NemoCounter',
    component: NemoCounter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;

