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
  },
  actions: {
    doToggleShowInfo() {
      console.log("doToggleShowInfo");
      this.showInfo = !this.showInfo;
    },
    doResetSearch() {
      console.log("doResetSearch");
      this.searchValue = "";
      this.videos = Videos
    },
    doSearch(searchValue) {
      console.log("doSearch: ", searchValue);
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
        accept |= [v.pubDate].some(includesIC(searchValue));
        accept |= [v.releaseDate].some(includesIC(searchValue));
        accept |= v.guests && v.guests.some(includesIC(searchValue));
        accept |= v.guests && v.guests.some(includesIC(searchValue));
        accept |= v.category && v.category.some(includesIC(searchValue));
        accept |= v.advices && v.advices.map(e => e.title).some(includesIC(searchValue));
        accept |= v.books && v.books.map(e => e.title).some(includesIC(searchValue));
        accept |= v.books && v.books.map(e => e.author).some(includesIC(searchValue));

        // TODO how highlight results ?

        return accept;
      });

      this.$router.push({ name: "VideoList" });
    },
  },
});
