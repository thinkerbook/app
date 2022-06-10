<template>
  <div v-if="!videoExists">
    <div class="col text-center my-2">
      <div class="alert alert-danger">
        <i class="fas fa-book-dead fa-2x"></i>
        <div>
          Aucune vidéo trouvée pour l'id
          "<code>{{ $route.params.yid }}</code>"
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card mb-2 h-100">
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
            :to="{ name: 'VideoItem', params: { yid: video.videoId || 'unknown' }, query: { q: query } }"
            class="btn btn-sm-x"
          >
            <img
              :src="coverUrl"
              :alt="video.title"
              width="400"
              height="400"
              class="img-fluid card-img-top"
            />
          </RouterLink>
        </div>
      </div>

      <div class="row text-start">
        <h2 class="col card-title mt-3" :class="!inList ? 'h2' : 'h4'">
          {{ video.title }}
        </h2>

        <nav
          v-if="!inList"
          class="col-auto mt-3"
        >
          <ul
            v-if="previousNext.previous || previousNext.next"
            class="pagination pagination-sm justify-content-end"
          >
            <li class="page-item" :class="previousNext.previous ? '' : 'disabled'">
              <router-link
                :to="{ name: 'VideoItem', params: { yid: previousNext.previous?.videoId || 'unknown' }, query: { q: query } }"
                class="page-link"
                title="Précédent"
              >&laquo;</router-link>
            </li>
            <li class="page-item" :class="previousNext.next ? '' : 'disabled'">
              <router-link
                :to="{ name: 'VideoItem', params: { yid: previousNext.next?.videoId || 'unknown' }, query: { q: query } }"
                class="page-link"
                title="Suivant"
              >&raquo;</router-link>
            </li>
          </ul>
        </nav>
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
                :to="{ name: 'VideoItem', params: { yid: video.videoId || 'unknown' }, query: { q: query } }"
                class="btn btn-dark btn-sm-x me-1"
              >
                <i class="fas fa-book"></i>
                <span class="ms-1">Voir les livres</span>
              </RouterLink>
              <RouterLink
                v-else
                :to="{ name: 'VideoItem', params: { yid: video.videoId || 'unknown' }, query: { q: query } }"
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
          </div>
        </div>
      </div>

      <div v-if="video.category && video.category.length > 0" class="card-header">
        <div class="mb-1">
          <i class="fas fa-tags me-1" title="Sujets abordés dans l'interview ThinkerView"></i>
          <RouterLink
            v-for="category in video.category"
            :key="category"
            :to="listRouteLocation(category)"
            class="btn btn-sm-xx me-1"
            :class="(query === category) ? 'btn-dark' : 'btn-outline-dark'"
          >
            {{ category }}
          </RouterLink>
        </div>
      </div>

      <div class="card-header">
        <i class="fas fa-user me-1" title="Invité(s)"></i>

        <ul class="list-inline d-inline">
          <li
            v-for="(guest) in video.guests"
            :key="guest"
            class="list-inline-item"
            style="margin-right: unset"
          >
            <RouterLink
              :to="listRouteLocation(guest)"
              class="btn btn-sm-xx me-1"
              :class="(query === guest) ? 'btn-dark' : 'btn-outline-dark'"
            >
              {{ guest }}
              <span
                class="badge rounded-pill"
                :class="(query === guest) ? 'bg-light text-dark' : 'bg-dark'"
              >
                {{ countByGuest(guest) }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="showInfo">
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
          <div class="h4">
            <div class="badge bg-primary">
              A compléter
            </div>
          </div>

          <div v-if="editable">
            <div>
              <label class="form-label">Code de temps</label>
              <input v-model="form.adviceTimecode" type="text" class="form-control" form="video-data-form">
              <div class="form-text">Le code de temps (en seconde) auquel est le conseil aux jeunes générations (la valeur t dans l'url youtube)</div>
            </div>

            <hr/>

            <fieldset v-for="(advice, index) in form.advices" :key="index">
              <div>
                <label class="form-label">Le conseil aux jeunes générations</label>
                <input v-model="advice.title" type="text" class="form-control" form="video-data-form">
              </div>
              <div>
                <label class="form-label">L'auteur du conseil</label>
                <input v-model="advice.author" type="text" class="form-control" form="video-data-form">
                <div v-if="index === 0" class="form-text">Indiquer d'abord le premier auteur du conseil si c'est une citation puis indiquer entre parenthèse qui des invités l'a prononcé (ie: "Einstein (via nom invité)")</div>
              </div>

              <hr/>
            </fieldset>

            <div>
              <div class="text-start my-3">
                <button type="button" class="btn btn-outline-primary" @click="addAdvice">
                  Ajouter un conseil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="m-0"/>

      <div class="card-body d-flex-none pb-0">
        <h4>
          <i class="fas fa-book fa-xs"></i>
          Livres à lire&nbsp;
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
          <div class="h4">
            <div class="badge bg-primary">
              A compléter
            </div>
          </div>

          <div v-if="editable">
            <div>
              <label class="form-label">Code de temps</label>
              <input v-model="form.bookTimecode" type="text" class="form-control" form="video-data-form">
              <div class="form-text">Le code de temps (en seconde) auquels sont les 3 livres (la valeur t dans l'url youtube)</div>
            </div>

            <hr/>

            <fieldset v-for="(book, index) in form.books" :key="index">
              <div>
                <label class="form-label">Titre du livre</label>
                <input v-model="book.title" type="text" class="form-control" form="video-data-form">
                <div v-if="index === 0" class="form-text">Mettre "Tous les livres de" dans le cas où seul un auteur est indiqué</div>
              </div>
              <div>
                <label class="form-label">Auteur du livre</label>
                <input v-model="book.author" type="text" class="form-control" form="video-data-form">
              </div>
              <div>
                <label class="form-label">URL du livre</label>
                <input v-model="book.storeUrl" type="text" class="form-control" form="video-data-form">
                <div v-if="index === 0" class="form-text">En priorité l'URL du livre sur Amazon, à défault la FNAC, sinon l'URL du site</div>
              </div>

              <hr/>
            </fieldset>

            <div>
              <div class="text-start my-3">
                <button type="button" class="btn btn-outline-primary" @click="addBook">
                  Ajouter un livre
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        v-if="editable && (!video.bookTimecode || !video.adviceTimecode)"
        id="video-data-form"
        @submit.prevent
        @click="sendData"
      >
        <div class="text-center my-3">
          <button type="submit" class="btn btn-primary">Enregistrer les informations</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useVideoStore } from "@/stores/videos";
import SwanIcon from "@/components/icons/SwanIcon.vue";

export default {
  components: {
    SwanIcon,
  },
  props: {
    video: {
      type: Object,
      required: true,
    },
    query: {
      type: String,
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
  },
  setup(props) {
    const videoStore = useVideoStore();
    const { countByGuest } = storeToRefs(videoStore);
    const { listRouteLocation, getLocalFeed, setLocalFeed } = videoStore;

    const route = useRoute();
    const videoExists = props.inList || route.params.yid && videoStore.hasVideo(route.params.yid);

    const index = !props.inList && videoStore.indexByVideoId(props.video.videoId) || -1;
    const previousNext = !props.inList && videoStore.previousNextAtIndex(index, props.query) || null;

    return {
      countByGuest,
      listRouteLocation,
      getLocalFeed,
      setLocalFeed,
      videoExists,
      previousNext,
    };
  },
  data() {
    return {
      form: {
        adviceTimecode: null,
        advices: [{}],
        bookTimecode: null,
        books: [{}],
      },
    };
  },
  computed: {
    editable() {
      console.log("this.$route.query.editable", this.$route.query.editable);
      return this.$route.query.editable !== undefined;
    },
    coverUrl() {
      return (
        this.video.coverUrl ||
        "https://img.youtube.com/vi/" + this.video.videoId + "/0.jpg"
      );
    },
  },
  mounted() {
    const data = this.getLocalFeed(this.video.videoId);
    // console.log("mounted data:", data);

    this.form = data || this.form;
  },
  methods: {
    bookStoreIcon(book) {
      return book.storeUrl.includes("amazon.fr")
        ? "fab fa-amazon"
        : "fas fa-external-link";
    },
    addAdvice() {
      console.log("addAdvice");
      this.form.advices.push({});
    },
    addBook() {
      console.log("addBook");
      this.form.books.push({});
    },
    sendData() {
      console.log("sendData, form: ", this.form);

      this.setLocalFeed(this.video.videoId, this.form);
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
