<template>
  <div v-if="listVideos.length === 0" class="row my-2">
    <div class="col text-center">
      <div class="alert alert-warning">
        <i class="fas fa-exclamation-triangle"></i>
        Aucun résultat trouvé pour la recherche
        "<code>{{ searchValue }}</code>"
      </div>
    </div>
  </div>

  <div v-if="isSearching" class="row my-2">
    <div class="col text-center">
      <button class="btn btn-outline-primary" @click="resetSearch">
        <i class="fas fa-window-close"></i>
        Annuler la recherche
      </button>
    </div>
  </div>

  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xxl-4">
    <div
      v-for="(video, index) in listVideos"
      :key="index"
      class="col"
    >
      <VideoCardView
        :video="video"
        :show-details="true"
        :show-info="isShowInfo"
        :in-list="true"
      />
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useVideoStore } from "@/stores/videos";
import VideoCardView from "@/views/VideoCardView.vue";

export default {
  components: {
    VideoCardView,
  },
  setup() {
    const videoStore = useVideoStore();
    const { listVideos, isSearching, isShowInfo, searchValue } = storeToRefs(videoStore);
    const { doResetSearch } = videoStore;

    return {
      listVideos,
      isSearching,
      isShowInfo,
      searchValue,
      doResetSearch,
    };
  },
  data() {
    return {};
  },
  methods: {
    resetSearch() {
      this.doResetSearch();
    },
  },
};
</script>
