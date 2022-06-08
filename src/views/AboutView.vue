<template>
  <div class="about">
    <h1>A propos</h1>

    <info-card />

    <h1>Usage</h1>

    <p>
      Aucun usage commercial n'est fait de
      <a href="https://www.thinkerview.com/" target="_blank">ThinkerView</a> comme indiqué par la licence
      <span>
        <i class="fab fa-creative-commons"></i>
        <i class="fab fa-creative-commons-by"></i>
        <i class="fab fa-creative-commons-nc"></i>
        <i class="fab fa-creative-commons-sa"></i>
      </span>
      (<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
        <code>CC BY-NC-SA 4.0</code>
      </a>).
    </p>

    <h1>Hébergement</h1>

    <p>
      L'hébergement du site est fait via la plateforme <a href="https://www.cloudflare.com/">Cloudflare</a>.
    </p>

    <h1>Contact</h1>
    <p>
      <code>contact@thinkerbook.info</code>
    </p>
    <!--
    <h1>Comment contribuer</h1>

    <p>
      Proposer une pull request sur github.
    </p>
    -->
  </div>
</template>

<script setup>
import InfoCard from "@/components/InfoCard.vue";
</script>

<style>
</style>
