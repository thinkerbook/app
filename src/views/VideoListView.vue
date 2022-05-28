<script setup>
import { storeToRefs } from 'pinia'
import { VideoStore } from "@/stores/videos";
import VideoCardView from "@/views/VideoCardView.vue";

const { allVideos } = storeToRefs(VideoStore());
</script>

<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xxl-4">
    <!-- TODO optimize loading with .slice(0, 20) ? -->
    <div
      v-for="(video, index) in allVideos"
      :key="index"
      class="col"
    >
      <VideoCardView :video="video" :show-details="false" :in-list="true"></VideoCardView>
    </div>
  </div>
</template>
