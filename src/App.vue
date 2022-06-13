<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import "@/assets/fontawesome-pro-5.14.0-web/js/fontawesome.js";
import "@/assets/fontawesome-pro-5.14.0-web/js/solid.js";
import "@/assets/fontawesome-pro-5.14.0-web/js/regular.js";
import "@/assets/fontawesome-pro-5.14.0-web/js/brands.js";

import "bootstrap";
</script>

<template>
  <NavBar />

  <div id="app" class="container-fluid">
    <!-- see https://stackoverflow.com/questions/45432208/vue-router-same-route-with-different-param -->
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "@/assets/scss/utility.css";

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
</style>
