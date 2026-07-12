<template>
  <section class="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 sm:py-20 lg:px-12">
    <div class="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2
          class="font-display text-3xl font-semibold text-slate-900 sm:text-4xl"
        >
          Featured Stays
        </h2>
        <p class="mt-2 text-sm text-slate-500">
          Hand-picked premium destinations for your next journey.
        </p>
      </div>
      <a
        href="#"
        @click.prevent="viewHotels"
        class="flex items-center gap-1.5 text-sm font-semibold text-teal-800 transition-colors hover:text-teal-900"
      >
        View all
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="h-4 w-4"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>

    <div
      v-if="loading && !displayedStays.length"
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="item in 4"
        :key="item"
        class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
      >
        <div class="aspect-[5/4] animate-pulse bg-slate-100"></div>
        <div class="space-y-4 p-5">
          <div class="h-5 w-3/4 animate-pulse rounded bg-slate-100"></div>
          <div class="h-4 w-1/2 animate-pulse rounded bg-slate-100"></div>
          <div class="h-12 animate-pulse rounded bg-slate-100"></div>
          <div class="h-10 animate-pulse rounded bg-slate-100"></div>
        </div>
      </div>
    </div>

    <div
      v-else-if="error && !displayedStays.length"
      class="rounded-2xl border border-rose-100 bg-rose-50 px-5 py-6 text-sm text-rose-700"
    >
      <p class="font-semibold">Could not load featured stays.</p>
      <p class="mt-1">{{ error }}</p>
    </div>

    <div
      v-else-if="!displayedStays.length"
      class="rounded-2xl border border-slate-100 bg-white px-5 py-6 text-sm text-slate-500"
    >
      No featured stays are available yet.
    </div>

    <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="stay in displayedStays"
        :key="stay.id"
        class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-lg"
      >
        <div class="relative aspect-[5/4] overflow-hidden">
          <img
            :src="stay.image"
            :alt="stay.name"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            @error="setImageFallback"
          />

          <span
            v-if="stay.badge"
            class="absolute left-3.5 top-3.5 rounded-full px-3 py-1.5 text-xs font-semibold"
            :class="stay.badge.style"
          >
            {{ stay.badge.label }}
          </span>

          <button
            type="button"
            :aria-label="
              stay.wishlisted ? 'Remove from favorites' : 'Save to favorites'
            "
            class="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
            @click="toggleWishlist(stay)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              :fill="stay.wishlisted ? '#ef4444' : 'none'"
              :stroke="stay.wishlisted ? '#ef4444' : 'currentColor'"
              stroke-width="2"
              class="h-4 w-4"
            >
              <path
                d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
              />
            </svg>
          </button>
        </div>

        <div class="flex flex-1 flex-col p-5">
          <div class="flex items-start justify-between gap-2">
            <h3 class="text-base font-semibold text-slate-900 sm:text-lg">
              {{ stay.name }}
            </h3>
            <span
              class="flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-3.5 w-3.5 text-amber-400"
              >
                <path
                  d="M12 2l2.9 6.26 6.9.6-5.2 4.54L18.2 20 12 16.3 5.8 20l1.6-6.6L2.2 8.86l6.9-.6L12 2z"
                />
              </svg>
              {{ stay.rating.toFixed(2) }}
            </span>
          </div>

          <p class="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-3.5 w-3.5 shrink-0"
            >
              <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {{ stay.location }}
          </p>

          <!-- Description -->
          <p class="mt-3 text-sm text-slate-500 line-clamp-2 flex-1">
            {{ stay.description }}
          </p>

          <!-- Price + Button -->
          <div
            class="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p class="text-base font-semibold text-teal-800">
              ${{ stay.price }}
              <span class="font-normal text-slate-400">/ night</span>
            </p>
            <button
              type="button"
              class="w-full shrink-0 rounded-xl bg-teal-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-900 active:scale-95 sm:w-auto"
              @click="viewDetails(stay)"
            >
              View Details
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import hotelApi, { fallbackImage } from "./../../service/api/Hotel.js";
import { syncWishlist, useWishlist } from "../../service/wishlist.js";

const emit = defineEmits(["show-hotels"]);
const router = useRouter();
const wishlist = useWishlist();

const { hotels: stays, loading, error, fetchHotels } = hotelApi.setup();
const displayedStays = computed(() => stays.value.slice(0, 4));

onMounted(() => {
  if (!stays.value.length) {
    fetchHotels({ per_page: 4 }).then(syncWishlist).catch(() => {});
  }
});

function toggleWishlist(stay) {
  stay.wishlisted = wishlist.toggle(stay);
}

function viewHotels() {
  emit("show-hotels");
}

function viewDetails(stay) {
  router.push(`/hotel/${stay.id}`);
}

function setImageFallback(event) {
  if (event.target.src !== fallbackImage) {
    event.target.src = fallbackImage;
  }
}
</script>

<style scoped>
.font-display {
  font-family: "Fraunces", ui-serif, Georgia, serif;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
