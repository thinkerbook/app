import { createRouter, createWebHistory } from "vue-router";
import VideoListView from "@/views/VideoListView.vue";
import VideoItemView from "@/views/VideoItemView.vue";
import BookListView from "@/views/BookListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // native-like behavior when navigating with back/forward buttons
    // see https://router.vuejs.org/guide/advanced/scroll-behavior.html
    if (savedPosition) {
      return savedPosition;
    } else {
      // scroll top if searchQuery changes or changing page
      if (from.query.q !== to.query.q || from.path !== to.path) {
        return { top: 0 };
      }
      // else
      return savedPosition;
    }
  },
  routes: [
    {
      path: "/",
      name: "VideoList",
      component: VideoListView,
      props: (route) => ({ query: route.query.q, pageIndex: route.query.page }),
    },
    {
      path: "/:yid",
      name: "VideoItem",
      component: VideoItemView,
      props: true,
    },
    {
      path: "/books",
      name: "BookList",
      component: BookListView,
      props: true,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/data",
      name: "data",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/DataView.vue"),
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
  ],
});

export default router;
