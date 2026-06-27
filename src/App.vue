<template>
  <div>
    <Home_Page />
    <Hotel_Card />
  </div>
</template>

<script>
import Home_Page from "./components/views/Home_Page.vue";
import Hotel_Card from "./components/views/Hotel_Card.vue";

export default {
  name: "App",
  components: {
    Home_Page,
    Hotel_Card,
  },
};
</script>

<style></style>
