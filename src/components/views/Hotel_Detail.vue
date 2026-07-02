<template>
  <div v-if="hotel" class="min-h-screen bg-gray-50 font-sans">
    <!-- Header / Title -->
    <div class="mx-auto max-w-[1440px] px-4 pt-5 pb-2 sm:px-6 lg:px-10">
      <button
        @click="goBack"
        class="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition mb-4"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Back to Hotels
      </button>
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span
            v-if="hotel.badge"
            class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2"
            :class="hotel.badge.style"
          >
            ⭐ {{ hotel.badge.label }}
          </span>
          <h1 class="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            {{ hotel.name }}
          </h1>
          <p class="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            {{ hotel.location }}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2 sm:mt-1 sm:shrink-0">
          <button
            class="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share
          </button>
          <button
            @click="toggleWishlist"
            class="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <svg
              class="w-4 h-4 transition-colors"
              :fill="hotel.wishlisted ? '#ef4444' : 'none'"
              :stroke="hotel.wishlisted ? '#ef4444' : 'currentColor'"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
              />
            </svg>
            {{ hotel.wishlisted ? "Saved" : "Save" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Photo Gallery -->
    <div class="mx-auto max-w-[1440px] px-4 mt-4 sm:px-6 lg:px-10">
      <div class="h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-96">
        <img
          :src="hotel.image"
          :alt="hotel.name"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="mx-auto mt-8 grid max-w-[1440px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:gap-12 lg:px-10"
    >
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Description -->
        <div>
          <h2 class="text-lg font-bold text-cyan-600 mb-2">
            About {{ hotel.name }}
          </h2>
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ hotel.description }}
          </p>
          <div class="flex items-center gap-3 mt-3">
            <span
              class="flex items-center gap-1 text-xs text-green-600 font-medium border border-green-200 bg-green-50 rounded-full px-2.5 py-1"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              Best Rate Guaranteed
            </span>
            <span
              class="flex items-center gap-1 text-xs text-emerald-600 font-medium border border-emerald-200 bg-emerald-50 rounded-full px-2.5 py-1"
            >
              🌿 Eco-Certified Gold
            </span>
          </div>
        </div>

        <!-- Amenities -->
        <div>
          <h3 class="text-base font-bold text-gray-900 mb-4">
            Curated Amenities
          </h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
              v-for="amenity in amenities"
              :key="amenity.name"
              class="flex items-start gap-3"
            >
              <div
                class="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 flex-shrink-0 mt-0.5"
              >
                <span v-html="amenity.icon"></span>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-800">
                  {{ amenity.name }}
                </p>
                <p class="text-xs text-gray-500 mt-0.5">{{ amenity.sub }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Location -->
        <div>
          <h3 class="text-base font-bold text-gray-900 mb-3">Location</h3>
          <div
            class="rounded-2xl overflow-hidden h-52 bg-gradient-to-br from-amber-100 to-orange-200 relative"
          >
            <!-- Map placeholder -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="w-full h-full bg-cover bg-center opacity-60"
                style="
                  background-image: url(&quot;https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/73.4,4.2,9,0/600x300?access_token=placeholder&quot;);
                "
              ></div>
              <div
                class="absolute w-4 h-4 bg-cyan-500 rounded-full border-2 border-white shadow-lg"
              ></div>
            </div>
            <!-- Speedboat badge -->
            <div
              class="absolute bottom-3 left-3 bg-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-md"
            >
              <div
                class="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center"
              >
                <svg
                  class="w-3.5 h-3.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 14l-9-9-9 9v7h6v-4h6v4h6v-7z" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-bold text-gray-800">Speedboat Access</p>
                <p class="text-xs text-gray-500">
                  45-min from Velana Intl. Airport
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Choose Your Room -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <div>
              <h3 class="text-base font-bold text-gray-900">
                Choose Your Room
              </h3>
              <p class="text-xs text-gray-500">
                Every sanctuary is uniquely curated for absolute serenity.
              </p>
            </div>
            <div class="hidden gap-1.5 sm:flex">
              <button
                class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <svg
                  class="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <svg
                  class="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 xl:grid-cols-3">
            <div
              v-for="room in rooms"
              :key="room.name"
              class="rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition group"
            >
              <div class="relative h-36 overflow-hidden">
                <img
                  :src="room.image"
                  :alt="room.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span
                  v-if="room.badge"
                  :class="room.badgeColor"
                  class="absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                >
                  {{ room.badge }}
                </span>
              </div>
              <div class="p-3">
                <h4 class="text-sm font-bold text-gray-900">{{ room.name }}</h4>
                <p class="text-xs text-gray-500 mt-0.5">{{ room.desc }}</p>
                <div
                  class="flex items-center gap-2 mt-2 text-xs text-gray-500 flex-wrap"
                >
                  <span>📐 {{ room.size }}</span>
                  <span>🛏 {{ room.bed }}</span>
                  <span>👤 Max {{ room.max }}</span>
                </div>
                <div class="flex items-center justify-between mt-3">
                  <div>
                    <span class="text-base font-bold text-gray-900"
                      >${{ room.price }}</span
                    >
                    <span class="text-xs text-gray-500"> /night</span>
                  </div>
                  <button
                    class="bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Booking Card -->
      <div class="col-span-1">
        <div
          class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24"
        >
          <div class="flex items-center justify-between mb-1">
            <div>
              <span class="text-2xl font-bold text-gray-900"
                >${{ hotel.price }}</span
              >
              <span class="text-sm text-gray-500"> /night</span>
            </div>
            <div class="flex items-center gap-1 text-sm">
              <span class="text-yellow-400">★</span>
              <span class="font-semibold text-gray-900">{{
                hotel.rating
              }}</span>
              <span class="text-gray-400 text-xs">(124 reviews)</span>
            </div>
          </div>

          <div class="mt-4 border border-gray-200 rounded-xl overflow-hidden">
            <div class="grid grid-cols-2 divide-x divide-gray-200">
              <div class="p-3">
                <p
                  class="text-xs text-gray-500 font-semibold uppercase tracking-wide"
                >
                  Check-in
                </p>
                <p class="text-sm font-bold text-gray-800 mt-0.5">
                  Oct 24, 2024
                </p>
              </div>
              <div class="p-3">
                <p
                  class="text-xs text-gray-500 font-semibold uppercase tracking-wide"
                >
                  Check-out
                </p>
                <p class="text-sm font-bold text-gray-800 mt-0.5">
                  Oct 30, 2024
                </p>
              </div>
            </div>
            <div
              class="border-t border-gray-200 p-3 flex items-center justify-between"
            >
              <div>
                <p
                  class="text-xs text-gray-500 font-semibold uppercase tracking-wide"
                >
                  Guests
                </p>
                <p class="text-sm font-bold text-gray-800 mt-0.5">
                  2 Adults, 1 Child
                </p>
              </div>
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button
            @click="reserveNow"
            class="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition text-sm"
          >
            Reserve Now
          </button>

          <div class="mt-4 space-y-2 text-sm text-gray-600">
            <div class="flex justify-between">
              <span>${{ hotel.price }} × {{ nights }} nights</span>
              <span class="font-medium text-gray-800">${{ subtotal }}</span>
            </div>
            <div class="flex justify-between">
              <span>Cleaning fee</span>
              <span class="font-medium text-gray-800">${{ cleaningFee }}</span>
            </div>
            <div class="flex justify-between">
              <span>Service fee</span>
              <span class="font-medium text-gray-800">${{ serviceFee }}</span>
            </div>
            <div class="border-t border-gray-100 pt-2 flex justify-between">
              <span class="font-bold text-gray-900">Total</span>
              <span class="font-bold text-gray-900">${{ total }}</span>
            </div>
          </div>

          <p class="text-center text-xs text-gray-400 mt-3">
            You won't be charged yet
          </p>
        </div>
      </div>
    </div>

    <div class="h-16"></div>
  </div>
  <div
    v-else-if="loading"
    class="min-h-screen bg-gray-50 font-sans flex items-center justify-center"
  >
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">Loading hotel...</h1>
    </div>
  </div>
  <div
    v-else
    class="min-h-screen bg-gray-50 font-sans flex items-center justify-center"
  >
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ error ? "Could not load hotel" : "Hotel not found" }}
      </h1>
      <p class="text-sm text-gray-500 mt-2">
        {{ error || "The hotel you are looking for does not exist." }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

import { useRoute, useRouter } from "vue-router";
import hotelApi from "../../service/api/Hotel.js";

const route = useRoute();
const router = useRouter();
const { hotels, loading, error, fetchHotel } = hotelApi.setup();

const hotel = ref(null);

async function loadHotel() {
  const hotelId = Number(route.params.id);
  hotel.value = hotels.value.find((h) => h.id === hotelId) || null;

  try {
    hotel.value = await fetchHotel(hotelId);
  } catch {
    hotel.value = null;
  }
}

// --- Booking Calculation ---
// In a real app, these would come from a date picker
const nights = ref(6);
const cleaningFee = ref(120);
const serviceFee = ref(85);

const subtotal = computed(() =>
  hotel.value ? hotel.value.price * nights.value : 0,
);
const total = computed(
  () => subtotal.value + cleaningFee.value + serviceFee.value,
);

const amenities = [
  {
    name: "Infinity Pool",
    sub: "Temperature controlled",
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>',
  },
  {
    name: "Wellness Spa",
    sub: "Signature therapies",
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
  },
  {
    name: "Fine Dining",
    sub: "3 Michelin concepts",
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>',
  },
  {
    name: "Giga-Wifi",
    sub: "Island-wide coverage",
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>',
  },
  {
    name: "Active Center",
    sub: "Outdoor water yoga",
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
  },
  {
    name: "Moon Bar",
    sub: "Craft cocktails",
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>',
  },
];

const fallbackRooms = [
  {
    name: "Beachfront Sanctuary",
    desc: "Private beach lagoon",
    size: "90m²",
    bed: "King Bed",
    max: 3,
    price: 580,
    badge: "Best Value",
    badgeColor: "bg-blue-500",
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80",
  },
  {
    name: "Overwater Oasis",
    desc: "Infinite horizon views",
    size: "145m²",
    bed: "King Bed",
    max: 2,
    price: 720,
    badge: "Editor's Pick",
    badgeColor: "bg-orange-500",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80",
  },
  {
    name: "Azure Grand Suite",
    desc: "Private pool & butler service",
    size: "330m²",
    bed: "2x King",
    max: 4,
    price: 1450,
    badge: "Ultra Luxury",
    badgeColor: "bg-purple-600",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
  },
];

const rooms = computed(() => {
  if (!hotel.value?.rooms?.length) return fallbackRooms;

  return hotel.value.rooms.map((room) => ({
    name: room.name || room.type || room.room_type || "Room",
    desc: room.description || room.desc || "Comfortable stay",
    size: room.size || room.area || "N/A",
    bed: room.bed || room.bed_type || "Bed",
    max: room.max_guests || room.max || room.capacity || 2,
    price: Number(room.price || room.price_per_night || hotel.value.price || 0),
    badge: room.badge || null,
    badgeColor: room.badgeColor || "bg-blue-500",
    image: room.image || room.image_url || hotel.value.image,
  }));
});

function reserveNow() {
  router.push({
    name: "confirm",
    query: {
      hotelId: hotel.value?.id,
    },
  });
}

function toggleWishlist() {
  if (hotel.value) hotel.value.wishlisted = !hotel.value.wishlisted;
}

function goBack() {
  router.push("/hotels");
}

onMounted(loadHotel);
watch(() => route.params.id, loadHotel);
</script>
