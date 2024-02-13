// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';

const backendUrl: string = process.env.VUE_APP_BACKEND_URL as string;

(window as any).backendUrl = backendUrl;

createApp(App).use(router).mount('#app');
