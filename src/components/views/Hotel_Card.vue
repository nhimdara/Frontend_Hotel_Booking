<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <!-- Page Content -->
    <div class="max-w-[1400px] mx-auto px-6 py-10">
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
              {{ properties.length }}
            </p>
            <p class="mt-1 text-sm text-slate-500">Hotels</p>
          </div>
          <div
            class="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm"
          >
            <p class="text-3xl font-bold text-slate-900">$275</p>
            <p class="mt-1 text-sm text-slate-500">Avg. Price</p>
          </div>
          <div
            class="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm"
          >
            <p class="text-3xl font-bold text-slate-900">4.8★</p>
            <p class="mt-1 text-sm text-slate-500">Guest Rating</p>
          </div>
        </div>
      </div>
      <!-- Filter Bar -->
      <div
        class="border-b border-slate-200 py-3 pb-10 flex items-center gap-3 flex-wrap"
      >
        <button
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
          Filters
        </button>

        <button
          v-for="filter in filters"
          :key="filter"
          class="text-sm text-slate-600 border border-slate-300 rounded-full px-4 py-1.5 hover:border-teal-700 hover:text-teal-800 transition bg-white"
        >
          {{ filter }}
        </button>

        <div class="ml-auto flex items-center gap-2">
          <span
            class="text-xs font-medium uppercase tracking-widest text-slate-400"
            >Sort:</span
          >
          <select
            class="border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
          >
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Guest Rating</option>
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
        <template v-for="item in paginationItems" :key="item">
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
        Showing {{ startIndex + 1 }}–{{
          Math.min(endIndex, properties.length)
        }}
        of {{ properties.length }} hotels
      </p>
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
import { ref, computed } from "vue";

const ITEMS_PER_PAGE = 8;

const filters = [
  "Price Range",
  "Property Type",
  "Guest Rating",
  "Free Cancellation",
  "Pet Friendly",
];

const currentPage = ref(1);
const recommended = computed(() =>
  [...properties.value].sort((a, b) => b.rating - a.rating).slice(0, 6),
);

const properties = ref([
  {
    id: 1,
    name: "The Azure Boutique",
    rating: 4.9,
    location: "1st Arrondissement, Paris",
    description:
      "Experience ultimate Parisian luxury with breathtaking views of the Eiffel Tower and premium amenities.",
    price: 450,
    badge: { label: "Top Rated", style: "bg-amber-400 text-slate-900" },
    wishlisted: true,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80",
  },
  {
    id: 2,
    name: "Le Marais Maison",
    rating: 4.7,
    location: "Le Marais, Paris",
    description:
      "Charming boutique stay tucked away in a historic district with cobblestone streets and artisan cafés.",
    price: 310,
    badge: null,
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=500&q=80",
  },
  {
    id: 3,
    name: "L'Étoile Grand Resort",
    rating: 4.8,
    location: "Champs-Élysées, Paris",
    description:
      "Unrivalled elegance near the Arc de Triomphe. Features an indoor pool, spa, and rooftop bar.",
    price: 590,
    badge: { label: "Pool Access", style: "bg-teal-800 text-white" },
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80",
  },
  {
    id: 4,
    name: "Canal Saint-Martin Loft",
    rating: 4.6,
    location: "10th Arrondissement, Paris",
    description:
      "Live like a local in this sun-drenched industrial loft overlooking the iconic canal.",
    price: 275,
    badge: null,
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=500&q=80",
  },
  {
    id: 5,
    name: "Seine View Residence",
    rating: 4.9,
    location: "Quai d'Orsay, Paris",
    description:
      "Wake up to the sounds of the Seine. A rare riverside gem with private terrace and butler service.",
    price: 520,
    badge: null,
    wishlisted: true,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80",
  },
  {
    id: 6,
    name: "Montmartre Heights",
    rating: 4.5,
    location: "Montmartre, Paris",
    description:
      "Perched high on the hill of Montmartre, offering the best sunset views over the Paris skyline.",
    price: 385,
    badge: null,
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&q=80",
  },
  {
    id: 7,
    name: "Palais Royal Suites",
    rating: 4.8,
    location: "1st Arrondissement, Paris",
    description:
      "Steps from the Louvre, this palatial hotel blends 18th-century charm with modern luxury.",
    price: 680,
    badge: { label: "New", style: "bg-emerald-500 text-white" },
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80",
  },
  {
    id: 8,
    name: "Saint-Germain Studio",
    rating: 4.6,
    location: "6th Arrondissement, Paris",
    description:
      "Bohemian chic meets Parisian elegance in this beautifully styled studio near the Luxembourg Gardens.",
    price: 340,
    badge: null,
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80",
  },
  {
    id: 9,
    name: "Bastille Urban Hotel",
    rating: 4.4,
    location: "11th Arrondissement, Paris",
    description:
      "A vibrant, design-led hotel in the heart of the trendy Bastille neighbourhood.",
    price: 220,
    badge: { label: "Best Value", style: "bg-blue-500 text-white" },
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80",
  },
  {
    id: 10,
    name: "Opéra Prestige",
    rating: 4.7,
    location: "9th Arrondissement, Paris",
    description:
      "Grand Belle Époque interiors and a rooftop terrace overlooking the iconic Opéra Garnier.",
    price: 475,
    badge: null,
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80",
  },
  {
    id: 11,
    name: "Trocadéro Tower View",
    rating: 4.9,
    location: "16th Arrondissement, Paris",
    description:
      "Iconic Eiffel Tower views from every room. The most photographed hotel balcony in all of Paris.",
    price: 720,
    badge: { label: "Top Rated", style: "bg-amber-400 text-slate-900" },
    wishlisted: true,
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&q=80",
  },
  {
    id: 12,
    name: "Pigalle Boutique Inn",
    rating: 4.3,
    location: "18th Arrondissement, Paris",
    description:
      "Artsy and eclectic, this boutique inn sits in the creative heart of Pigalle.",
    price: 195,
    badge: null,
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=500&q=80",
  },
  {
    id: 13,
    name: "Invalides Heritage House",
    rating: 4.6,
    location: "7th Arrondissement, Paris",
    description:
      "A refined retreat steps from the golden dome of Les Invalides, perfect for history lovers.",
    price: 430,
    badge: null,
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&q=80",
  },
  {
    id: 14,
    name: "République Modern Stay",
    rating: 4.5,
    location: "3rd Arrondissement, Paris",
    description:
      "A sleek, contemporary hotel for the design-conscious traveller seeking a central Paris base.",
    price: 295,
    badge: null,
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=500&q=80",
  },
  {
    id: 15,
    name: "Île Saint-Louis Retreat",
    rating: 4.8,
    location: "4th Arrondissement, Paris",
    description:
      "A hidden gem on the tranquil Île Saint-Louis, surrounded by the Seine on all sides.",
    price: 560,
    badge: { label: "Hidden Gem", style: "bg-purple-500 text-white" },
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=500&q=80",
  },
  {
    id: 16,
    name: "Bois de Boulogne Lodge",
    rating: 4.4,
    location: "16th Arrondissement, Paris",
    description:
      "A peaceful forest-adjacent retreat for those who want nature and city in perfect balance.",
    price: 265,
    badge: null,
    wishlisted: false,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&q=80",
  },
]);

// Computed
const totalPages = computed(() =>
  Math.ceil(properties.value.length / ITEMS_PER_PAGE),
);

const startIndex = computed(() => (currentPage.value - 1) * ITEMS_PER_PAGE);
const endIndex = computed(() => startIndex.value + ITEMS_PER_PAGE);

const paginatedProperties = computed(() =>
  properties.value.slice(startIndex.value, endIndex.value),
);

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
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleWishlist(property) {
  property.wishlisted = !property.wishlisted;
}
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
