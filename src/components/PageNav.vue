<template>
  <nav class="row mt-2">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled">
        <span class="page-link">
          Page {{ pageNav.index + 1 }}/{{ pageNav.count }}
          <span v-if="isSearching"> ({{ searchCount }}/{{ allCount }})</span>
        </span>
      </li>

      <li v-if="!showMore" class="page-item" :class="pageNav.hasPrevious ? '' : 'disabled'">
        <router-link
          :to="listRouteLocation(searchQuery, pageIndex - 1)"
          class="page-link"
        >
          <span>&laquo;</span>
        </router-link>
      </li>
      <li v-if="!showMore" class="page-item" :class="pageNav.hasNext ? '' : 'disabled'">
        <router-link
          :to="listRouteLocation(searchQuery, pageIndex + 1)"
          class="page-link"
        >
          <span>&raquo;</span>
        </router-link>
      </li>

      <li v-if="showMore && pageNav.hasNext" class="page-item">
        <router-link
          :to="listRouteLocation(searchQuery, pageIndex + 1)"
          class="page-link"
        >
          <span>Afficher plus</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { storeToRefs } from "pinia";

import { useVideoStore } from "@/stores/videos";

export default {
  props: {
    page: {
      type: String,
      default: "0",
    },
    showMore: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const videoStore = useVideoStore();
    const { searchQuery, isSearching, page, listCount, searchCount, allCount } = storeToRefs(videoStore);
    const { listRouteLocation } = videoStore;

    return {
      searchQuery,
      isSearching,
      pageNav: page,
      listCount,
      searchCount,
      allCount,
      listRouteLocation,
    };
  },
  computed: {
    pageIndex() {
      return (this.page && parseInt(this.page)) || 0;
    },
  },
  methods: {
  },
};
</script>
