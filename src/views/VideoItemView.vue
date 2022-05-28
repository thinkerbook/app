<script setup>
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { VideoStore } from "@/stores/videos";
import VideoCardView from "@/views/VideoCardView.vue";

const route = useRoute();
const yid = route.params.yid;

const { allVideos } = storeToRefs(VideoStore());
const videoIndex = allVideos.value.findIndex(v => v.videoId === yid);
const video = allVideos.value[videoIndex];

defineProps({
  yid: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <VideoCardView :video="video" :show-details="true" />
</template>
