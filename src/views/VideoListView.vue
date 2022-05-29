<script setup>
import { storeToRefs } from 'pinia'
import { useVideoStore } from "@/stores/videos";
import VideoCardView from "@/views/VideoCardView.vue";

const { listVideos } = storeToRefs(useVideoStore());
</script>

<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xxl-4">
    <div
      v-for="(video, index) in listVideos"
      :key="index"
      class="col"
    >
      <VideoCardView
        :video="video"
        :show-details="true"
        :in-list="true" />
    </div>
  </div>
</template>
