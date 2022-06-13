<template>
  <div v-if="listCount === 0" class="row my-2">
    <div class="col text-center">
      <div class="alert alert-warning">
        <i class="fas fa-exclamation-triangle fa-2x"></i>
        <div>
          Aucun résultat trouvé pour la recherche
          "<code>{{ searchQuery }}</code>"
        </div>
      </div>
    </div>
  </div>

  <!--
  <div v-if="isSearching" class="row my-2">
    <div class="col text-center">
      <button class="btn btn-outline-primary" @click="resetSearch">
        <i class="fas fa-window-close"></i>
        Annuler la recherche :
        "<code>{{ searchValue }}</code>"
      </button>
    </div>
  </div>
  -->

  <info-card :show-all="false" />

  <PageNav v-if="listCount > 0" :page="page" />

  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xxl-4">
    <div
      v-for="(video, index) in listVideos"
      :key="index"
      class="col"
    >
      <VideoCardView
        :video="video"
        :query="searchQuery"
        :show-details="true"
        :in-list="true"
      />
    </div>
  </div>

  <PageNav v-if="listCount > 0" :page="page" />

</template>

<script>
import { storeToRefs } from "pinia";
import { useVideoStore } from "@/stores/videos";
import VideoCardView from "@/views/VideoCardView.vue";
import InfoCard from "@/components/InfoCard.vue";
import PageNav from "@/components/PageNav.vue";

export default {
  components: {
    PageNav,
    VideoCardView,
    InfoCard,
  },
  props: {
    query: String,
    page: String,
  },
  setup(props) {
    const videoStore = useVideoStore();
    const { searchQuery, listVideos, listCount } = storeToRefs(videoStore);
    const { setupList } = videoStore;

    setupList(props.query, props.page);

    return {
      searchQuery,
      listVideos,
      listCount,
      setupList,
    };
  },
  data() {
    return {};
  },
};
</script>
