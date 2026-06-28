<template>
  <div class="min-h-screen bg-[#f5f9f9] font-sans antialiased">
    <!-- ── PAGE HEADER ───────────────────────────────────────── -->
    <div class="max-w-6xl mx-auto px-8 mt-7">
      <h1
        class="font-serif text-4xl font-normal text-[#111c1c] tracking-tight leading-none"
      >
        Confirm & Pay
      </h1>
      <p class="mt-1.5 text-[15px] text-[#3a4a4a]">
        You're almost there — review your details and scan to complete payment.
      </p>
    </div>

    <!-- ── BODY GRID ─────────────────────────────────────────── -->
    <div
      class="max-w-6xl mx-auto px-8 mt-8 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start"
    >
      <!-- LEFT COLUMN -->
      <div class="space-y-5">
        <!-- ── STEP 1: Guest Info ──────────────────────────── -->
        <div
          class="bg-white border border-[#dde8e8] rounded-2xl shadow-sm overflow-hidden"
        >
          <div
            class="px-7 py-5 border-b border-[#dde8e8] flex items-center gap-3.5"
          >
            <div
              class="w-8 h-8 rounded-full bg-[#0d5c5c] text-white text-[13px] font-semibold flex items-center justify-center flex-shrink-0"
            >
              1
            </div>
            <span
              class="text-[17px] font-semibold text-[#111c1c] tracking-tight"
              >Guest Information</span
            >
          </div>
          <div class="p-7 space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label
                  class="text-[11px] font-semibold tracking-widest uppercase text-[#94a6a6]"
                  >Full Name</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  class="w-full h-12 px-4 border-[1.5px] border-[#dde8e8] rounded-md text-[15px] text-[#111c1c] placeholder-[#94a6a6] outline-none transition-all focus:border-[#148080] focus:ring-2 focus:ring-[#148080]/10"
                />
              </div>
              <div class="space-y-1.5">
                <label
                  class="text-[11px] font-semibold tracking-widest uppercase text-[#94a6a6]"
                  >Email Address</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="john.doe@example.com"
                  class="w-full h-12 px-4 border-[1.5px] border-[#dde8e8] rounded-md text-[15px] text-[#111c1c] placeholder-[#94a6a6] outline-none transition-all focus:border-[#148080] focus:ring-2 focus:ring-[#148080]/10"
                />
              </div>
            </div>
            <div class="space-y-1.5">
              <label
                class="text-[11px] font-semibold tracking-widest uppercase text-[#94a6a6]"
                >Phone Number</label
              >
              <div class="flex gap-2">
                <div
                  class="h-12 w-16 flex items-center justify-center border-[1.5px] border-[#dde8e8] rounded-md text-[15px] font-medium text-[#3a4a4a] bg-[#f5f9f9] flex-shrink-0"
                >
                  +1
                </div>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  class="flex-1 h-12 px-4 border-[1.5px] border-[#dde8e8] rounded-md text-[15px] text-[#111c1c] placeholder-[#94a6a6] outline-none transition-all focus:border-[#148080] focus:ring-2 focus:ring-[#148080]/10"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- ── STEP 2: Scan to Pay ──────────────────────────── -->
        <div
          class="bg-white border border-[#dde8e8] rounded-2xl shadow-sm overflow-hidden"
        >
          <div
            class="px-7 py-5 border-b border-[#dde8e8] flex items-center gap-3.5"
          >
            <div
              class="w-8 h-8 rounded-full bg-[#0d5c5c] text-white text-[13px] font-semibold flex items-center justify-center flex-shrink-0"
            >
              2
            </div>
            <span
              class="text-[17px] font-semibold text-[#111c1c] tracking-tight"
              >Scan to Pay</span
            >
            <span
              class="ml-auto flex items-center gap-1.5 text-[12px] font-medium text-[#148080]"
            >
              <span class="relative flex h-2 w-2">
                <span
                  class="absolute inline-flex h-full w-full rounded-full bg-[#148080] opacity-75 animate-ping"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-2 w-2 bg-[#148080]"
                ></span>
              </span>
              Waiting for scan
            </span>
          </div>

          <div class="p-7">
            <div
              class="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-7 items-center"
            >
              <!-- QR block -->
              <div class="mx-auto sm:mx-0 relative">
                <div
                  class="p-5 border-[1.5px] border-[#dde8e8] rounded-2xl bg-white"
                >
                  <svg
                    viewBox="0 0 120 120"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-48 h-48"
                  >
                    <rect x="8" y="8" width="30" height="30" rx="4" fill="#0d5c5c" />
                    <rect x="12" y="12" width="22" height="22" rx="2" fill="#fff" />
                    <rect x="16" y="16" width="14" height="14" rx="1" fill="#0d5c5c" />
                    <rect x="82" y="8" width="30" height="30" rx="4" fill="#0d5c5c" />
                    <rect x="86" y="12" width="22" height="22" rx="2" fill="#fff" />
                    <rect x="90" y="16" width="14" height="14" rx="1" fill="#0d5c5c" />
                    <rect x="8" y="82" width="30" height="30" rx="4" fill="#0d5c5c" />
                    <rect x="12" y="86" width="22" height="22" rx="2" fill="#fff" />
                    <rect x="16" y="90" width="14" height="14" rx="1" fill="#0d5c5c" />
                    <rect x="46" y="8" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="54" y="8" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="62" y="8" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="70" y="8" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="46" y="16" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="62" y="16" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="46" y="24" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="54" y="24" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="70" y="24" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="8" y="46" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="16" y="46" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="32" y="46" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="46" y="46" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="62" y="46" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="78" y="46" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="94" y="46" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="106" y="46" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="8" y="54" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="24" y="54" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="46" y="54" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="62" y="54" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="78" y="54" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="94" y="54" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="106" y="54" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="8" y="62" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="24" y="62" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="54" y="62" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="70" y="62" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="86" y="62" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="106" y="62" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="8" y="70" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="24" y="70" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="46" y="70" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="78" y="70" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="106" y="70" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="46" y="86" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="62" y="86" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="78" y="86" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="94" y="86" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="46" y="94" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="62" y="94" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="78" y="94" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="106" y="94" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="46" y="106" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="70" y="106" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="86" y="106" width="6" height="6" rx="1" fill="#0d5c5c" />
                    <rect x="50" y="50" width="20" height="20" rx="4" fill="#148080" />
                    <circle cx="60" cy="60" r="5" fill="#fff" />
                  </svg>
                </div>
                <!-- Amount chip overlapping the card corner -->
                <div
                  class="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 bg-[#0d5c5c] text-white text-[13px] font-semibold rounded-full shadow-md whitespace-nowrap"
                >
                  {{ totalAmount }}
                </div>
              </div>

              <!-- Instructions -->
              <div class="space-y-4 text-center sm:text-left">
                <div>
                  <p class="text-[18px] font-semibold text-[#111c1c] mb-1.5">
                    Open your banking app and scan
                  </p>
                  <p class="text-[14px] text-[#3a4a4a] leading-relaxed">
                    Point your phone's camera or the
                    <a href="#" class="text-[#148080] font-medium hover:underline"
                      >VOYAGE</a
                    >
                    app at the code. We'll confirm automatically the moment
                    payment is authorized — no need to refresh.
                  </p>
                </div>

                <ol class="space-y-2 text-[13px] text-[#3a4a4a]">
                  <li class="flex items-center gap-2.5">
                    <span
                      class="w-5 h-5 rounded-full bg-[#e6f4f4] text-[#0d5c5c] text-[11px] font-bold flex items-center justify-center flex-shrink-0"
                      >1</span
                    >
                    Open your mobile banking app
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span
                      class="w-5 h-5 rounded-full bg-[#e6f4f4] text-[#0d5c5c] text-[11px] font-bold flex items-center justify-center flex-shrink-0"
                      >2</span
                    >
                    Scan the code above
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span
                      class="w-5 h-5 rounded-full bg-[#e6f4f4] text-[#0d5c5c] text-[11px] font-bold flex items-center justify-center flex-shrink-0"
                      >3</span
                    >
                    Approve the payment on your phone
                  </li>
                </ol>

                <div
                  class="flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-1.5 pt-1"
                >
                  <div
                    v-for="t in trustBadges"
                    :key="t.label"
                    class="flex items-center gap-1.5 text-[12px] text-[#94a6a6] font-medium"
                  >
                    <component :is="t.icon" class="w-3.5 h-3.5 text-[#148080]" />
                    {{ t.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── INFO BANNER ─────────────────────────────────── -->
        <div
          class="flex items-start gap-3 px-4 py-3.5 bg-gradient-to-r from-[#e6f4f4] to-[#fdf6e3] border border-[#dde8e8] rounded-xl text-[14px] text-[#3a4a4a] leading-relaxed"
        >
          <svg
            class="w-4.5 h-4.5 text-[#148080] mt-0.5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            Your booking is held for <strong>{{ formattedTime }}</strong
            >. Once payment is authorized, this page will automatically refresh
            with your confirmation.
          </span>
        </div>
      </div>

      <!-- ── RIGHT COLUMN: Summary Card ─────────────────────── -->
      <div class="lg:sticky lg:top-[84px]">
        <!-- Loading state -->
        <div
          v-if="isLoading"
          class="bg-white border border-[#dde8e8] rounded-2xl shadow-sm p-10 flex flex-col items-center justify-center gap-3 text-[#94a6a6]"
        >
          <svg class="w-6 h-6 animate-spin text-[#148080]" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span class="text-[14px]">Loading your booking…</span>
        </div>

        <!-- Error / not-found state -->
        <div
          v-else-if="!hotel"
          class="bg-white border border-[#dde8e8] rounded-2xl shadow-sm p-7 text-center"
        >
          <p class="text-[15px] font-semibold text-[#111c1c] mb-1.5">
            We couldn't find this booking
          </p>
          <p class="text-[13px] text-[#94a6a6] mb-4">
            The hotel you tried to reserve is missing or no longer available.
            Please go back and select it again.
          </p>
          <button
            @click="goBack"
            class="px-4 py-2.5 bg-[#0d5c5c] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0a4a4a] transition-colors"
          >
            Back to hotels
          </button>
        </div>

        <!-- Real summary card -->
        <div
          v-else
          class="bg-white border border-[#dde8e8] rounded-2xl shadow-sm overflow-hidden"
        >
          <!-- Resort hero -->
          <div
            class="relative h-52 flex items-end p-5 overflow-hidden"
            :style="heroStyle"
          >
            <!-- Dark overlay so text stays readable on any photo -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>

            <!-- Rating pill -->
            <div
              v-if="hotel.rating"
              class="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-[13px] font-semibold z-10"
            >
              <span class="text-[#ffd700]">★</span> {{ hotel.rating }}
            </div>

            <!-- Resort info -->
            <div class="relative z-10">
              <p class="font-serif text-xl text-white leading-tight">
                {{ hotel.name || "Hotel" }}
              </p>
              <p class="flex items-center gap-1 mt-1 text-[13px] text-white/85">
                <svg
                  class="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {{ hotel.location || hotel.address || "Location unavailable" }}
              </p>
            </div>
          </div>

          <!-- Photo thumbnails (uses hotel.images if available, else hero image, else falls back) -->
          <div v-if="photoThumbs.length" class="grid grid-cols-4 gap-1.5 p-3 pb-0">
            <div
              v-for="(thumb, i) in photoThumbs"
              :key="i"
              class="aspect-square rounded-lg overflow-hidden bg-[#e6f4f4]"
            >
              <img
                :src="thumb"
                :alt="`${hotel.name} photo ${i + 1}`"
                class="w-full h-full object-cover"
                @error="onThumbError"
              />
            </div>
          </div>

          <!-- Booking details -->
          <div class="p-6 space-y-4">
            <!-- Dates -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-[11px] font-semibold tracking-widest uppercase text-[#94a6a6] mb-1">
                  Check-in
                </p>
                <p class="font-serif text-[22px] text-[#111c1c] leading-none">
                  {{ checkInLabel }}
                </p>
                <p class="text-[12px] text-[#94a6a6] mt-1">From 3:00 PM</p>
              </div>
              <div>
                <p class="text-[11px] font-semibold tracking-widest uppercase text-[#94a6a6] mb-1">
                  Check-out
                </p>
                <p class="font-serif text-[22px] text-[#111c1c] leading-none">
                  {{ checkOutLabel }}
                </p>
                <p class="text-[12px] text-[#94a6a6] mt-1">By 11:00 AM</p>
              </div>
            </div>

            <!-- Guests row -->
            <div
              class="flex items-center gap-2 px-3.5 py-2.5 bg-[#f2fafa] rounded-lg text-[14px] text-[#3a4a4a]"
            >
              <svg
                class="w-4 h-4 text-[#148080]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
              {{ guestSummary }} — {{ nights }} Night{{ nights === 1 ? "" : "s" }}
            </div>

            <hr class="border-[#dde8e8]" />

            <!-- Price breakdown -->
            <div class="space-y-2.5">
              <div
                v-for="line in priceLines"
                :key="line.label"
                class="flex justify-between items-baseline text-[14px]"
              >
                <span class="text-[#3a4a4a]">{{ line.label }}</span>
                <span class="font-medium text-[#111c1c]">{{ line.value }}</span>
              </div>
            </div>

            <!-- Total -->
            <div
              class="flex justify-between items-end pt-4 border-t-[1.5px] border-[#dde8e8]"
            >
              <span class="text-[16px] font-bold text-[#111c1c]">Total Amount</span>
              <div class="text-right">
                <p class="font-serif text-[28px] text-[#0d5c5c] leading-none">
                  {{ totalAmount }}
                </p>
                <p class="text-[11px] text-[#94a6a6] mt-0.5">All taxes included</p>
              </div>
            </div>

            <!-- Rewards -->
            <div
              class="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#fdf6e3] to-[#fffbf0] border border-[#e8d9a0] rounded-xl text-[13px] text-[#3a4a4a]"
            >
              <span class="text-[#c9a84c] text-base">✦</span>
              <span
                >Earn
                <strong class="text-[#9a6f00]">{{ rewardPoints }} StayEasy Points</strong>
                with this booking</span
              >
            </div>

            <!-- Status footnote -->
            <div
              class="flex items-center justify-center gap-2 pt-1 text-[13px] text-[#94a6a6]"
            >
              <svg
                class="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              No card details ever leave your banking app
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import hotelApi from "../../service/api/Hotel.js";

const route = useRoute();
const router = useRouter();
const { hotels, fetchHotels } = hotelApi.setup();

// ── LOADING STATE ────────────────────────────────────────────
// hotels.value can be empty on a hard refresh / direct link because
// the list hasn't loaded yet. We track that explicitly instead of
// silently rendering placeholder data.
const isLoading = ref(true);

// ── HOTEL ID (read once, then keep an internal ref in case query changes) ──
const hotelId = computed(() => {
  const raw = route.query.hotelId;
  const parsed = parseInt(raw, 10);
  return Number.isNaN(parsed) ? null : parsed;
});

// ── BOOKING PARAMS FROM ROUTE (passed from the detail/reserve flow) ──
// These come through as query params set by the "Reserve Now" button on
// the detail page (see fix note below). Fall back to sane defaults if
// any are missing so the page never crashes.
const checkIn = computed(() => route.query.checkIn || null);
const checkOut = computed(() => route.query.checkOut || null);
const adults = computed(() => parseInt(route.query.adults, 10) || 2);
const children = computed(() => parseInt(route.query.children, 10) || 0);

const hotel = computed(() => {
  if (!hotelId.value) return null;
  return hotels.value.find((h) => h.id === hotelId.value) || null;
});

// ── LOAD DATA ─────────────────────────────────────────────────
async function loadHotelData() {
  isLoading.value = true;
  try {
    // If the hotels list is empty (e.g. user landed here directly, or
    // refreshed the page), fetch it instead of leaving `hotel` as undefined.
    if (!hotels.value || hotels.value.length === 0) {
      if (typeof fetchHotels === "function") {
        await fetchHotels();
      }
    }
  } catch (err) {
    console.error("Failed to load hotel data:", err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadHotelData);

// Re-run if the user navigates here again with a different hotelId
watch(
  () => route.query.hotelId,
  () => {
    loadHotelData();
  },
);

function goBack() {
  router.push({ name: "hotels" }); // adjust route name to match your router config
}

// ── NIGHTS (computed from real dates if present, else fallback) ────
const nights = computed(() => {
  if (checkIn.value && checkOut.value) {
    const inDate = new Date(checkIn.value);
    const outDate = new Date(checkOut.value);
    const diff = Math.round((outDate - inDate) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }
  return 7; // fallback used only if no dates were passed
});

function formatDateLabel(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const checkInLabel = computed(() => formatDateLabel(checkIn.value) || "Oct 12");
const checkOutLabel = computed(() => formatDateLabel(checkOut.value) || "Oct 17");

const guestSummary = computed(() => {
  const a = adults.value;
  const c = children.value;
  let summary = `${a} Adult${a === 1 ? "" : "s"}`;
  if (c > 0) summary += `, ${c} Child${c === 1 ? "" : "ren"}`;
  return summary;
});

// ── PRICING (driven by hotel.price, real field, not hardcoded) ─────
const subtotal = computed(() => {
  return hotel.value?.price ? hotel.value.price * nights.value : 0;
});

const serviceFee = 250;
const taxRate = 0.0595; // adjust to your real tax logic if different

const estimatedTaxes = computed(() => {
  return Math.round(subtotal.value * taxRate * 100) / 100;
});

const priceLines = computed(() => [
  {
    label: `${nights.value} night${nights.value === 1 ? "" : "s"} × $${(hotel.value?.price ?? 0).toFixed(2)}`,
    value: `$${subtotal.value.toFixed(2)}`,
  },
  { label: "Service & Amenity Fees", value: `$${serviceFee.toFixed(2)}` },
  { label: "Estimated Taxes", value: `$${estimatedTaxes.value.toFixed(2)}` },
]);

const totalAmount = computed(() => {
  return `$${(subtotal.value + serviceFee + estimatedTaxes.value).toFixed(2)}`;
});

const rewardPoints = computed(() => {
  const total = subtotal.value + serviceFee + estimatedTaxes.value;
  return Math.round(total * 0.5).toLocaleString();
});

// ── HERO IMAGE (real hotel image, with graceful fallback) ──────────
const FALLBACK_GRADIENT =
  "linear-gradient(135deg, #0d5c5c 0%, #148080 50%, #1ab0a8 100%)";

const heroImageUrl = computed(() => {
  // Adjust these field names to match your actual Hotel.js shape.
  return hotel.value?.image || hotel.value?.images?.[0] || hotel.value?.thumbnail || null;
});

const heroStyle = computed(() => {
  if (heroImageUrl.value) {
    return {
      backgroundImage: `url('${heroImageUrl.value}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return { background: FALLBACK_GRADIENT };
});

// ── PHOTO THUMBNAILS (real images array, falls back to hero image) ──
const photoThumbs = computed(() => {
  if (hotel.value?.images && hotel.value.images.length > 0) {
    return hotel.value.images.slice(0, 4);
  }
  if (heroImageUrl.value) {
    return [heroImageUrl.value];
  }
  return [];
});

function onThumbError(e) {
  // If a real image URL 404s, hide it gracefully instead of a broken icon
  e.target.style.visibility = "hidden";
}

// ── COUNTDOWN TIMER ─────────────────────────────────────────
const totalSeconds = ref(14 * 60 + 59);
let timerInterval = null;

const formattedTime = computed(() => {
  const m = Math.floor(totalSeconds.value / 60).toString().padStart(2, "0");
  const s = (totalSeconds.value % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
});

onMounted(() => {
  timerInterval = setInterval(() => {
    if (totalSeconds.value > 0) totalSeconds.value--;
  }, 1000);
});

onUnmounted(() => clearInterval(timerInterval));

// ── FORM STATE ───────────────────────────────────────────────
const form = ref({ name: "", email: "", phone: "" });

// ── TRUST BADGES ─────────────────────────────────────────────
const IconShield = {
  render: () =>
    h(
      "svg",
      { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" },
      [h("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })],
    ),
};
const IconCheck = {
  render: () =>
    h(
      "svg",
      { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" },
      [
        h("path", { d: "M22 11.08V12a10 10 0 11-5.93-9.14" }),
        h("polyline", { points: "22 4 12 14.01 9 11.01" }),
      ],
    ),
};
const IconLock = {
  render: () =>
    h(
      "svg",
      { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" },
      [
        h("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
        h("path", { d: "M7 11V7a5 5 0 0110 0v4" }),
      ],
    ),
};

const trustBadges = [
  { label: "Secure SSL", icon: IconShield },
  { label: "Instant Confirmation", icon: IconCheck },
  { label: "PCI Compliant", icon: IconLock },
];
</script>

<style scoped>
/* Google Fonts loaded via index.html or vite plugin */
.font-serif {
  font-family: "DM Serif Display", Georgia, serif;
}
</style>