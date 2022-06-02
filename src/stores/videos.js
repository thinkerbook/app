import { defineStore } from "pinia";

import Videos from "@/assets/thinkerbook-feed.yaml";

export const useVideoStore = defineStore({
  id: "videoStore",
  state: () => ({
    query: "",
    videos: Videos,
  }),
  getters: {
    isSearching: (state) => state.query !== "",
    // allVideo: () => Videos,
    videoCount: () => Videos.length,
    listVideos: (state) => state.videos,
    hasVideo: () => {
      return (yid) => Videos.findIndex(v => v.videoId === yid) >= 0;
    },
    countByGuest: () => {
      return (guest) => Videos.filter(v => v.guests && v.guests.some(g => g === guest)).length;
    },
  },
  actions: {
    doResetSearch() {
      console.log("doResetSearch");

      this.videos = Videos;
      this.query = "";
    },
    doSearch(query) {
      console.log("doSearch: %s", query);
      this.query = query;

      this.videos = Videos.filter((v) => {
        let accept = false;

        function includesIC(searched) {
          const toSearch = searched
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "");

          return (value) =>
            (value || "")
              .toString()
              .toLowerCase()
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .includes(toSearch);
        }

        // console.log(`accept video title: ${v.title}, query: ${query}, result: ${v.title.includes(query)}`);
        accept |= [v.title].some(includesIC(query));
        // accept |= [v.pubDate].map(e => e.toString()).some(includesIC(query));
        accept |= [v.releaseDate].filter(e => !!e).map(e => e.getFullYear()).some(includesIC(query));
        accept |= v.guests && v.guests.some(includesIC(query));
        accept |= v.category && v.category.some(includesIC(query));
        // TODO include advices and books in search ?
        // accept |= v.advices && v.advices.map(e => e.title).some(includesIC(query));
        // accept |= v.books && v.books.map(e => e.title).some(includesIC(query));
        // accept |= v.books && v.books.map(e => e.author).some(includesIC(query));

        return accept;
      });
    },
  },
});
