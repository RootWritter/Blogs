import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");

import "bootstrap/dist/js/bootstrap.js";