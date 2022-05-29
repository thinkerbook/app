<script setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from 'pinia';
import { useVideoStore } from "@/stores/videos";

const videoStore = useVideoStore();
const { listVideos, videoCount, isSearching } = storeToRefs(videoStore);
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink :to="{ name: 'home' }" class="navbar-brand">
        <i class="far fa-book"></i>
        ThinkerBook
        <span v-if="isSearching">({{ listVideos.length }} / {{ videoCount }})</span>
        <span v-else>({{ videoCount }})</span>
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
        </ul>

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
            @click="search"
          >
            <i class="fas fa-search"></i>
          </button>
        </form>

        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    search() {
      console.log("search: ", this.searchValue);
      this.videoStore.doSearch(this.searchValue);
    },
  },
};
</script>

<style scoped>
</style>
