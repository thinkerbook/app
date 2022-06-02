<template>
  <div v-if="listVideos.length === 0" class="row my-2">
    <div class="col text-center">
      <div class="alert alert-warning">
        <i class="fas fa-exclamation-triangle fa-2x"></i>
        <div>
          Aucun résultat trouvé pour la recherche
          "<code>{{ query }}</code>"
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

  <div class="card border-0">
    <div class="card-body">
      <p class="card-text" style="text-align: justify">
        Tous les livres recommandés dans les interviews de la chaine
        <a href="https://www.thinkerview.com/" target="_blank">ThinkerView</a>
        <span class="text-nowrap">
          (<a href="https://www.youtube.com/c/thinkerview/" target="_blank">
            <i class="fab fa-youtube"></i> Youtube
          </a>)
        </span>
        ainsi que le conseil aux jeunes générations (une bouteille à la mer).
      </p>
      <p class="card-text" style="text-align: justify; font-size: smaller">
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
        :query="query"
        :video="video"
        :show-details="true"
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
  props: {
    query: String,
  },
  setup(props) {
    const videoStore = useVideoStore();
    const { listVideos, isSearching } = storeToRefs(videoStore);
    const { doSearch, doResetSearch } = videoStore;

    console.log("setup props: %s", JSON.stringify(props));
    if (props.query) {
      console.log("setup doSearch: %s", props.query);
      doSearch(props.query);
    }

    return {
      listVideos,
      isSearching,
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
      if (newValue === undefined && oldValue !== undefined) {
        this.doResetSearch();
      } else {
        this.doSearch(newValue);
      }
    },
  },
};
</script>
