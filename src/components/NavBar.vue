<script setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from 'pinia'
import { VideoStore } from "@/stores/videos";

const { allVideos } = storeToRefs(VideoStore());

defineProps({
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink :to="{ name: 'home' }" class="navbar-brand">
        <i class="far fa-book"></i>
        ThinkerBook ({{ allVideos.length }})
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
        </ul>

        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>
