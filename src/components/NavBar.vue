<script>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useVideoStore } from "@/stores/videos";

export default {
  components: {
    RouterLink,
  },
  setup() {
    const videoStore = useVideoStore();
    const { listVideos, videoCount, isSearching, isShowInfo } = storeToRefs(videoStore);
    const { doSearch, doToggleShowInfo } = videoStore;

    return {
      listVideos,
      videoCount,
      isSearching,
      isShowInfo,
      doSearch,
      doToggleShowInfo,
    };
  },
  data() {
    return {
      searchValue: "",
    };
  },
  watch: {
    isSearching: function (newValue, oldValue) {
      console.log("on:isSearching new: %s, old: %s", newValue, oldValue);
      if (!newValue) {
        this.searchValue = "";
      }
    },
  },
};
// TODO on change videoStore.searchValue, reset to ""
</script>

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

      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <!--
          <li class="nav-item">
            <button v-if="isShowInfo" class="btn btn-outline-success" type="button" @click="doToggleShowInfo">
              <i class="fas fa-toggle-on"></i>
              Info
            </button>
            <button v-else class="btn btn-outline-secondary" type="button" @click="doToggleShowInfo">
              <i class="fas fa-toggle-off"></i>
              Info
            </button>
          </li>
          -->
          <li class="nav-item">
            <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
          </li>
        </ul>

        <div class="navbar-nav ms-auto">
          <form class="d-flex" @submit.prevent>
            <input
              v-model="searchValue"
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-secondary"
              type="submit"
              title="Search"
              @click="doSearch(searchValue)"
            >
              <i class="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>
