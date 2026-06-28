<template>
  <div id="hotels" class="min-h-screen bg-slate-50 font-sans">
    <!-- Page Content -->
    <div class="max-w-[1400px] mx-auto px-6 py-10">
      <button
        type="button"
        class="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-700 hover:text-teal-800"
        @click="emit('back-home')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back Home
      </button>

      <!-- Header -->
      <div
        class="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
      >
        <!-- Left -->
        <div>
          <div class="items-center gap-2 mb-3">
            <span
              class="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100"
            >
              Luxury Collection
            </span>
          </div>
          <h1
            class="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900"
          >
            Discover Your Perfect Stay
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Browse from
            <span class="font-semibold text-teal-700"
              >{{ properties.length }} carefully selected hotels</span
            >
            with exclusive deals, premium amenities, and flexible booking
            options for your trip.
          </p>
        </div>

        <!-- Right -->
        <div class="grid grid-cols-3 gap-4">
          <div
            class="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm"
          >
            <p class="text-3xl font-bold text-slate-900">
              {{ filteredProperties.length }}
            </p>
            <p class="mt-1 text-sm text-slate-500">Matches</p>
          </div>
          <div
            class="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm"
          >
            <p class="text-3xl font-bold text-slate-900">${{ averagePrice }}</p>
            <p class="mt-1 text-sm text-slate-500">Avg. Price</p>
          </div>
          <div
            class="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm"
          >
            <p class="text-3xl font-bold text-slate-900">
              {{ averageRating }}★
            </p>
            <p class="mt-1 text-sm text-slate-500">Guest Rating</p>
          </div>
        </div>
      </div>
      <!-- Filter Bar -->
      <div
        class="border-b border-slate-200 py-3 pb-10 flex items-center gap-3 flex-wrap"
      >
        <button
          @click="setFilter('all')"
          class="flex items-center gap-2 bg-teal-800 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-teal-900 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4h18M7 10h10M11 16h2"
            />
          </svg>
          All Stays
        </button>

        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="setFilter(filter.value)"
          class="text-sm border rounded-full px-4 py-1.5 transition"
          :class="
            activeFilter === filter.value
              ? 'border-teal-800 bg-teal-50 text-teal-900'
              : 'border-slate-300 bg-white text-slate-600 hover:border-teal-700 hover:text-teal-800'
          "
        >
          {{ filter.label }}
        </button>

        <div class="ml-auto flex items-center gap-2">
          <span
            class="text-xs font-medium uppercase tracking-widest text-slate-400"
            >Sort:</span
          >
          <select
            v-model="sortOption"
            class="border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Guest Rating</option>
          </select>
        </div>
      </div>

      <!-- Property Grid -->
      <div
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <article
          v-for="property in paginatedProperties"
          :key="property.id + '-' + property.name"
          class="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-lg flex flex-col"
        >
          <div class="relative aspect-[5/4] overflow-hidden">
            <img
              :src="property.image"
              :alt="property.name"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span
              v-if="property.badge"
              class="absolute left-3.5 top-3.5 rounded-full px-3 py-1 text-xs font-semibold"
              :class="property.badge.style"
            >
              {{ property.badge.label }}
            </span>
            <button
              type="button"
              aria-label="Save to favorites"
              class="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
              @click="toggleWishlist(property)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-4 w-4 transition-colors"
                :fill="property.wishlisted ? '#ef4444' : 'none'"
                :stroke="property.wishlisted ? '#ef4444' : 'currentColor'"
                stroke-width="2"
              >
                <path
                  d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
                />
              </svg>
            </button>
          </div>

          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-start justify-between gap-2">
              <h3
                class="text-base font-semibold text-slate-900 leading-snug line-clamp-1"
              >
                {{ property.name }}
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
                {{ property.rating.toFixed(2) }}
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
              {{ property.location }}
            </p>

            <p class="mt-3 text-sm text-slate-500 line-clamp-2 flex-1">
              {{ property.description }}
            </p>

            <div
              class="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-slate-100"
            >
              <div>
                <p
                  class="text-[11px] uppercase tracking-wide text-slate-400 font-medium"
                >
                  Starting from
                </p>
                <p class="text-lg font-semibold text-teal-800">
                  ${{ property.price
                  }}<span class="text-sm font-normal text-slate-400">
                    /night</span
                  >
                </p>
              </div>
              <button
                type="button"
                class="shrink-0 rounded-xl bg-teal-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-900 active:scale-95"
                @click="openProperty(property)"
              >
                View Details
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div class="mt-14 flex items-center justify-center gap-2">
        <!-- Previous -->
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-teal-700 hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Page Numbers -->
        <template
          v-for="(item, index) in paginationItems"
          :key="`${item}-${index}`"
        >
          <span
            v-if="item === '...'"
            class="flex h-10 w-10 items-center justify-center text-sm text-slate-400 select-none"
          >
            …
          </span>
          <button
            v-else
            @click="goToPage(item)"
            class="flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-medium shadow-sm transition"
            :class="
              currentPage === item
                ? 'bg-teal-800 border-teal-800 text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-teal-700 hover:text-teal-800'
            "
          >
            {{ item }}
          </button>
        </template>

        <!-- Next -->
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-teal-700 hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Page info -->
      <p class="mt-4 text-center text-sm text-slate-400">
        Showing {{ filteredProperties.length ? startIndex + 1 : 0 }}-{{
          Math.min(endIndex, filteredProperties.length)
        }}
        of {{ filteredProperties.length }} hotels
      </p>
      <div
        v-if="!filteredProperties.length"
        class="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"
      >
        <h3 class="text-lg font-semibold text-slate-900">No hotels found</h3>
        <p class="mt-2 text-sm text-slate-500">
          Try another filter to see more available stays.
        </p>
      </div>
      <!-- Most Recommended Section -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="text-2xl font-bold text-slate-900">Most Recommended</h2>
            <p class="text-sm text-slate-500 mt-1">
              Top picks loved by our guests
            </p>
          </div>
          <a
            href="#"
            @click.prevent="setFilter('top-rated')"
            class="text-sm font-semibold text-teal-800 hover:text-teal-900 transition flex items-center gap-1"
          >
            See all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div class="flex gap-5 overflow-x-auto pb-3 scrollbar-hide pr-6">
          <article
            v-for="property in recommended"
            :key="'rec-' + property.id"
            class="group flex-shrink-0 w-80 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-lg flex flex-col"
          >
            <div class="relative aspect-[5/4] overflow-hidden">
              <img
                :src="property.image"
                :alt="property.name"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span
                v-if="property.badge"
                class="absolute left-3.5 top-3.5 rounded-full px-3 py-1 text-xs font-semibold"
                :class="property.badge.style"
              >
                {{ property.badge.label }}
              </span>
              <button
                type="button"
                aria-label="Save to favorites"
                class="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
                @click="toggleWishlist(property)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-4 w-4 transition-colors"
                  :fill="property.wishlisted ? '#ef4444' : 'none'"
                  :stroke="property.wishlisted ? '#ef4444' : 'currentColor'"
                  stroke-width="2"
                >
                  <path
                    d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
                  />
                </svg>
              </button>
            </div>

            <div class="p-5 flex flex-col flex-1">
              <div class="flex items-start justify-between gap-2">
                <h3
                  class="text-base font-semibold text-slate-900 leading-snug line-clamp-1"
                >
                  {{ property.name }}
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
                  {{ property.rating.toFixed(2) }}
                </span>
              </div>

              <p
                class="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500"
              >
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
                {{ property.location }}
              </p>

              <div
                class="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-slate-100"
              >
                <div>
                  <p
                    class="text-[11px] uppercase tracking-wide text-slate-400 font-medium"
                  >
                    Starting from
                  </p>
                  <p class="text-lg font-semibold text-teal-800">
                    ${{ property.price
                    }}<span class="text-sm font-normal text-slate-400">
                      /night</span
                    >
                  </p>
                </div>
                <button
                  type="button"
                  class="shrink-0 rounded-xl bg-teal-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-900 active:scale-95"
                >
                  View Details
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import hotelApi from "../../service/api/Hotel.js";

const emit = defineEmits(["back-home"]);

const ITEMS_PER_PAGE = 8;

const { hotels: properties } = hotelApi.setup();

const filters = [
  { label: "Top Rated", value: "top-rated" },
  { label: "Under $300", value: "under-300" },
  { label: "Luxury", value: "luxury" },
  { label: "Boutique", value: "boutique" },
  { label: "Eiffel View", value: "eiffel-view" },
];

const currentPage = ref(1);
const activeFilter = ref("all");
const sortOption = ref("recommended");
const selectedProperty = ref(null);
const recommended = computed(() =>
  [...properties.value].sort((a, b) => b.rating - a.rating).slice(0, 6),
);

// Computed
const filteredProperties = computed(() => {
  const filtered = properties.value.filter((property) => {
    if (activeFilter.value === "all") return true;
    if (activeFilter.value === "top-rated") return property.rating >= 4.8;
    if (activeFilter.value === "under-300") return property.price < 300;
    if (activeFilter.value === "luxury") return property.price >= 500;
    if (activeFilter.value === "boutique") {
      return property.name.toLowerCase().includes("boutique");
    }
    if (activeFilter.value === "eiffel-view") {
      return (
        property.name.toLowerCase().includes("tower") ||
        property.description.toLowerCase().includes("eiffel")
      );
    }
    return true;
  });

  return filtered.sort((a, b) => {
    if (sortOption.value === "price-low") return a.price - b.price;
    if (sortOption.value === "price-high") return b.price - a.price;
    if (sortOption.value === "rating") return b.rating - a.rating;
    return b.rating - a.rating || a.price - b.price;
  });
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProperties.value.length / ITEMS_PER_PAGE)),
);

const startIndex = computed(() => (currentPage.value - 1) * ITEMS_PER_PAGE);
const endIndex = computed(() => startIndex.value + ITEMS_PER_PAGE);

const paginatedProperties = computed(() =>
  filteredProperties.value.slice(startIndex.value, endIndex.value),
);

const averagePrice = computed(() => {
  if (!filteredProperties.value.length) return 0;
  const total = filteredProperties.value.reduce(
    (sum, property) => sum + property.price,
    0,
  );
  return Math.round(total / filteredProperties.value.length);
});

const averageRating = computed(() => {
  if (!filteredProperties.value.length) return "0.0";
  const total = filteredProperties.value.reduce(
    (sum, property) => sum + property.rating,
    0,
  );
  return (total / filteredProperties.value.length).toFixed(1);
});

const paginationItems = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else if (current <= 3) {
    pages.push(1, 2, 3, "...", total);
  } else if (current >= total - 2) {
    pages.push(1, "...", total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current, "...", total);
  }

  return pages;
});

// Methods
function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  document.getElementById("hotels")?.scrollIntoView({ behavior: "smooth" });
}

function toggleWishlist(property) {
  property.wishlisted = !property.wishlisted;
}

function setFilter(filter) {
  activeFilter.value = filter;
  currentPage.value = 1;
}

function openProperty(property) {
  selectedProperty.value = property;
}

function closeProperty() {
  selectedProperty.value = null;
}

watch(sortOption, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
