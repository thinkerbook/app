import { defineStore } from "pinia";

import Videos from "@/assets/thinkerbook.yaml";
console.log(`Videos: `, Videos);

export const VideoStore = defineStore({
  id: "videos",
  state: () => ({
    videos: Videos,
  }),
  getters: {
    allVideos: (state) => state.videos,
  },
  actions: {},
});
