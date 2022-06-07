<script setup>
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useVideoStore } from "@/stores/videos";
import VideoCardView from "@/views/VideoCardView.vue";

const route = useRoute();
const yid = route.params.yid;
const query = route.query.q;
console.log("itemView yid: %s, query: %s", yid, query);

const { listVideos } = storeToRefs(useVideoStore());
const videoIndex = listVideos.value.findIndex(v => v.videoId === yid);
const video = listVideos.value[videoIndex];

defineProps({
  yid: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <VideoCardView
    :video="video"
    :query="query"
    :show-details="true"
    :show-info="true"
    :click-to-video="true"
  />
</template>
