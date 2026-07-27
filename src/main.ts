import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-sans/latin-700.css';
import './style.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { animePlugin } from './plugins/anime';

// Flip `blur` to true to re-enable the (heavier) blur on reveals.
createApp(App).use(router).use(animePlugin, { blur: false }).mount('#app');
