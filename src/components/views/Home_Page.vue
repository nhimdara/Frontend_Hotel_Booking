<template>
  <div>
    <Navbar />
    <Banner />
    <Card @show-hotels="$emit('show-hotels')" />
    <Trending />
    <Footer />
  </div>
</template>



<script>
import Navbar from "../layout/Navbar.vue";
import Banner from "../home/Banner.vue";
import Card from "../home/Card.vue";
import Trending from "../home/Trending.vue";
import Footer from "../layout/Footer.vue";

export default {
  name: "HomePage",
  emits: ["show-hotels"],
  components: { Navbar, Banner, Card, Trending, Footer },
};
</script>

