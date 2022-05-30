import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import Vue3TouchEvents from "vue3-touch-events";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
// see https://stackoverflow.com/questions/70681667/cant-use-vue-router-and-pinia-inside-asingle-a-store
pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
app.use(router);
app.use(Vue3TouchEvents);

app.mount("#app");
