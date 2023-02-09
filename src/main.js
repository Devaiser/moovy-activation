import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VueReCaptcha } from 'vue-recaptcha-v3';

import './assets/index.css';

const app = createApp(App);

app.use(router);
app.use(VueReCaptcha, {
  siteKey: '6LemC2AkAAAAAOUjEGlwqTxRRXswi4KYEFyYlS5G',
});

app.mount('#app');
