<script setup>
defineProps({
  video: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card mb-2 h-100">
    <div class="card-header bg-transparent">
      <a :href="video.videoUrl" target="_blank">
        <img
          :src="'https://img.youtube.com/vi/' + video.videoId + '/0.jpg'"
          :alt="video.title"
          width="400"
          height="400"
          class="img-fluid card-img-top">
      </a>

      <h5 class="card-title mt-3">
        {{ video.title }}
      </h5>
    </div>

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

    <div class="card-header">
      <div class="row">
        <div class="col">
          <code>
            <i class="fas fa-calendar-day"></i>
            {{ video.releaseDate?.toDateString() }}
          </code>
        </div>

        <div class="col text-end">
          <a :href="video.link" target="_blank" class="btn btn-dark btn-sm-x me-1">
            <i class="fas fa-external-link"></i>
            source
          </a>
          <a v-if="video.mediaUrl" :href="video.mediaUrl" target="_blank" class="btn btn-dark btn-sm-x">
            <i class="fas fa-music"></i>
            audio
          </a>
        </div>
      </div>

      <hr>

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

    <div class="card-body d-flex-none pb-0">
      <h4>
        <i class="fas fa-wine-bottle fa-xs"></i>
        Conseil(s) pour les jeunes générations
        <a :href="video.videoUrl + '?t=' + video.adviceTimecode" target="_blank" :title="'Open video at timecode t=' + video.adviceTimecode">
          <i class="fas fa-film"></i>
        </a>
      </h4>
      <ul class="list-group list-group-flush">
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
    </div>

    <hr class="m-0">

    <div class="card-body d-flex-none pb-0">
      <h4>
        <i class="fas fa-book fa-xs"></i>
        Bouquins à lire
        <a :href="video.videoUrl + '?t=' + video.bookTimecode" target="_blank" :title="'Open video at timecode t=' + video.bookTimecode">
          <i class="fas fa-film"></i>
        </a>
      </h4>
      <ul class="list-group list-group-flush">
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
}
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
