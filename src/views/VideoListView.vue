<template>
  <div v-if="listVideos.length === 0" class="row my-2">
    <div class="col text-center">
      <div class="alert alert-warning">
        <i class="fas fa-exclamation-triangle fa-2x"></i>
        <div>
          Aucun résultat trouvé pour la recherche
          "<code>{{ searchValue }}</code>"
        </div>
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

  <div class="card border-0">
    <div class="card-body">
      <p class="card-text" style="text-align: justify">
        Tous les livres recommandés dans les interviews de la chaine
        <a href="https://www.thinkerview.com/" target="_blank">ThinkerView</a>
        (<a href="https://www.youtube.com/c/thinkerview/" target="_blank">
          <i class="fab fa-youtube"></i>
          Youtube
        </a>)
        ainsi que le conseil aux jeunes générations (une bouteille à la mer).
      </p>
      <p class="card-text" style="text-align: justify">
        <i class="fas fa-thumbs-up"></i>
        Tips: pour accéder directement à ThinkerBook depuis une vidéo Youtube, ajouter <code>-tbk</code> dans l'URL :
        <i>https://www.youtube<code>-tbk</code>.com/watch?v=6VUpicNBMzg</i>
      </p>
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
    const { doSearch, doResetSearch } = videoStore;

    return {
      listVideos,
      isSearching,
      isShowInfo,
      searchValue,
      doSearch,
      doResetSearch,
    };
  },
  data() {
    return {};
  },
  watch: {
    "$route.query.q": function (newValue, oldValue) {
      console.log("on:search new: %s, old: %s", newValue, oldValue);
      // this.doSearch(newValue);
    },
  },
  methods: {
    resetSearch() {
      this.doResetSearch();
    },
  },
};
</script>
