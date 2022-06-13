<template>
  <div v-if="!dismissible || getConfig().showInfoOnStart" class="card border-0">
    <div class="card-body alert alert-light alert-dismissible fade show" style="margin-bottom: 0">
      <button
        v-if="dismissible"
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="dismissInfo"
      ></button>

      <p class="card-text" style="text-align: justify">
        Tous les livres recommandés dans les interviews de la chaine
        <a href="https://www.thinkerview.com/" target="_blank">ThinkerView</a>
        <span class="text-nowrap">
          (<a href="https://www.youtube.com/c/thinkerview/" target="_blank">
            <i class="fab fa-youtube"></i> Youtube
          </a>)
        </span>

        <span
          v-if="!isShowAll"
          class="btn btn-outline-secondary btn-sm-xx ms-2"
          title="Afficher plus"
          @click="doShowAll"
        >
          ...
        </span>

        <span v-if="isShowAll">
          ainsi que le conseil aux jeunes générations (une bouteille à la mer).
        </span>
      </p>
      <p v-if="isShowAll" class="card-text" style="text-align: justify; font-size: smaller">
        <i class="fas fa-thumbs-up"></i>
        Tips: pour accéder directement à ThinkerBook depuis une vidéo Youtube, ajouter <code>-tbk</code> dans l'URL :
        <i>https://www.youtube<code>-tbk</code>.com/watch?v=6VUpicNBMzg</i>
      </p>
    </div>
  </div>
</template>

<script>
import ls from "localstorage-slim";
// dismiss for a month
const DISMISS_TIMEOUT = 60 * 60 * 24 * 30;

export default {
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    showAll: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    function getConfig() {
      const defaultConfig = {
        showInfoOnStart: true,
      };
      return ls.get("config") || defaultConfig;
    }

    function setConfig(config) {
      const value = Object.assign({}, config);
      ls.set("config", value, { ttl: DISMISS_TIMEOUT });
    }

    return {
      getConfig,
      setConfig,
    };
  },
  data() {
    return {
      isShowAll: this.showAll,
    };
  },
  methods: {
    dismissInfo() {
      console.log("dismissInfo");
      this.setConfig({ showInfoOnStart: false });
    },
    doShowAll() {
      this.isShowAll = true;
    },
  },
};
</script>
