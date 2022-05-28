import { createRouter, createWebHistory } from "vue-router";
import VideoListView from "../views/VideoListView.vue";
import VideoItemView from "../views/VideoItemView.vue";
import VideoEditView from "../views/VideoEditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: VideoListView,
    },
    {
      path: "/:yid",
      name: "item",
      component: VideoItemView,
      props: true,
    },
    {
      path: "/:yid/edit",
      name: "edit",
      component: VideoEditView,
      props: true,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
