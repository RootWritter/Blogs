import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ToastPlugin from "vue-toast-notification";
import VueSweetalert2 from "vue-sweetalert2";

const app = createApp(App);
app.use(router);
app.use(VueSweetalert2);
app.use(ToastPlugin);

app.mount("#app");
import "bootstrap/dist/js/bootstrap.js";
