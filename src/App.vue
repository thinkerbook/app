<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";

import "bootstrap";
</script>

<template>
  <NavBar></NavBar>

  <div id="app" class="container-fluid">
    <RouterView />
  </div>
</template>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "@/assets/fontawesome-pro-5.14.0-web/css/all.css";
</style>
