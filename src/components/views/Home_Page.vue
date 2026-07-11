<template>
  <div>
    <Banner />
    <Card @show-hotels="goToHotels" />
    <Trending />
    <section class="bg-teal-950 px-6 py-16 text-white sm:py-20">
      <div class="mx-auto max-w-7xl">
        <div class="grid gap-8 border-b border-white/10 pb-14 text-center sm:grid-cols-3 sm:text-left">
          <div v-for="stat in stats" :key="stat.label">
            <p class="font-display text-4xl text-teal-200 sm:text-5xl">{{ stat.value }}</p>
            <p class="mt-2 text-sm text-white/60">{{ stat.label }}</p>
          </div>
        </div>
        <div class="grid items-center gap-10 pt-14 lg:grid-cols-[1fr_auto]">
          <div>
            <p class="text-xs font-bold uppercase tracking-[.25em] text-teal-300">Your next stay starts here</p>
            <h2 class="font-display mt-3 max-w-3xl text-3xl leading-tight sm:text-5xl">Exceptional places. Thoughtful service. No booking stress.</h2>
            <p class="mt-4 max-w-2xl leading-7 text-white/65">Join travelers who choose StayEasy for verified properties, clear prices, and help whenever they need it.</p>
          </div>
          <RouterLink to="/hotels" class="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-amber-200">Explore all stays <span class="ml-2">→</span></RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Banner from "../home/Banner.vue";
import Card from "../home/Card.vue";
import Trending from "../home/Trending.vue";

const router = useRouter();
const stats = [
  { value: "12k+", label: "verified guest stays" },
  { value: "4.8/5", label: "average guest rating" },
  { value: "24/7", label: "human guest support" },
];

function goToHotels() {
  router.push("/hotels");
}
</script>
