import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import NotFound from "../pages/NotFound.vue";
import RequestsList from "../pages/RequestsList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: Login },
    { path: "/", component: RequestsList },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;