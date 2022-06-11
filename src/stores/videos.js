import {defineStore} from "pinia";
import ls from "localstorage-slim";

import Videos from "@/assets/thinkerbook-feed.yaml";

const VideoFeedsKey = "video-feeds";
const PAGE_SIZE = 25;

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

function queryVideo(queryOpt) {
  if (!queryOpt) {
    return () => true;
  }

  const query = queryOpt || "";
  return (video) => {
    let accept = false;

    // console.log(`accept video title: ${video.title}, query: ${query}, result: ${video.title.includes(query)}`);
    accept |= [video.title].some(includesIC(query));
    // accept |= [video.pubDate].map(e => e.toString()).some(includesIC(query));
    accept |= [video.releaseDate].filter(e => !!e).map(e => e.getFullYear()).some(includesIC(query));
    accept |= video.guests && video.guests.some(includesIC(query));
    accept |= video.category && video.category.some(includesIC(query));
    // TODO include advices and books in search ?
    // accept |= video.advices && video.advices.map(e => e.title).some(includesIC(query));
    // accept |= video.books && video.books.map(e => e.title).some(includesIC(query));
    // accept |= video.books && video.books.map(e => e.author).some(includesIC(query));

    return accept;
  };
}
export const useVideoStore = defineStore({
  id: "videoStore",
  state: () => ({
    item: null, // { index: 0, videoId: '' }
    page: null, // { index: 0, size: 20, hasPrevious, hasNext }
    query: null,
    videos: Videos,
  }),
  getters: {
    itemRouteLocation: () => (videoId, query) => ({
      name: "VideoItem",
      params: { yid: videoId },
      query: { q: query },
    }),
    listRouteLocation: () => (query, page) => ({
      name: "VideoList",
      query: { q: query, page: page },
    }),
    isItem: (state) => !!state.item,
    isSearching: (state) => !!state.query,
    searchQuery: (state) => state.query,
    itemVideo: (state) =>
      this.isItem
        ? state.videos[0]
        : null,
    allVideos: () => Videos,
    allCount: () => Videos.length,
    listVideos: (state) => state.videos,
    listCount: (state) => state.videos.length,
    searchCount: (state) => Videos.filter(queryVideo(state.query)).length,
    // pageVideos: (state) =>
    //   this.isPage
    //     ? state.videos.slice(state.page.index * (state.page.size || PAGE_SIZE))
    //     : null,
    hasVideo: () => (yid) => Videos.findIndex(v => v.videoId === yid) >= 0,
    countByGuest: () => {
      return (guest) => Videos.filter(v => v.guests && v.guests.some(g => g === guest)).length;
    },
    indexByVideoId() {
      return (videoId) => this.listVideos.findIndex((v) => v.videoId === videoId);
    },
    previousNextAtIndex() {
      return (index, query) => {
        const vids = Videos.filter(queryVideo(query));
        const previous = (index <= 0)
          ? null
          : vids[index - 1];
        const next = (index >= vids.length - 1)
          ? null
          : vids[index + 1];
        return { previous, next };
      };
    },
  },
  actions: {
    setupItem(videoId, query) {
      console.log("setupItem videoId: %s, query: %s", videoId, query);
      this.query = query;
      this.videos = Videos.filter(queryVideo(query));
      const videoIndex = this.indexByVideoId(videoId);
      this.item = { index: videoIndex, videoId };
    },
    setupList(query, page) {
      console.log("setupList query: %s, page: %s", query, page);
      this.query = query;
      const videos = Videos.filter(queryVideo(query));
      this.item = null;
      const index = parseInt(page) || 0;
      const count = Math.floor(videos.length / PAGE_SIZE) + 1;
      this.videos = videos.slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE);
      this.page = {
        index: index,
        size: PAGE_SIZE,
        count: count,
        hasPrevious: index > 0,
        hasNext: index + 1 < count,
      };
    },

    getLocalFeeds() {
      return ls.get(VideoFeedsKey);
    },
    getLocalFeed(videoId) {
      const localFeeds = this.getLocalFeeds() || {};
      return localFeeds[videoId];
    },
    setLocalFeed(videoId, form) {
      const feeds = this.getLocalFeeds() || {};
      feeds[videoId] = Object.assign({}, form);

      ls.set(VideoFeedsKey, feeds);
    },

    // routeSearch(query) {
    //   console.log("routeSearch query: %s", query);
    //
    //   const router = useRouter();
    //   router.push(this.listRouteLocation(query));
    // },
    // routeVideo(videoId, query) {
    //   console.log("routeVideo videoId: %s, query: %s", videoId, query);
    //
    //   const router = useRouter();
    //   router.push(this.itemRouteLocation(videoId, query));
    // },
  },
});
