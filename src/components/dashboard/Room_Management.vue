<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen font-sans antialiased text-slate-800">
    <div class="w-full">

      <!-- ── Search + actions ── -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
        <div class="relative flex-1">
          <svg class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by room, type, or status..."
            class="w-full text-sm placeholder:text-slate-400 text-slate-700 bg-white border border-slate-200 rounded-xl pl-11 pr-3 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
          />
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100/80 px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 hover:bg-slate-200/60 transition-colors flex-1 sm:flex-none"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M7 6v3m0 0a2 2 0 100 .01M7 9a2 2 0 100-.01M17 6v9m0 0a2 2 0 100 .01M17 15a2 2 0 100-.01M4 18h16M4 12h6" />
            </svg>
            Filters
          </button>
          <button
            type="button"
            @click="goToAddRoom"
            class="flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-emerald-700 px-4 py-2.5 sm:py-3 rounded-xl shadow-sm hover:bg-emerald-800 transition-colors flex-1 sm:flex-none whitespace-nowrap"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Room
          </button>
        </div>
      </div>

      <!-- ── Stat cards: 2-col mobile, 4-col lg ── -->
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-5">

        <!-- Total Rooms -->
        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 18v-7a2 2 0 012-2h14a2 2 0 012 2v7M3 18h18M3 18v2h2v-2m14 0v2h2v-2M5 9V6a2 2 0 012-2h2v5M9 9h6" />
              </svg>
            </div>
            <span class="text-[10px] sm:text-[11px] font-medium text-emerald-600 text-right leading-tight max-w-[80px] sm:max-w-none">{{ stats.totalRooms.badge }}</span>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 sm:mt-4">Total Rooms</p>
          <p class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ stats.totalRooms.value }}</p>
        </div>

        <!-- Occupied -->
        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span class="text-[10px] sm:text-[11px] font-medium text-emerald-600 text-right leading-tight max-w-[80px] sm:max-w-none">{{ stats.occupied.badge }}</span>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 sm:mt-4">Occupied</p>
          <p class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ stats.occupied.value }}</p>
        </div>

        <!-- Maintenance -->
        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.5 6a3.5 3.5 0 11-3.5 3.5M14 17a4 4 0 10-8 0M19 8l-4 4m0-4l4 4" />
              </svg>
            </div>
            <span class="text-[10px] sm:text-[11px] font-medium text-rose-500 text-right leading-tight max-w-[80px] sm:max-w-none">{{ stats.maintenance.badge }}</span>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 sm:mt-4">Maintenance</p>
          <p class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ stats.maintenance.value }}</p>
        </div>

        <!-- Available -->
        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-[10px] sm:text-[11px] font-medium text-emerald-600 text-right leading-tight max-w-[80px] sm:max-w-none">{{ stats.available.badge }}</span>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 sm:mt-4">Available</p>
          <p class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ stats.available.value }}</p>
        </div>
      </div>

      <!-- ── Room Inventory ── -->
      <div class="bg-white rounded-2xl border border-slate-200/70 shadow-sm mt-4 sm:mt-5 overflow-hidden">

        <!-- Header -->
        <div class="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
          <div>
            <h3 class="text-sm sm:text-base font-semibold text-slate-800">Room Inventory</h3>
            <p class="text-xs sm:text-sm text-slate-400 mt-0.5 hidden sm:block">Live status of all room units across floors</p>
          </div>
          <div class="flex items-center gap-3">
            <button type="button" class="text-slate-400 hover:text-slate-700 transition-colors" aria-label="Download inventory">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
            </button>
            <button type="button" class="text-slate-400 hover:text-slate-700 transition-colors hidden sm:block" aria-label="Print inventory">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 9V4h12v5M6 18H4a1 1 0 01-1-1v-5a1 1 0 011-1h16a1 1 0 011 1v5a1 1 0 01-1 1h-2M6 14h12v7H6v-7z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- MOBILE only: card list (hidden on sm+) -->
        <div class="sm:hidden divide-y divide-slate-100">
          <div
            v-for="room in paginatedRooms"
            :key="room.id"
            class="px-4 py-3.5 sm:px-5 sm:py-4"
          >
            <div class="flex items-center justify-between gap-3">
              <!-- Room number + type -->
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 21V8l9-5 9 5v13M9 21v-6h6v6M3 21h18" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="font-semibold text-slate-800 text-sm">{{ room.roomNumber }}</p>
                  <p class="text-xs text-slate-400 truncate">{{ room.roomType }} · {{ room.floor }}</p>
                </div>
              </div>
              <!-- Status badge -->
              <span :class="['text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shrink-0', statusStyles[room.status]]">
                {{ room.status }}
              </span>
            </div>
            <!-- Actions -->
            <div class="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                @click="goToEditRoom(room)"
                class="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 113 3L12 16l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
              <button class="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                </svg>
                More
              </button>
            </div>
          </div>

          <div v-if="paginatedRooms.length === 0" class="px-5 py-10 text-center text-slate-400 text-sm">
            No rooms match your search.
          </div>
        </div>

        <!-- TABLET+: table (sm+) -->
        <div class="hidden sm:block overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50/80 border-b border-slate-200/70">
                <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5">Room Number</th>
                <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5">Room Type</th>
                <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5">Floor</th>
                <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5">Status</th>
                <th class="text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="room in paginatedRooms" :key="room.id" class="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 21V8l9-5 9 5v13M9 21v-6h6v6M3 21h18" />
                      </svg>
                    </div>
                    <span class="font-semibold text-slate-800">{{ room.roomNumber }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-slate-600">{{ room.roomType }}</td>
                <td class="px-6 py-4 text-slate-600">{{ room.floor }}</td>
                <td class="px-6 py-4">
                  <span :class="['text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full', statusStyles[room.status]]">
                    {{ room.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-end gap-1">
                    <button type="button" @click="goToEditRoom(room)" class="text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg p-1.5 transition-colors" aria-label="Edit room">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 113 3L12 16l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button class="text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg p-1.5 transition-colors" aria-label="More actions">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedRooms.length === 0">
                <td colspan="5" class="px-6 py-10 text-center text-slate-400 text-sm">No rooms match your search.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-4 sm:px-6 py-3.5 border-t border-slate-100 bg-slate-50/40">
          <p class="text-xs text-slate-400">
            Showing <span class="font-medium text-slate-600">{{ rangeStart }}–{{ rangeEnd }}</span>
            of <span class="font-medium text-slate-600">{{ filteredRooms.length }}</span>
          </p>
          <div class="flex items-center gap-2">
            <button
              type="button"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
              :class="[
                'flex items-center gap-1 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full border transition-colors',
                currentPage === 1
                  ? 'text-slate-300 border-slate-200 cursor-not-allowed'
                  : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50',
              ]"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span class="hidden sm:inline">Prev</span>
            </button>
            <span class="text-xs font-medium text-slate-500 px-1 whitespace-nowrap">
              {{ currentPage }} / {{ totalPages }}
            </span>
            <button
              type="button"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
              :class="[
                'flex items-center gap-1 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full border transition-colors',
                currentPage === totalPages
                  ? 'text-slate-300 border-slate-200 cursor-not-allowed'
                  : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50',
              ]"
            >
              <span class="hidden sm:inline">Next</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { stats, rooms as rawRooms } from "../../service/api/Data_room.js";

const router = useRouter();

function goToAddRoom() {
  router.push({ name: "room-add" });
}

function goToEditRoom(room) {
  router.push({ name: "room-edit", params: { id: room.id } });
}

const searchQuery = ref("");

const filteredRooms = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (query === "") return rawRooms;
  return rawRooms.filter(
    (room) =>
      room.roomNumber.toLowerCase().includes(query) ||
      room.roomType.toLowerCase().includes(query) ||
      room.status.toLowerCase().includes(query) ||
      room.floor.toLowerCase().includes(query),
  );
});

const pageSize = 6;
const currentPage = ref(1);

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRooms.value.length / pageSize)));
const paginatedRooms = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredRooms.value.slice(start, start + pageSize);
});
const rangeStart = computed(() =>
  filteredRooms.value.length === 0 ? 0 : (currentPage.value - 1) * pageSize + 1,
);
const rangeEnd = computed(() => Math.min(currentPage.value * pageSize, filteredRooms.value.length));

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}

watch(searchQuery, () => { currentPage.value = 1; });
watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) currentPage.value = newTotal;
});

const statusStyles = {
  Available: "bg-emerald-50 text-emerald-700",
  Occupied: "bg-blue-50 text-blue-600",
  Cleaning: "bg-amber-50 text-amber-600",
  Maintenance: "bg-orange-50 text-orange-600",
};
</script>