// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';

// Use a specific type or interface instead of 'any'. If the backendUrl can only be a string, specify that.
const backendUrl: string = process.env.VUE_APP_BACKEND_URL as string;

// If backendUrl could be undefined, check for it and provide a default value.
(window as any).backendUrl = backendUrl;

createApp(App).use(router).mount('#app');
