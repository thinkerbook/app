<script setup>
import { RouterLink } from "vue-router";

defineProps({
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
</script>

<template>
  <div class="card mb-2 h-100">
    <div class="card-header bg-transparent border-0">
      <div class="text-center">
        <a v-if="clickToVideo" :href="video.videoUrl" target="_blank">
          <img
            :src="'https://img.youtube.com/vi/' + video.videoId + '/0.jpg'"
            :alt="video.title"
            width="400"
            height="400"
            class="img-fluid"
            :class="inList ? '' : 'w-md-75 w-lg-50'"
          />
        </a>
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
            <RouterLink
              :to="{ name: 'VideoItem', params: { yid: video.videoId || 'unknown' } }"
              :class="!!video.adviceTimecode ? 'btn-dark' : 'btn-secondary'"
              class="btn btn-sm-x me-1"
              title="Nombre de conseils aux jeunes générations"
            >
              <i class="fas fa-wine-bottle"></i>
              <span v-if="!!video.adviceTimecode" class="ms-1">
                {{video.advices && video.advices.length }}
              </span>
              <span v-else class="ms-1">-</span>
            </RouterLink>
            <RouterLink
              :to="{ name: 'VideoItem', params: { yid: video.videoId || 'unknown' } }"
              :class="!!video.bookTimecode ? 'btn-dark' : 'btn-secondary'"
              class="btn btn-sm-x me-1"
              title="Nombre de bouquins à lire"
            >
              <i class="fas fa-book"></i>
              <span v-if="!!video.bookTimecode" class="ms-1">
                {{ video.books && video.books.length }}
              </span>
              <span v-else class="ms-1">-</span>
            </RouterLink>

            <a :href="video.link" target="_blank" class="btn btn-dark btn-sm-x me-1" title="Ouvrir la page de la publication de l'interview ThinkerView">
              <i class="fas fa-duck fa-flip-horizontal"></i>
            </a>
            <a v-if="video.mediaUrl" :href="video.mediaUrl" target="_blank" class="btn btn-dark btn-sm-x" title="Ouvrir l'enregistrement audio de l'interview ThinkerView">
              <i class="fas fa-music"></i>
            </a>

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

        <div class="row">
          <div class="mb-1">
            <i class="fas fa-tags me-1"></i>
            <span
              v-for="category in video.category"
              :key="category"
              class="badge bg-secondary me-1"
            >
            {{ category }}
          </span>
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
          Conseil(s) pour les jeunes générations
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
            A chercher
            <!-- TODO add link to contribute -->
          </div>
        </div>
      </div>

      <hr class="m-0"/>

      <div class="card-body d-flex-none pb-0">
        <h4>
          <i class="fas fa-book fa-xs"></i>
          Bouquins à lire
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
            A chercher
            <!-- TODO add link to contribute -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    bookStoreIcon(book) {
      return book.storeUrl.includes("amazon.fr")
        ? "fab fa-amazon"
        : "fas fa-external-link";
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
.d-flex-none {
  flex: none;
}
</style>
