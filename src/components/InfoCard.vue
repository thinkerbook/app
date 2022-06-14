<template>
  <div class="card border-0">
    <div
      class="card-body alert alert-light"
      style="margin-bottom: 0"
    >
      <p class="card-text" style="text-align: justify">
        Tous les livres recommandés dans les interviews de la chaine
        <a href="https://www.thinkerview.com/" target="_blank">ThinkerView</a>
        <span class="text-nowrap">
          (<a href="https://www.youtube.com/c/thinkerview/" target="_blank">
            <i class="fab fa-youtube"></i> Youtube
          </a>)
        </span>

        <span v-if="isShowAll">
          ainsi que le conseil aux jeunes générations (une bouteille à la mer)
        </span>
        .

        <span
          v-if="!isShowAll"
          class="btn btn-outline-secondary btn-sm-xx ms-2"
          title="Afficher plus"
          @click="doDisplayAll(true)"
        >
          v
        </span>
      </p>

      <p v-if="isShowAll" class="card-text" style="text-align: justify; font-size: smaller">
        <i class="fas fa-thumbs-up"></i>
        Tips: pour accéder directement à ThinkerBook depuis une vidéo Youtube, ajouter <code>-tbk</code> dans l'URL :
        <i>https://www.youtube<code>-tbk</code>.com/watch?v=6VUpicNBMzg</i>

        <span
          v-if="isShowAll"
          class="btn btn-outline-secondary btn-sm-xx ms-2"
          title="Afficher moins"
          @click="doDisplayAll(false)"
        >
          ^
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showAll: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      isShowAll: this.showAll,
    };
  },
  methods: {
    doDisplayAll(all) {
      this.isShowAll = all;
    },
  },
};
</script>
