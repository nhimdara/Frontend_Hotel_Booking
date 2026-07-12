<template>
  <main class="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-16">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[.25em] text-teal-700">Your collection</p>
          <h1 class="font-display mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl">Saved stays</h1>
          <p class="mt-3 max-w-xl text-slate-500">Keep your favorite hotels together and return when you are ready to book.</p>
        </div>
        <RouterLink to="/hotels" class="inline-flex items-center justify-center rounded-full bg-teal-800 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-900">Explore more hotels</RouterLink>
      </div>
      <section v-if="items.length" class="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="hotel in items" :key="hotel.id" class="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
          <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
            <img :src="hotel.image || fallbackImage" :alt="hotel.name" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" @error="setImageFallback" />
            <button type="button" class="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-rose-500 shadow-md" aria-label="Remove from saved stays" @click="remove(hotel.id)"><span class="text-xl">♥</span></button>
          </div>
          <div class="p-6">
            <div class="flex items-start justify-between gap-4">
              <div><h2 class="text-lg font-semibold text-slate-900">{{ hotel.name }}</h2><p class="mt-1 text-sm text-slate-500">{{ hotel.location }}</p></div>
              <span class="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">★ {{ hotel.rating.toFixed(1) }}</span>
            </div>
            <p class="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">{{ hotel.description }}</p>
            <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
              <p class="font-semibold text-teal-800">${{ hotel.price }} <span class="text-xs font-normal text-slate-400">/ night</span></p>
              <RouterLink :to="`/hotel/${hotel.id}`" class="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800">View stay</RouterLink>
            </div>
          </div>
        </article>
      </section>
      <section v-else class="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
        <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-50 text-3xl text-teal-700">♡</div>
        <h2 class="mt-5 text-xl font-semibold text-slate-900">No saved stays yet</h2>
        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Tap the heart on any hotel to build a shortlist for your next trip.</p>
        <RouterLink to="/hotels" class="mt-6 inline-flex rounded-full bg-teal-800 px-6 py-3 text-sm font-semibold text-white">Find a stay</RouterLink>
      </section>
    </div>
  </main>
</template>
<script setup>
import { fallbackImage } from "../../service/api/Hotel.js";
import { useWishlist } from "../../service/wishlist.js";
const { items, remove } = useWishlist();
function setImageFallback(event) { event.target.src = fallbackImage; }
</script>
