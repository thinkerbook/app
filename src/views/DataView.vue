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
        : {{ allVideos.find(e => e.videoId === key).title }}
        <pre class="border p-2">{{ YAML.stringify(feed) }}</pre>
      </li>
    </ul>
  </div>
</template>

<script setup>
import YAML from "yaml";
import { useVideoStore } from "@/stores/videos";
import { storeToRefs } from "pinia";

const videoStore = useVideoStore();
const { allVideos, itemRouteLocation } = storeToRefs(videoStore);
const { getLocalFeeds } = videoStore;
</script>

<style>
</style>
