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
              v-for="amenity in displayAmenities"
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
              <div class="map-preview w-full h-full opacity-70"></div>
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
              :key="room.type || room.name"
              class="rounded-2xl overflow-hidden border bg-white hover:shadow-md transition group"
              :class="
                selectedRoomType === room.type
                  ? 'border-cyan-500 ring-2 ring-cyan-100'
                  : 'border-gray-200'
              "
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
                    class="text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                    :class="
                      selectedRoomType === room.type
                        ? 'bg-cyan-700 text-white'
                        : room.available
                          ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                          : 'bg-gray-200 text-gray-400'
                    "
                    :disabled="!room.available"
                    @click="selectRoom(room)"
                  >
                    {{
                      !room.available
                        ? "Unavailable"
                        : selectedRoomType === room.type
                          ? "Selected"
                          : "Select"
                    }}
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
                >${{ selectedRoom?.price || hotel.price }}</span
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
                <input
                  v-model="checkInDate"
                  type="date"
                  :min="minimumCheckIn"
                  class="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-bold text-gray-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  @change="syncCheckoutAfterCheckIn"
                />
              </div>
              <div class="p-3">
                <p
                  class="text-xs text-gray-500 font-semibold uppercase tracking-wide"
                >
                  Check-out
                </p>
                <input
                  v-model="checkOutDate"
                  type="date"
                  :min="minimumCheckOut"
                  class="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-bold text-gray-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  @change="syncNightsFromDates"
                />
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

          <div
            class="mt-4 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3"
          >
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Length of stay
              </p>
              <p class="mt-0.5 text-sm font-bold text-gray-800">
                {{ nights }} night{{ nights === 1 ? "" : "s" }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg font-bold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="nights <= 1"
                aria-label="Remove one night"
                @click="changeNights(-1)"
              >
                -
              </button>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-lg font-bold text-white transition hover:bg-cyan-600"
                aria-label="Add one night"
                @click="changeNights(1)"
              >
                +
              </button>
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
              <span>${{ selectedRoom?.price || hotel.price }} × {{ nights }} nights</span>
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
const selectedRoomType = ref("");

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
const nights = ref(1);
const cleaningFee = ref(120);
const serviceFee = ref(85);

const selectedRoom = computed(() => {
  const selectableRooms = rooms.value.filter((room) => room.available);
  return (
    selectableRooms.find((room) => room.type === selectedRoomType.value) ||
    selectableRooms[0] ||
    null
  );
});

const subtotal = computed(() =>
  hotel.value ? (selectedRoom.value?.price || hotel.value.price) * nights.value : 0,
);
const total = computed(
  () => subtotal.value + cleaningFee.value + serviceFee.value,
);

function toDateInputValue(date) {
  return date.toISOString().slice(0, 10);
}

function dateFromOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

const minimumCheckIn = toDateInputValue(dateFromOffset(1));
const checkInDate = ref(minimumCheckIn);
const checkOutDate = ref(toDateInputValue(dateFromOffset(2)));
const minimumCheckOut = computed(() => {
  const date = new Date(checkInDate.value);
  date.setDate(date.getDate() + 1);
  return toDateInputValue(date);
});

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const detailCheckInLabel = computed(() => formatDate(checkInDate.value));
const detailCheckOutLabel = computed(() => formatDate(checkOutDate.value));

function changeNights(delta) {
  nights.value = Math.min(30, Math.max(1, nights.value + delta));
  const date = new Date(checkInDate.value);
  date.setDate(date.getDate() + nights.value);
  checkOutDate.value = toDateInputValue(date);
}

function syncCheckoutAfterCheckIn() {
  if (checkInDate.value < minimumCheckIn) {
    checkInDate.value = minimumCheckIn;
  }

  if (checkOutDate.value <= checkInDate.value) {
    checkOutDate.value = minimumCheckOut.value;
  }

  syncNightsFromDates();
}

function syncNightsFromDates() {
  if (checkOutDate.value <= checkInDate.value) {
    checkOutDate.value = minimumCheckOut.value;
  }

  const inDate = new Date(checkInDate.value);
  const outDate = new Date(checkOutDate.value);
  const diff = Math.round((outDate - inDate) / (1000 * 60 * 60 * 24));
  nights.value = Math.min(30, Math.max(1, diff || 1));
}

const fallbackAmenities = [
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

const displayAmenities = computed(() => {
  if (!hotel.value?.amenities?.length) return fallbackAmenities;

  return hotel.value.amenities.map((amenity) => ({
    name: typeof amenity === "string" ? amenity : amenity.name || "Amenity",
    sub:
      typeof amenity === "string"
        ? "Included with your stay"
        : amenity.sub || amenity.description || "Included with your stay",
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
  }));
});

const fallbackRooms = [
  {
    type: "standard",
    name: "Beachfront Sanctuary",
    desc: "Private beach lagoon",
    size: "90m²",
    bed: "King Bed",
    max: 3,
    price: 580,
    badge: "Best Value",
    badgeColor: "bg-blue-500",
    available: true,
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80",
  },
  {
    type: "deluxe",
    name: "Overwater Oasis",
    desc: "Infinite horizon views",
    size: "145m²",
    bed: "King Bed",
    max: 2,
    price: 720,
    badge: "Editor's Pick",
    badgeColor: "bg-orange-500",
    available: true,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80",
  },
  {
    type: "suite",
    name: "Azure Grand Suite",
    desc: "Private pool & butler service",
    size: "330m²",
    bed: "2x King",
    max: 4,
    price: 1450,
    badge: "Ultra Luxury",
    badgeColor: "bg-purple-600",
    available: true,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
  },
];

function normalizeRoomType(value) {
  const roomType = String(value || "").toLowerCase();
  const validRoomTypes = ["standard", "deluxe", "suite", "presidential"];

  if (validRoomTypes.includes(roomType)) return roomType;
  return (
    validRoomTypes.find((type) => roomType.includes(type)) ||
    ""
  );
}

const rooms = computed(() => {
  if (!hotel.value?.rooms?.length) return fallbackRooms;

  return hotel.value.rooms
    .map((room) => {
      const name = room.name || room.type || room.room_type || "Room";
      const type =
        normalizeRoomType(room.room_type || room.type) ||
        normalizeRoomType(name);

      return {
        type,
        name,
        desc: room.description || room.desc || "Comfortable stay",
        size: room.size || room.area || "N/A",
        bed: room.bed || room.bed_type || "Bed",
        max: room.max_guests || room.max || room.capacity || 2,
        price: Number(
          room.price ||
            room.price_per_night ||
            room.base_price ||
            hotel.value.price ||
            0,
        ),
        badge: room.badge || null,
        badgeColor: room.badgeColor || "bg-blue-500",
        image: room.image || room.image_url || hotel.value.image,
        available: room.available !== false && room.is_available !== false && room.active !== false,
      };
    })
    .filter((room) => room.type);
});

watch(
  rooms,
  (availableRooms) => {
    if (!availableRooms.length) {
      selectedRoomType.value = "";
      return;
    }

    const selectableRooms = availableRooms.filter((room) => room.available);

    if (!selectableRooms.length) {
      selectedRoomType.value = "";
      return;
    }

    if (!selectableRooms.some((room) => room.type === selectedRoomType.value)) {
      selectedRoomType.value = selectableRooms[0].type;
    }
  },
  { immediate: true },
);

function selectRoom(room) {
  if (!room.available) return;
  selectedRoomType.value = room.type;
}

function reserveNow() {
  const roomType = selectedRoom.value?.available ? selectedRoom.value.type : "";

  if (!roomType) return;

  router.push({
    name: "confirm",
    query: {
      hotelId: hotel.value?.id,
      roomType,
      checkIn: checkInDate.value,
      checkOut: checkOutDate.value,
      adults: 2,
      children: 1,
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

<style scoped>
.map-preview {
  background-color: #dff5f4;
  background-image:
    linear-gradient(28deg, transparent 0 33%, rgba(20, 128, 128, 0.18) 34% 37%, transparent 38%),
    linear-gradient(145deg, transparent 0 42%, rgba(245, 158, 11, 0.2) 43% 47%, transparent 48%),
    linear-gradient(90deg, rgba(15, 118, 110, 0.08) 1px, transparent 1px),
    linear-gradient(0deg, rgba(15, 118, 110, 0.08) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 32px 32px, 32px 32px;
}
</style>
