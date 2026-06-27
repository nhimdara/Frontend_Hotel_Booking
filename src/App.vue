<template>
  <Home_Page v-if="currentPage === 'home'" @show-hotels="showHotels" />
  <Hotel_Card v-else @back-home="showHome" />
</template>

<script setup>
import { ref } from "vue";
import Home_Page from "./components/views/Home_Page.vue";
import Hotel_Card from "./components/views/Hotel_Card.vue";

const currentPage = ref("home");

function showHotels() {
  currentPage.value = "hotels";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome() {
  currentPage.value = "home";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style></style>
