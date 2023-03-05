import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import { pinia } from "./store/pinia";

import "./styles/raindrop.css";
import "./styles/global.css";
import "./styles/forms.css";

const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
