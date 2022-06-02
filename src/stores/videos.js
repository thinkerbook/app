import { defineStore } from "pinia";

import Videos from "@/assets/thinkerbook-feed.yaml";

export const useVideoStore = defineStore({
  id: "videoStore",
  state: () => ({
    searchValue: "",
    videos: Videos,
    showInfo: false,
  }),
  getters: {
    isSearching: (state) => state.searchValue !== "",
    isShowInfo: (state) => state.showInfo,
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
    doToggleShowInfo() {
      console.log("doToggleShowInfo");
      this.showInfo = !this.showInfo;
    },
    doResetSearch() {
      console.log("doResetSearch");

      this.videos = Videos;
      this.searchValue = "";
    },
    doSearch(searchValue) {
      console.log("doSearch: %s", searchValue);
      this.searchValue = searchValue;

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

        // console.log(`accept video title: ${v.title}, searchValue: ${searchValue}, result: ${v.title.includes(searchValue)}`);
        accept |= [v.title].some(includesIC(searchValue));
        // accept |= [v.pubDate].map(e => e.toString()).some(includesIC(searchValue));
        accept |= [v.releaseDate].filter(e => !!e).map(e => e.getFullYear()).some(includesIC(searchValue));
        accept |= v.guests && v.guests.some(includesIC(searchValue));
        accept |= v.category && v.category.some(includesIC(searchValue));
        // TODO include advices and books in search ?
        // accept |= v.advices && v.advices.map(e => e.title).some(includesIC(searchValue));
        // accept |= v.books && v.books.map(e => e.title).some(includesIC(searchValue));
        // accept |= v.books && v.books.map(e => e.author).some(includesIC(searchValue));

        // TODO how highlight results ?

        return accept;
      });

      this.$router.push({ name: "VideoList" });
    },
  },
});
