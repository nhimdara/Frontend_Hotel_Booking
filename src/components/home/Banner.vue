<template>
  <section class="relative min-h-[calc(100svh-5rem)] w-full overflow-hidden bg-slate-950">
    <img
      src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop"
      alt="Infinity pool overlooking the coast at sunset"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <!-- Layered overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/15 to-slate-950/75"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
    />

    <div
      class="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-6xl flex-col items-center justify-center px-5 py-16 text-center sm:px-6"
    >
      <p
        class="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300"
      >
        Curated stays, vetted hosts
      </p>

      <h1
        class="font-display text-4xl font-semibold leading-[1.08] text-white drop-shadow-sm sm:text-6xl lg:text-7xl"
      >
        Find your next<br />
        peaceful retreat
      </h1>

      <p
        class="mt-4 max-w-sm text-base leading-relaxed text-white/85 sm:mt-6 sm:max-w-xl sm:text-lg"
      >
        Discover curated stays designed for comfort and clarity — premium
        hospitality, at your fingertips.
      </p>

      <!-- Search card -->
      <div class="mt-8 w-full max-w-6xl sm:mt-10">
        <div
          class="flex flex-col gap-0 rounded-2xl bg-white/95 p-3 shadow-2xl shadow-black/30 ring-1 ring-black/5 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2"
        >
          <!-- Location -->
          <div
            class="group flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-slate-50 sm:flex-[1.35] sm:rounded-full sm:px-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-5 w-5 flex-shrink-0 text-teal-700/70"
            >
              <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div class="flex flex-col min-w-0 flex-1">
              <span class="text-xs font-semibold text-slate-900">Location</span>
              <input v-model.trim="search.location"
                placeholder="Where are you going?"
                type="search"
                class="min-w-0 w-full bg-transparent text-sm text-slate-500 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div class="mx-4 h-px bg-slate-100 sm:hidden" />

          <!-- Dates -->
          <div
            class="group flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-slate-50 sm:flex-1 sm:rounded-full sm:px-4 sm:border-l sm:border-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-5 w-5 flex-shrink-0 text-teal-700/70"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div class="flex flex-col min-w-0 flex-1">
              <span class="text-xs font-semibold text-slate-900">Dates</span>
              <input v-model="search.checkIn"
                aria-label="Check-in date"
                type="date"
                class="min-w-0 w-full bg-transparent text-sm text-slate-500 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div class="mx-4 h-px bg-slate-100 sm:hidden" />

          <!-- Check out -->
          <div class="group flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-slate-50 sm:flex-1 sm:rounded-full sm:px-4 sm:border-l sm:border-slate-200">
            <div class="flex min-w-0 flex-1 flex-col">
              <span class="text-xs font-semibold text-slate-900">Check out</span>
              <input v-model="search.checkOut" :min="search.checkIn" aria-label="Check-out date" type="date" class="min-w-0 w-full bg-transparent text-sm text-slate-500 focus:outline-none" />
            </div>
          </div>

          <!-- Guests -->
          <div
            class="group flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-slate-50 sm:flex-[.8] sm:rounded-full sm:px-4 sm:border-l sm:border-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-5 w-5 flex-shrink-0 text-teal-700/70"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <div class="flex flex-col min-w-0 flex-1">
              <span class="text-xs font-semibold text-slate-900">Guests</span>
              <select v-model="search.guests" aria-label="Number of guests"
                class="min-w-0 w-full bg-transparent text-sm text-slate-500 placeholder:text-slate-400 focus:outline-none"
              >
                <option :value="1">1 guest</option><option :value="2">2 guests</option>
                <option :value="3">3 guests</option><option :value="4">4 guests</option>
                <option :value="5">5+ guests</option>
              </select>
            </div>
          </div>

          <!-- Search Button -->
          <button
            type="button"
            @click="searchHotels"
            class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-800 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-teal-900 hover:shadow-lg active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 sm:mt-0 sm:w-auto sm:rounded-full sm:m-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              class="h-4 w-4"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search
          </button>
        </div>
      </div>

      <!-- Trust strip -->
      <div
        class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/70 sm:mt-8 sm:gap-x-8"
      >
        <span class="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-3.5 w-3.5 text-amber-300"
          >
            <path
              d="M12 2l2.9 6.26 6.9.6-5.2 4.54L18.2 20 12 16.3 5.8 20l1.6-6.6L2.2 8.86l6.9-.6L12 2z"
            />
          </svg>
          4.8 average rating
        </span>
        <span class="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
        <span>12,000+ verified stays</span>
        <span class="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
        <span>24/7 guest support</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const search = reactive({ location: "", checkIn: "", checkOut: "", guests: 2 });

function searchHotels() {
  router.push({ path: "/hotels", query: {
    ...(search.location && { search: search.location }),
    ...(search.checkIn && { check_in: search.checkIn }),
    ...(search.checkOut && { check_out: search.checkOut }),
    guests: search.guests,
  }});
}
</script>

<style scoped>
.font-display {
  font-family: "Fraunces", ui-serif, Georgia, serif;
}
</style>
