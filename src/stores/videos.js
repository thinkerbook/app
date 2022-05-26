import { defineStore } from "pinia";

import Videos from "@/assets/thinkerbook-feed.yaml";

export const VideoStore = defineStore({
  id: "videos",
  state: () => ({
    videos: Videos,
  }),
  getters: {
    allVideos: (state) => state.videos
        // .filter((v,i) => i < 20)
    ,
  },
  actions: {},
});
