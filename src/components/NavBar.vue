<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink :to="{ name: 'VideoList' }" class="navbar-brand">
        <i class="far fa-book"></i>
        ThinkerBook
        (<span v-if="isItem">{{ item.index + 1 }}-</span>
        <span v-if="isSearching">{{ listCount }}/</span>
        <span>{{ allCount }}</span>)
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarSupportedContent" ref="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
          </li>
        </ul>

        <div class="navbar-nav ms-auto">
          <form class="d-flex" @submit.prevent>
            <input
              v-model="queryInput"
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-secondary"
              type="submit"
              title="Search"
              @click="search(queryInput)"
            >
              <i class="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { Collapse } from "bootstrap";
import { useVideoStore } from "@/stores/videos";

export default {
  components: {
    RouterLink,
  },
  setup() {
    const videoStore = useVideoStore();
    const { item, searchQuery, listVideos, listCount, allCount, isSearching, isItem } = storeToRefs(videoStore);

    return {
      item,
      searchQuery,
      listVideos,
      listCount,
      allCount,
      isSearching,
      isItem,
    };
  },
  data() {
    return {
      navbarCollapse: null,
      queryInput: null,
    };
  },
  watch: {
    searchQuery: function (newValue) {
      this.queryInput = newValue;

      if (newValue) {
        console.log("navbarShow: %s", newValue);
        this.navbarCollapse.show();
      }
    },
  },
  mounted() {
    const navbarCollapseEl = this.$refs.navbarCollapse;
    this.navbarCollapse = new Collapse(navbarCollapseEl, { toggle: false });
  },
  methods: {
    search(queryInput) {
      const query = (queryInput === "") ? null : { q: queryInput };
      this.$router.push({ name: "VideoList", query });
    },
  },
};
</script>

<style scoped>
</style>
