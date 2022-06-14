<template>
  <div v-if="listCount === 0" class="row my-2">
    <div class="col text-center">
      <div class="alert alert-warning">
        <i class="fas fa-exclamation-triangle fa-2x"></i>
        <div>
          Aucun résultat trouvé pour la recherche
          "<code>{{ searchQuery }}</code>"

          <RouterLink
            :to="{ name: 'VideoList' }"
            class="btn btn-outline-secondary btn-sm-x"
          >
            <i class="fas fa-times-circle"></i>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div v-if="listCount !== 0">
    <info-card :show-all="false" />

    <div class="row text-center">
      <div class="col" style="font-weight: bold">
        {{ searchCount }}<span v-if="isSearching">/{{ allCount }}</span> interviews
        <span v-if="pageNav.index > 0">(page 1-{{ pageNav.index + 1 }}/{{ pageNav.count }})</span>
      </div>
    </div>
    <div v-if="isSearching" class="row text-center mb-2">
      <div class="col">
        Recherche "<code>{{ searchQuery }}</code>"
        <RouterLink
          :to="{ name: 'VideoList' }"
          class="btn btn-outline-secondary btn-sm-x"
        >
          <i class="fas fa-times-circle"></i>
        </RouterLink>
      </div>
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
        :query="searchQuery"
        :show-details="true"
        :in-list="true"
      />
    </div>
  </div>

  <PageNav v-if="listCount > 0" :page="pageIndex" />

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
    pageIndex: String,
  },
  setup(props) {
    const videoStore = useVideoStore();
    const { page, isSearching, searchQuery, searchCount, listVideos, listCount, allCount } = storeToRefs(videoStore);
    const { setupList } = videoStore;

    setupList(props.query, props.pageIndex);

    return {
      pageNav: page,
      isSearching,
      searchQuery,
      searchCount,
      listVideos,
      listCount,
      allCount,
      setupList,
    };
  },
  data() {
    return {};
  },
};
</script>
