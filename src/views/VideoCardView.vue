<script setup>
defineProps({
  video: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card" style="max-width: 400px">
    <a :href="video.videoUrl" target="_blank">
      <img
        :src="'https://img.youtube.com/vi/' + video.videoId + '/0.jpg'"
        :alt="video.title"
        width="400"
        height="400"
        class="img-fluid img-thumbnail x-card-img-top">
    </a>
    <div class="card-body">
      <h5 class="card-title">{{ video.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ video.releaseDate?.toDateString() }}</h6>

      <div class="card">
        <div class="card-header">
          Guests
        </div>
        <ul class="list-group list-group-flush">
          <li
            v-for="(guest) in video.guests"
            :key="guest"
            class="list-group-item"
          >
            {{ guest }}
          </li>
        </ul>
      </div>

      <div class="card">
        <div class="card-header">
          Conseil pour les jeunes générations
          <a :href="video.videoUrl + '?t=' + video.adviceTimecode" target="_blank" title="Open video at timecode">
            <i class="fas fa-bookmark"></i>
          </a>
          <br>
          <i>(une bouteille à la mer)</i>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            {{ video.advice }}
          </li>
        </ul>
      </div>

      <div class="card">
        <div class="card-header">
          Bouquins conseillés
          <a :href="video.videoUrl + '?t=' + video.bookTimecode" target="_blank" title="Open video at timecode">
            <i class="fas fa-bookmark"></i>
          </a>
        </div>
        <ul class="list-group list-group-flush">
          <li
            v-for="(book) in video.books"
            :key="book.title"
            class="list-group-item"
          >
            <i class="fab fa-amazon me-1"></i>
            <a :href="book.amazonUrl" target="_blank">
              {{ book.title }} <i>({{ book.author }})</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
