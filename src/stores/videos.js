import { defineStore } from "pinia";

import Videos from "@/assets/thinkerbook-feed.yaml";

export const useVideoStore = defineStore({
  id: "videos",
  state: () => ({
    searchValue: "",
    videos: Videos,
  }),
  getters: {
    isSearching: (state) => state.searchValue !== "",
    videoCount: () => Videos.length,
    listVideos: (state) => state.videos,
  },
  actions: {
    doSearch(searchValue) {
      console.log("doSearch: ", searchValue);
      this.searchValue = searchValue;
      // title, guest, tags, date, book, advice
      // highlight results
    },
  },
});
