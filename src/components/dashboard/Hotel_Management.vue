<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen font-sans antialiased text-slate-800">
    <div class="w-full">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
        <div class="relative flex-1">
          <svg
            class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by hotel, location, or country..."
            class="w-full text-sm placeholder:text-slate-400 text-slate-700 bg-white border border-slate-200 rounded-xl pl-11 pr-3 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
          />
        </div>
        <button
          v-if="isSuperAdmin"
          type="button"
          @click="goToAddHotel"
          class="flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-emerald-700 px-4 py-2.5 sm:py-3 rounded-xl shadow-sm hover:bg-emerald-800 transition-colors whitespace-nowrap"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Hotel
        </button>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-5">
        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 shadow-sm">
          <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
            </svg>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 sm:mt-4">Total Hotels</p>
          <p class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ hotelStats.total }}</p>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 shadow-sm">
          <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.366 2.445a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.538 1.118l-3.366-2.445a1 1 0 00-1.176 0l-3.366 2.445c-.783.57-1.838-.197-1.538-1.118l1.286-3.957a1 1 0 00-.364-1.118L4.063 9.384c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 sm:mt-4">Avg Rating</p>
          <p class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ hotelStats.avgRating }}</p>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 shadow-sm">
          <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 10v2" />
            </svg>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 sm:mt-4">Avg Price</p>
          <p class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">${{ hotelStats.avgPrice }}</p>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 shadow-sm">
          <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 sm:mt-4">Countries</p>
          <p class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ hotelStats.countries }}</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200/70 shadow-sm mt-4 sm:mt-5 overflow-hidden">
        <div class="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
          <div>
            <h3 class="text-sm sm:text-base font-semibold text-slate-800">Hotel Inventory</h3>
            <p class="text-xs sm:text-sm text-slate-400 mt-0.5 hidden sm:block">Manage properties shown on the booking site</p>
          </div>
          <button
            type="button"
            @click="loadHotels"
            :disabled="loading"
            class="text-slate-400 hover:text-slate-700 disabled:opacity-50 transition-colors"
            aria-label="Refresh hotels"
          >
            <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 4v6h6M20 20v-6h-6M20 9A8 8 0 006.34 4.34M4 15a8 8 0 0013.66 4.66" />
            </svg>
          </button>
        </div>

        <div v-if="loading" class="px-6 py-16 text-center text-sm text-slate-400">Loading hotels...</div>

        <template v-else>
          <div class="sm:hidden divide-y divide-slate-100">
            <div v-for="hotel in paginatedHotels" :key="hotel.id" class="px-4 py-3.5">
              <div class="flex items-center gap-3">
                <img
                  :src="hotel.image || fallbackImage"
                  :alt="hotel.name"
                  class="h-12 w-14 rounded-lg object-cover bg-slate-100 shrink-0"
                  @error="setImageFallback"
                />
                <div class="min-w-0 flex-1">
                  <p class="font-semibold text-slate-800 text-sm truncate">{{ hotel.name }}</p>
                  <p class="text-xs text-slate-400 truncate">{{ hotel.location }}</p>
                </div>
                <span class="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">{{ hotel.starRating || hotel.rating }} star</span>
              </div>
              <div class="mt-2.5 flex items-center gap-2">
                <button type="button" @click="goToEditHotel(hotel)" class="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                  Edit
                </button>
                <button type="button" @click="deleteHotel(hotel)" :disabled="deleting === hotel.id" class="flex items-center gap-1.5 text-xs font-medium text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                  {{ deleting === hotel.id ? "Deleting..." : "Delete" }}
                </button>
              </div>
            </div>
            <div v-if="paginatedHotels.length === 0" class="px-5 py-10 text-center text-slate-400 text-sm">No hotels match your search.</div>
          </div>

          <div class="hidden sm:block overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-slate-50/80 border-b border-slate-200/70">
                  <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5">Hotel</th>
                  <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5">Location</th>
                  <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5">Rating</th>
                  <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5">Price</th>
                  <th class="text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="hotel in paginatedHotels" :key="hotel.id" class="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <img
                        :src="hotel.image || fallbackImage"
                        :alt="hotel.name"
                        class="h-11 w-14 rounded-lg object-cover bg-slate-100 shrink-0"
                        @error="setImageFallback"
                      />
                      <div class="min-w-0">
                        <p class="font-semibold text-slate-800 truncate max-w-[220px]">{{ hotel.name }}</p>
                        <p class="text-xs text-slate-400 truncate max-w-[220px]">{{ hotel.description }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-slate-600">{{ hotel.location }}</td>
                  <td class="px-6 py-4">
                    <span class="text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-amber-50 text-amber-700">
                      {{ hotel.starRating || hotel.rating || 0 }} star
                    </span>
                  </td>
                  <td class="px-6 py-4 text-slate-600">${{ hotel.pricePerNight }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center justify-end gap-1">
                      <button type="button" @click="goToEditHotel(hotel)" class="text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg p-1.5 transition-colors" aria-label="Edit hotel">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 113 3L12 16l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button type="button" @click="deleteHotel(hotel)" :disabled="deleting === hotel.id" class="text-slate-400 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg p-1.5 transition-colors" aria-label="Delete hotel">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="paginatedHotels.length === 0">
                  <td colspan="5" class="px-6 py-10 text-center text-slate-400 text-sm">No hotels match your search.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <div v-if="deleteError" class="px-4 sm:px-6 py-3 bg-rose-50 border-t border-rose-200 text-sm font-medium text-rose-700">
          {{ deleteError }}
        </div>

        <div class="flex items-center justify-between px-4 sm:px-6 py-3.5 border-t border-slate-100 bg-slate-50/40">
          <p class="text-xs text-slate-400">
            Showing <span class="font-medium text-slate-600">{{ rangeStart }}-{{ rangeEnd }}</span> of
            <span class="font-medium text-slate-600">{{ filteredHotels.length }}</span>
          </p>
          <div class="flex items-center gap-2">
            <button type="button" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)" :class="pagerClass(currentPage === 1)">
              Prev
            </button>
            <span class="text-xs font-medium text-slate-500 px-1 whitespace-nowrap">{{ currentPage }} / {{ totalPages }}</span>
            <button type="button" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)" :class="pagerClass(currentPage === totalPages)">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { fallbackImage, hotelApi } from "../../service/api/Hotel.js";
import { useAuth } from "../../service/auth.js";

const router = useRouter();
const isSuperAdmin = useAuth().isSuperAdmin;
const rawHotels = ref([]);
const loading = ref(false);
const deleting = ref(null);
const deleteError = ref("");
const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = 6;

async function loadHotels() {
  loading.value = true;
  deleteError.value = "";
  try {
    rawHotels.value = await hotelApi.adminList();
  } catch (err) {
    deleteError.value = err.message || "Failed to load hotels.";
  } finally {
    loading.value = false;
  }
}

async function deleteHotel(hotel) {
  if (!window.confirm(`Are you sure you want to delete ${hotel.name}? This action cannot be undone.`)) {
    return;
  }

  deleting.value = hotel.id;
  deleteError.value = "";
  try {
    await hotelApi.remove(hotel.id);
    rawHotels.value = rawHotels.value.filter((item) => item.id !== hotel.id);
  } catch (err) {
    deleteError.value = err.message || "Failed to delete hotel. Please try again.";
  } finally {
    deleting.value = null;
  }
}

function goToAddHotel() {
  router.push({ name: "hotel-add" });
}

function goToEditHotel(hotel) {
  router.push({ name: "hotel-edit", params: { id: hotel.id } });
}

function setImageFallback(event) {
  if (event.target.src !== fallbackImage) {
    event.target.src = fallbackImage;
  }
}

const filteredHotels = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return rawHotels.value;

  return rawHotels.value.filter((hotel) =>
    [hotel.name, hotel.location, hotel.country, hotel.description]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query)),
  );
});

const hotelStats = computed(() => {
  const hotels = rawHotels.value;
  const avgPrice = hotels.length
    ? Math.round(hotels.reduce((sum, hotel) => sum + Number(hotel.pricePerNight || 0), 0) / hotels.length)
    : 0;
  const avgRating = hotels.length
    ? (hotels.reduce((sum, hotel) => sum + Number(hotel.starRating || hotel.rating || 0), 0) / hotels.length).toFixed(1)
    : "0.0";
  const countries = new Set(hotels.map((hotel) => hotel.country).filter(Boolean)).size;

  return {
    total: hotels.length,
    avgPrice,
    avgRating,
    countries,
  };
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredHotels.value.length / pageSize)));
const paginatedHotels = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredHotels.value.slice(start, start + pageSize);
});
const rangeStart = computed(() =>
  filteredHotels.value.length === 0 ? 0 : (currentPage.value - 1) * pageSize + 1,
);
const rangeEnd = computed(() => Math.min(currentPage.value * pageSize, filteredHotels.value.length));

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}

function pagerClass(disabled) {
  return [
    "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
    disabled
      ? "text-slate-300 border-slate-200 cursor-not-allowed"
      : "text-emerald-600 border-emerald-200 hover:bg-emerald-50",
  ];
}

watch(searchQuery, () => {
  currentPage.value = 1;
});
watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) currentPage.value = newTotal;
});

onMounted(loadHotels);
</script>
