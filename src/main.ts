import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';


(window as unknown as { backendUrl: string }).backendUrl = 'http://127.0.0.1:8000';

createApp(App).use(router).mount('#app');