import { createRouter, createWebHashHistory } from "vue-router";
import Navigate from "@/views/Navigate.vue";

import { useSiteStore } from "@/stores/siteInfo";
import { storeToRefs } from "pinia";
// 否则报错未安装pinia
import pinia from "@/stores/store";
const siteStore = useSiteStore(pinia);
// const siteStore = useSiteStore()

const { category, categories } = storeToRefs(siteStore);

let routes = [
  {
    path: "/",
    redirect: { name: "index" },
  },
  {
    name: "index",
    path: "/index",
    component: Navigate,
  },
];
// 分类自动添加路由
categories.value.forEach((element) => {
  routes.push({
    name: element,
    path: `/${encodeURI(element)}`,
    component: Navigate,
  });
});
// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全局前置守卫, 初始化时, 和切换之前调用,
router.beforeEach((to, from, next) => {
  category.value = to.name;
  // 放行
  next();
});

export default router;
