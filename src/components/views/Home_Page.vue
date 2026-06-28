<template>
  <div>
    <Banner />
    <Card @show-hotels="goToHotels" />
    <Trending />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Banner from "../home/Banner.vue";
import Card from "../home/Card.vue";
import Trending from "../home/Trending.vue";

const router = useRouter();

function goToHotels() {
  router.push("/hotels");
}
</script>