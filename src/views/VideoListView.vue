<script setup>
import { storeToRefs } from 'pinia'
import { VideoStore } from "@/stores/videos";
import VideoCardView from "@/views/VideoCardView.vue";

const { allVideos } = storeToRefs(VideoStore());
</script>

<template>
  <div class="card-group">
    <VideoCardView
      v-for="(video, index) in allVideos"
      :key="index"
      :video="video"
    ></VideoCardView>
  </div>
</template>
