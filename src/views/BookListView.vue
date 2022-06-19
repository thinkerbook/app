<template>
  <h1>Tous les livres ({{ allBooks.length }})</h1>

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
        v-for="(book, index) in allBooks"
        :key="index"
      >
        <td>{{ book.author }}</td>
        <td>
          <i :class="bookStoreIcon(book)" class="fa-xs me-1"></i>
          <a :href="book.storeUrl" target="_blank">
            {{ book.title }}
          </a>
        </td>
        <td>
          <RouterLink
            :to="{ name: 'VideoItem', params: { yid: book.video.videoId } }"
          >
            {{ book.video.title }}
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
    const { allBooks } = storeToRefs(videoStore);
    const { } = videoStore;

    return {
      allBooks,
    };
  },
  data() {
    return {};
  },
  methods: {
    bookStoreIcon(book) {
      return book.storeUrl.includes("amazon.fr")
        ? "fab fa-amazon"
        : "fas fa-external-link";
    },
  },
};
</script>

<style scoped>
</style>
