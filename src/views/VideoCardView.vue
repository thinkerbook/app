<script setup>
import { RouterLink, useRoute } from "vue-router";

import SwanIcon from "@/components/icons/SwanIcon.vue";
import { useVideoStore } from "@/stores/videos";

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
  // show details such as publishing date, tags
  showDetails: {
    type: Boolean,
    default: true,
  },
  // show guests, advices and books
  showInfo: {
    type: Boolean,
    default: false,
  },
  clickToVideo: {
    type: Boolean,
    default: false,
  },
  inList: {
    type: Boolean,
    default: false,
  },
});

const videoStore = useVideoStore();
const { doSearch } = videoStore;

const route = useRoute();
const exists = props.inList || route.params.yid && videoStore.hasVideo(route.params.yid);
// console.log("exists: %s", exists);
</script>

<template>
  <div v-if="!exists">
    <div class="col text-center my-2">
      <div class="alert alert-danger">
        <i class="fas fa-book-dead fa-2x"></i>
        <div>
          Aucune vidéo trouvée pour l'id
          "<code>{{ route.params.yid }}</code>"
        </div>
      </div>
    </div>
  </div>
  <div v-else v-touch:swipe="swipe" class="card mb-2 h-100">
    <div class="card-header bg-transparent border-0">
      <div class="row">
        <div class="col">
          <div v-if="clickToVideo" class="w-md-100 w-lg-75 w-xxl-50 ratio ratio-16x9 centered">
            <iframe
              :src="'https://www.youtube.com/embed/' + video.videoId"
              :title="video.title"
              width="800"
              height="600"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <RouterLink
            v-else
            :to="{ name: 'VideoItem', params: { yid: video.videoId || 'unknown' } }"
            class="btn btn-sm-x"
          >
            <img
              :src="'https://img.youtube.com/vi/' + video.videoId + '/0.jpg'"
              :alt="video.title"
              width="400"
              height="400"
              class="img-fluid card-img-top"
            />
          </RouterLink>
        </div>

        <div class="text-start">
          <h2 class="card-title mt-3" :class="!inList ? 'h2' : 'h4'">
            {{ video.title }}
          </h2>
        </div>
      </div>
    </div>

    <div v-if="showDetails">
      <div class="card-header">
        <div class="row">
          <div class="col">
            <code style="font-size: smaller">
              <i class="fas fa-calendar-day"></i>
              {{ video.releaseDate?.toDateString() }}
            </code>
          </div>

          <div class="col text-end">
            <div v-if="inList">
              <RouterLink
                v-if="video.bookTimecode"
                :to="{ name: 'VideoItem', params: { yid: video.videoId || 'unknown' } }"
                class="btn btn-dark btn-sm-x me-1"
              >
                <i class="fas fa-book"></i>
                <span class="ms-1">Voir les livres</span>
              </RouterLink>
              <RouterLink
                v-else
                :to="{ name: 'VideoItem', params: { yid: video.videoId || 'unknown' } }"
                class="btn btn-info btn-sm-x me-1"
              >
                <i class="fas fa-edit"></i>
                <span class="ms-1">À compléter</span>
              </RouterLink>
            </div>
            <div v-else>
              <a :href="video.link" target="_blank" class="btn btn-dark btn-sm-x me-1" title="Ouvrir la page de la publication de l'interview ThinkerView">
                <SwanIcon />
              </a>
              <a v-if="video.mediaUrl" :href="video.mediaUrl" target="_blank" class="btn btn-dark btn-sm-x" title="Ouvrir l'enregistrement audio de l'interview ThinkerView">
                <i class="fas fa-music"></i>
              </a>
            </div>

            <!--
            <RouterLink
              :to="{ name: 'VideoEdit', params: { yid: video.videoId || 'unknown' } }"
              class="btn btn-primary btn-sm-x"
            >
              <i class="fas fa-edit"></i>
              edit
            </RouterLink>
            -->
          </div>
        </div>

        <hr/>

        <div v-if="video.category && video.category.length > 0" class="row">
          <div class="mb-1">
            <i class="fas fa-tags me-1" title="Sujets abordés dans l'interview ThinkerView"></i>
            <button
              v-for="category in video.category"
              :key="category"
              class="btn btn-outline-secondary btn-sm-xx me-1"
              @click="doSearch(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showInfo">
      <div class="card-header">
        <h4>
          <i class="fas fa-user fa-xs"></i>
          Invité(s)
        </h4>

        <ul>
          <li
              v-for="(guest) in video.guests"
              :key="guest"
          >
            {{ guest }}
          </li>
        </ul>
      </div>

      <div class="card-body d-flex-none pb-0">
        <h4>
          <i class="fas fa-wine-bottle fa-xs"></i>
          Conseil(s) pour les jeunes générations&nbsp;
          <a
            v-if="!!video.adviceTimecode"
            :href="video.videoUrl + '?t=' + video.adviceTimecode"
            target="_blank"
            :title="'Ouvrir la vidéo au temps t=' + video.adviceTimecode"
          >
            <i class="fas fa-film"></i>
          </a>
        </h4>
        <ul v-if="!!video.adviceTimecode" class="list-group list-group-flush">
          <li class="list-group-item">
            <figure v-for="(advice, index) in video.advices" :key="index">
              <blockquote class="blockquote">
                <p>{{ advice.title }}</p>
              </blockquote>
              <figcaption class="blockquote-footer text-end">
                {{ advice.author }}
              </figcaption>
            </figure>
          </li>
        </ul>
        <div v-else class="mb-2">
          <div class="badge bg-primary">
            A compléter
            <!-- TODO add link to contribute -->
          </div>
        </div>
      </div>

      <hr class="m-0"/>

      <div class="card-body d-flex-none pb-0">
        <h4>
          <i class="fas fa-book fa-xs"></i>
          Bouquins à lire&nbsp;
          <a
            v-if="video.bookTimecode"
            :href="video.videoUrl + '?t=' + video.bookTimecode"
            target="_blank"
            :title="'Ouvrir la vidéo au temps t=' + video.bookTimecode"
          >
            <i class="fas fa-film"></i>
          </a>
        </h4>
        <ul v-if="!!video.bookTimecode" class="list-group list-group-flush">
          <li
            v-for="(book) in video.books"
            :key="book.title"
            class="list-group-item"
          >
            <i :class="bookStoreIcon(book)" class="fa-xs me-1"></i>
            <a :href="book.storeUrl" target="_blank">
              {{ book.title }} <i>({{ book.author }})</i>
            </a>
          </li>
        </ul>
        <div v-else class="mb-2">
          <div class="badge bg-primary">
            A compléter
            <!-- TODO add link to contribute -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    bookStoreIcon(book) {
      return book.storeUrl.includes("amazon.fr")
        ? "fab fa-amazon"
        : "fas fa-external-link";
    },
    swipe() {
      if (this.inList) {
        return;
      }

      console.log("swipe");
      // this.$router.push({ name: "VideoItem", params: { yid: "" } });
    },
  },
};
</script>

<style scoped>
.btn-sm-x {
  padding: 0.2rem 0.4rem;
  font-size: small !important;
  border-radius: 0.2rem;
}
.btn-sm-xx {
  padding: 0.1rem 0.3rem;
  font-size: small !important;
  border-radius: 0.2rem;
}
.d-flex-none {
  flex: none;
}
.centered {
  margin-right: auto;
  margin-left: auto;
}
</style>
