import { createRouter, createWebHistory } from "vue-router";
import VideoListView from "@/views/VideoListView.vue";
import VideoItemView from "@/views/VideoItemView.vue";
import VideoEditView from "@/views/VideoEditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // native-like behavior when navigating with back/forward buttons
    // see https://router.vuejs.org/guide/advanced/scroll-behavior.html
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "VideoList",
      component: VideoListView,
    },
    {
      path: "/:yid",
      name: "VideoItem",
      component: VideoItemView,
      props: true,
    },
    {
      path: "/:yid/edit",
      name: "VideoEdit",
      component: VideoEditView,
      props: true,
    },
    {
      path: "/watch",
      redirect: (to) => {
        if (to.query.v) {
          return { name: "VideoItem", params: { yid: to.query.v }, query: {} };
        }
        return { name: "VideoList" };
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
  ],
});

export default router;
