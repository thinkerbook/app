<template>
  <h1>Tous les conseils ({{ allAdvices.length }})</h1>

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Auteur</th>
        <th>Titre</th>
        <th>Videos</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(advice, index) in allAdvices"
        :key="index"
      >
        <td>{{ advice.author }}</td>
        <td>{{ advice.title }}</td>
        <td>
          <RouterLink
              :to="{ name: 'VideoItem', params: { yid: advice.video.videoId } }"
          >
            {{ advice.video.title }}
          </RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { storeToRefs } from "pinia";

import { useVideoStore } from "@/stores/videos";

export default {
  props: {
  },
  setup() {
    const videoStore = useVideoStore();
    const { allAdvices } = storeToRefs(videoStore);

    return {
      allAdvices,
    };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
</style>
