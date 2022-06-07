<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";

import "bootstrap";
</script>

<template>
  <NavBar></NavBar>

  <div id="app" class="container-fluid">
    <!-- see https://stackoverflow.com/questions/45432208/vue-router-same-route-with-different-param -->
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "@/assets/scss/utility.css";
@import "@/assets/fontawesome-pro-5.14.0-web/css/fontawesome.css";
@import "@/assets/fontawesome-pro-5.14.0-web/css/solid.css";
@import "@/assets/fontawesome-pro-5.14.0-web/css/regular.css";
@import "@/assets/fontawesome-pro-5.14.0-web/css/brands.css";
</style>
