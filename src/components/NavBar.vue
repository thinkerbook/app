<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink :to="{ name: 'VideoList' }" class="navbar-brand">
        <i class="far fa-book"></i>
        ThinkerBook
        <span v-if="isSearching">({{ listVideos.length }}/{{ videoCount }})</span>
        <span v-else>({{ videoCount }})</span>
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarSupportedContent" ref="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
          </li>
        </ul>

        <div class="navbar-nav ms-auto">
          <form class="d-flex" @submit.prevent>
            <input
              v-model="query"
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-secondary"
              type="submit"
              title="Search"
              @click="search(query)"
            >
              <i class="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { Collapse } from "bootstrap";
import { useVideoStore } from "@/stores/videos";

export default {
  components: {
    RouterLink,
  },
  setup() {
    const videoStore = useVideoStore();
    const { listVideos, videoCount, isSearching } = storeToRefs(videoStore);
    const { doSearch } = videoStore;

    return {
      listVideos,
      videoCount,
      isSearching,
      doSearch,
    };
  },
  data() {
    return {
      navbarCollapse: null,
      query: "",
    };
  },
  watch: {
    "$route.query.q": function (newValue, oldValue) {
      console.log("on:$route.query.q new: %s, old: %s", newValue, oldValue);

      this.query = newValue || "";
      if (newValue) {
        console.log("navbarShow: %s", newValue);
        this.navbarCollapse.show();
      }
    },
    isSearching: function (newValue, oldValue) {
      console.log("on:isSearching new: %s, old: %s", newValue, oldValue);
      if (!newValue) {
        this.query = "";
      }
    },
  },
  mounted() {
    const navbarCollapseEl = this.$refs.navbarCollapse;
    this.navbarCollapse = new Collapse(navbarCollapseEl, { toggle: false });
  },
  methods: {
    search(query) {
      console.log("search query: %s", query);

      this.$router.push({ name: "VideoList", query: { q: query } });
    },
  },
};
</script>

<style scoped>
</style>
