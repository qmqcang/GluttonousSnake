import { createApp } from "vue";
import App from "./App.vue";
import router from './router/index';
import { createPinia } from 'pinia'

import dialog from "./utils/dialog";

import "@/assets/css/style.css";
import "@/assets/css/media.less";
import "animate.css";

const store = createPinia()

createApp(App).use(store).use(router).use(dialog).mount("#app");
