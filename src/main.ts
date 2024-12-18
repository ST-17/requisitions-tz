import { createApp } from "vue";
import "./style.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

import router from "./router/index.ts";

import App from "./App.vue";

const app = createApp(App);

app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
