import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import App from './App.vue'
import router from './router';

const app = createApp(App).use(createPinia());
app.use(router)
app.mount("#app");