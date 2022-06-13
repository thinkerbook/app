<template>
  <div>
    <h1>Local data</h1>

    <ul>
      <li v-for="(feed, key) in getLocalFeeds()" :key="key">
        <router-link
          :to="itemRouteLocation(key)"
        >
          <code>{{ key }}</code>
        </router-link>
        : {{ videoById(key).title }}
        <a
          class="btn btn-outline-success btn-sm me-2"
          :href="`mailto:data@thinkerbook.info?subject=${emailSubject(key)}&body=${emailBody(key, feed)}`"
        >
          <i class="fas fa-envelope"></i>
          Email
        </a>
        <button class="btn btn-outline-danger btn-sm" @click="deleteData(key)">
          <i class="fas fa-trash"></i>
          Supprimer
        </button>
        <pre class="border p-2">{{ feedStr(feed) }}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
import YAML from "yaml";
import { useVideoStore } from "@/stores/videos";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const videoStore = useVideoStore();
    const { allVideos, itemRouteLocation } = storeToRefs(videoStore);
    const { getLocalFeeds, removeLocalFeed } = videoStore;

    return {
      allVideos,
      itemRouteLocation,
      getLocalFeeds,
      removeLocalFeed,
    };
  },
  methods: {
    videoById(id) {
      return this.allVideos.find(e => e.videoId === id);
    },
    emailSubject(key) {
      return encodeURI(`ThinkerBook - ${this.videoById(key).title}`);
    },
    emailBody(key, feed) {
      return encodeURI(`https://thinkerbook.info/${key}\n${YAML.stringify(feed)}`);
    },
    feedStr(feed) {
      return YAML.stringify(feed);
    },
    deleteData(id) {
      console.log("deleteData");
      this.removeLocalFeed(id);
    },
  },
};
</script>

<style>
</style>
