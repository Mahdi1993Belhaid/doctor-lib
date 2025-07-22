import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import i18n from './i18n/i18n';
import router from './router';
import { createPinia } from 'pinia'
const app = createApp(App);
const pinia = createPinia()
app.use(i18n);
app.use(pinia);
app.use(router);
app.mount('#app')
