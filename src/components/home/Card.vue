<template>
  <section class="mx-auto max-w-[1440px] px-6 py-20 lg:px-12">
    <div class="mb-10 flex items-end justify-between">
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
        class="hidden items-center gap-1.5 text-sm font-semibold text-teal-800 transition-colors hover:text-teal-900 sm:flex"
      >
        View all properties
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

    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="stay in displayedStays"
        :key="stay.id"
        class="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-lg"
      >
        <div class="relative aspect-[5/4] overflow-hidden">
          <img
            :src="stay.image"
            :alt="stay.name"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
            aria-label="Save to favorites"
            class="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-4 w-4"
            >
              <path
                d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
              />
            </svg>
          </button>
        </div>

        <div class="p-5">
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
              class="h-3.5 w-3.5"
            >
              <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {{ stay.location }}
          </p>

          <p class="mt-4 text-base font-semibold text-teal-800">
            ${{ stay.price }}
            <span class="font-normal text-slate-400">/ night</span>
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const stays = [
  {
    id: 1,
    name: "Forest Edge Retreat",
    location: "Bergen, Norway",
    price: 320,
    rating: 4.92,
    image:
      "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=600&auto=format&fit=crop",
    badge: { label: "Top Rated", style: "bg-amber-400 text-slate-900" },
  },
  {
    id: 2,
    name: "The Azure Boutique",
    location: "Paris, France",
    price: 450,
    rating: 4.88,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 3,
    name: "Red Rock Sanctuary",
    location: "Arizona, USA",
    price: 285,
    rating: 4.95,
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop",
    badge: { label: "New Arrival", style: "bg-teal-800 text-white" },
  },
  {
    id: 4,
    name: "Zenith City Loft",
    location: "Tokyo, Japan",
    price: 510,
    rating: 4.85,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop",
    badge: null,
  },
];

// Computed property to limit to 4 cards
const displayedStays = stays.slice(0, 4);
</script>

<style scoped>
.font-display {
  font-family: "Fraunces", ui-serif, Georgia, serif;
}
</style>
