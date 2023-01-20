import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import pinia from "./stores/store";
// import { createPinia } from "pinia";
// const pinia = createPinia();

import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 暗黑模式 <html class="dark">
// import 'element-plus/theme-chalk/dark/css-vars.css'


createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  // .use(InstantSearch)
  .mount("#app");
