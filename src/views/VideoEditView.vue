<script setup>
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useVideoStore } from "@/stores/videos";

const route = useRoute();
const yid = route.params.yid;

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
  <div class="row m-2">
    <div class="col text-center ratio ratio-21x9">
      <iframe
        :src="'https://www.youtube.com/embed/' + video.videoId"
        :title="video.title"
        width="1000" height="600"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
  </div>

  <div class="row">

  </div>
</template>

<script>
  // adviceTimecode:
  // advices:
  //   - title: ""
  //     author: ""
  // bookTimecode:
  // books:
  //   - title: ""
  //     author: ""
  //     storeUrl: ""
  //   - title: ""
  //     author: ""
  //     storeUrl: ""
  //   - title: ""
  //     author: ""
  //     storeUrl: ""
</script>
