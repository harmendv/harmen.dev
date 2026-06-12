import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-sans/latin-700.css';
import './style.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
