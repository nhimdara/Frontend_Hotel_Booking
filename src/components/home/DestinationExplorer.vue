<template>
  <section class="overflow-hidden bg-[#eef3f1] px-5 py-16 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[.28em] text-teal-700">Explore by mood</p>
          <h2 class="font-display mt-3 max-w-2xl text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl">Where will your curiosity take you?</h2>
        </div>
        <p class="max-w-md text-sm leading-7 text-slate-500">Start with a destination or choose the kind of escape you need. We will take you straight to matching stays.</p>
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
        <button v-for="(place, index) in destinations" :key="place.name" type="button" class="group relative min-h-64 overflow-hidden rounded-3xl text-left shadow-sm lg:min-h-56" :class="index < 2 ? 'lg:col-span-6' : 'lg:col-span-4'" @click="explore(place.search)">
          <img :src="place.image" :alt="place.name" class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
            <div><p class="text-xs font-bold uppercase tracking-[.2em] text-amber-300">{{ place.eyebrow }}</p><h3 class="font-display mt-2 text-3xl font-semibold">{{ place.name }}</h3><p class="mt-1 text-sm text-white/70">{{ place.caption }}</p></div>
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-xl backdrop-blur transition group-hover:bg-white group-hover:text-slate-950">→</span>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const destinations = [
  { name: "Phnom Penh", search: "Phnom Penh", eyebrow: "City energy", caption: "Rooftops, culture & cuisine", image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=85" },
  { name: "Siem Reap", search: "Siem Reap", eyebrow: "Ancient wonder", caption: "Temples, calm & golden mornings", image: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?auto=format&fit=crop&w=1200&q=85" },
  { name: "Beach escapes", search: "beach", eyebrow: "Slow down", caption: "Wake up beside the water", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85" },
  { name: "Urban stays", search: "city", eyebrow: "Stay central", caption: "Everything within reach", image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1000&q=85" },
  { name: "Quiet retreats", search: "resort", eyebrow: "Reset fully", caption: "Space to breathe again", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85" },
];
function explore(search) { router.push({ path: "/hotels", query: { search } }); }
</script>
