<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen font-sans antialiased text-slate-800">
    <div class="w-full">

      <!-- ── Stat cards: 2-col on mobile, 4-col on lg ── -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

        <!-- VIP Guests -->
        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 lg:p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div class="w-8 h-8 rounded-lg bg-emerald-400 flex items-center justify-center text-white shrink-0">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.6 6.6L21 9.2l-5 4.6 1.4 6.9L12 17.3 6.6 20.7 8 13.8 3 9.2l6.4-0.6L12 2z" />
              </svg>
            </div>
            <span class="text-[10px] sm:text-[11px] font-medium text-emerald-600 text-right leading-tight max-w-[110px]">
              {{ stats.vipGuests.badge }}
            </span>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 lg:mt-4">VIP Guests</p>
          <p class="text-2xl lg:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ stats.vipGuests.value }}</p>
        </div>

        <!-- Returning Rate -->
        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 lg:p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <span class="text-[10px] sm:text-[11px] font-medium text-slate-400 text-right leading-tight max-w-[110px]">
              {{ stats.returningRate.badge }}
            </span>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 lg:mt-4">Returning Rate</p>
          <p class="text-2xl lg:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ stats.returningRate.value }}</p>
        </div>

        <!-- Avg Guest Lifetime Value -->
        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 lg:p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8c-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2m0-8V6m0 10v2m0-12a4 4 0 110 8 4 4 0 110 8" />
              </svg>
            </div>
            <span class="text-[10px] sm:text-[11px] font-medium text-amber-500 text-right leading-tight max-w-[110px]">
              {{ stats.avgLifetimeValue.badge }}
            </span>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 lg:mt-4">Avg. Lifetime Value</p>
          <p class="text-2xl lg:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ stats.avgLifetimeValue.value }}</p>
        </div>

        <!-- Blacklisted -->
        <div class="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 lg:p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div class="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke-width="1.8" />
                <path stroke-linecap="round" stroke-width="1.8" d="M6 6l12 12" />
              </svg>
            </div>
            <span class="text-[10px] sm:text-[11px] font-medium text-rose-500 text-right leading-tight max-w-[110px]">
              {{ stats.blacklisted.badge }}
            </span>
          </div>
          <p class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-3 lg:mt-4">Blacklisted</p>
          <p class="text-2xl lg:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{{ stats.blacklisted.value }}</p>
        </div>
      </div>

      <!-- ── Search + toolbar (mobile: search full width, icon beside) ── -->
      <div class="mt-4 sm:mt-5 flex items-center gap-2">
        <div class="relative flex-1">
          <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search guests..."
            class="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
          />
        </div>
        <button
          type="button"
          class="w-10 h-10 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shrink-0"
          aria-label="Filter settings"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M7 6v3m0 0a2 2 0 100 .01M7 9a2 2 0 100-.01M17 6v9m0 0a2 2 0 100 .01M17 15a2 2 0 100-.01M4 18h16M4 12h6" />
          </svg>
        </button>
        <!-- Download hidden on mobile to save space -->
        <button
          type="button"
          class="hidden sm:flex w-10 h-10 items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shrink-0"
          aria-label="Download list"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
          </svg>
        </button>
      </div>

      <!-- ── Filter pills: horizontal scroll on mobile ── -->
      <div class="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          @click="activeFilter = filter"
          :class="[
            'flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border transition-colors whitespace-nowrap shrink-0',
            activeFilter === filter
              ? 'bg-emerald-500 text-white border-emerald-500'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50',
          ]"
        >
          <svg v-if="filter === 'VIP Only'" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ filter }}
        </button>
      </div>

      <!-- ── Guest list ── -->

      <!-- MOBILE / TABLET: card list (hidden on lg+) -->
      <div class="lg:hidden mt-4 bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden divide-y divide-slate-100">
        <div
          v-for="guest in paginatedGuests"
          :key="guest.id"
          class="p-4 sm:p-5"
        >
          <!-- Row 1: avatar + name + status badge -->
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <img :src="guest.avatar" :alt="guest.name" class="w-10 h-10 rounded-full object-cover shrink-0" />
              <div class="min-w-0">
                <p class="font-semibold text-slate-800 truncate">{{ guest.name }}</p>
                <p class="text-xs text-slate-400 truncate">{{ guest.email }}</p>
              </div>
            </div>
            <span :class="['inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 uppercase tracking-wide', statusStyles[guest.status]]">
              <span v-if="guest.status === 'Checked In'" class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {{ guest.status }}
            </span>
          </div>

          <!-- Row 2: loyalty + last visit + spent -->
          <div class="mt-3 flex items-center justify-between gap-2">
            <div class="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <component :is="loyaltyIcon(guest.loyalty)" />
              <span>{{ guest.loyalty }}</span>
              <!-- loyalty progress bar -->
              <div v-if="guest.loyaltyProgress" class="w-14 h-1 rounded-full bg-slate-100 ml-1 overflow-hidden">
                <div class="h-full rounded-full bg-emerald-500" :style="{ width: `${guest.loyaltyProgress}%` }"></div>
              </div>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs text-slate-400">{{ guest.lastVisit }}</span>
              <span class="text-sm font-bold text-slate-800">{{ guest.totalSpent }}</span>
            </div>
          </div>

          <!-- Row 3: action buttons -->
          <div class="mt-3 flex items-center gap-3">
            <button class="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
              Message
            </button>
            <button class="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>
          </div>
        </div>

        <div v-if="paginatedGuests.length === 0" class="px-5 py-10 text-center text-slate-400 text-sm">
          No guests match this filter.
        </div>
      </div>

      <!-- DESKTOP: table (hidden below lg) -->
      <div class="hidden lg:block bg-white rounded-2xl border border-slate-200/70 shadow-sm mt-5 overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-200/70">
              <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Guest</th>
              <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Status</th>
              <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Loyalty Level</th>
              <th class="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Last Visit</th>
              <th class="text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Total Spent</th>
              <th class="text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="guest in paginatedGuests" :key="guest.id" class="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <img :src="guest.avatar" :alt="guest.name" class="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div>
                    <p class="font-semibold text-slate-800">{{ guest.name }}</p>
                    <p class="text-xs text-slate-400">{{ guest.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4">
                <span :class="['inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full', statusStyles[guest.status]]">
                  <span v-if="guest.status === 'Checked In'" class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {{ guest.status }}
                </span>
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center gap-1.5 text-slate-700 font-medium">
                  <component :is="loyaltyIcon(guest.loyalty)" />
                  {{ guest.loyalty }}
                </div>
                <div v-if="guest.loyaltyProgress" class="w-20 h-1 rounded-full bg-slate-100 mt-1.5 overflow-hidden">
                  <div class="h-full rounded-full bg-emerald-500" :style="{ width: `${guest.loyaltyProgress}%` }"></div>
                </div>
              </td>
              <td class="px-5 py-4 text-slate-600">{{ guest.lastVisit }}</td>
              <td class="px-5 py-4 text-right font-semibold text-slate-800">{{ guest.totalSpent }}</td>
              <td class="px-5 py-4">
                <div class="flex items-center justify-end gap-3">
                  <button class="text-emerald-500 hover:text-emerald-700 transition-colors" aria-label="Message guest">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </button>
                  <button class="text-slate-400 hover:text-slate-700 transition-colors" aria-label="View guest profile">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="paginatedGuests.length === 0">
              <td colspan="6" class="px-5 py-10 text-center text-slate-400 text-sm">No guests match this filter.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ── Pagination ── -->
      <div class="flex items-center justify-between mt-4 px-1">
        <p class="text-xs text-slate-400">
          Showing <span class="font-medium text-slate-600">{{ rangeStart }}–{{ rangeEnd }}</span>
          of <span class="font-medium text-slate-600">{{ filteredGuests.length }}</span>
        </p>
        <div class="flex items-center gap-2">
          <button
            type="button"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
            :class="[
              'flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors',
              currentPage === 1
                ? 'text-slate-300 border-slate-200 cursor-not-allowed'
                : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50',
            ]"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>
          <span class="text-xs font-medium text-slate-500 px-1">{{ currentPage }} / {{ totalPages }}</span>
          <button
            type="button"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            :class="[
              'flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors',
              currentPage === totalPages
                ? 'text-slate-300 border-slate-200 cursor-not-allowed'
                : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50',
            ]"
          >
            Next
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, h, ref, watch } from "vue";
import { stats, filters, guests as rawGuests } from "../../service/api/Data_guest.js";

// --- Loyalty tier icons ---
const DiamondIcon = () =>
  h("svg", { class: "w-3.5 h-3.5 text-amber-500", fill: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { d: "M12 2l4 6h-8l4-6zM4 9h16l-8 13L4 9z" }),
  ]);
const StarIcon = (color) => () =>
  h("svg", { class: `w-3.5 h-3.5 ${color}`, fill: "currentColor", viewBox: "0 0 24 24" }, [
    h("path", { d: "M12 2l2.6 6.6L21 9.2l-5 4.6 1.4 6.9L12 17.3 6.6 20.7 8 13.8 3 9.2l6.4-0.6L12 2z" }),
  ]);
const TrophyIcon = (color) => () =>
  h("svg", { class: `w-3.5 h-3.5 ${color}`, fill: "none", stroke: "currentColor", "stroke-width": "1.8", viewBox: "0 0 24 24" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M8 4h8v4a4 4 0 11-8 0V4zM8 5H5a2 2 0 002 4M16 5h3a2 2 0 01-2 4M12 12v3m-3 3h6m-3 0v-3" }),
  ]);

const loyaltyIconMap = {
  "Diamond Elite": DiamondIcon,
  Platinum: TrophyIcon("text-slate-400"),
  Gold: StarIcon("text-amber-400"),
  Silver: StarIcon("text-slate-400"),
};
function loyaltyIcon(level) {
  return loyaltyIconMap[level] ?? StarIcon("text-slate-300");
}

// --- Search ---
const searchQuery = ref("");

// --- Filters ---
const activeFilter = ref("All Guests");

const filteredGuests = computed(() => {
  let list = rawGuests;
  // text search
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(
      (g) => g.name.toLowerCase().includes(q) || g.email.toLowerCase().includes(q)
    );
  }
  switch (activeFilter.value) {
    case "VIP Only":
      return list.filter((g) => ["Diamond Elite", "Platinum"].includes(g.loyalty));
    case "Corporate":
      return list.filter((g) => /\.(com|io|org)$/.test(g.email.split("@")[1] || ""));
    case "New (7 Days)":
      return list.slice(0, 4);
    default:
      return list;
  }
});

// --- Pagination ---
const pageSize = 4;
const currentPage = ref(1);

const totalPages = computed(() => Math.max(1, Math.ceil(filteredGuests.value.length / pageSize)));
const paginatedGuests = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredGuests.value.slice(start, start + pageSize);
});
const rangeStart = computed(() =>
  filteredGuests.value.length === 0 ? 0 : (currentPage.value - 1) * pageSize + 1
);
const rangeEnd = computed(() => Math.min(currentPage.value * pageSize, filteredGuests.value.length));

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}

watch([activeFilter, searchQuery], () => { currentPage.value = 1; });
watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) currentPage.value = newTotal;
});

const statusStyles = {
  "Checked In": "bg-emerald-50 text-emerald-700",
  "Past Guest": "bg-slate-100 text-slate-500",
  Reserved: "bg-amber-50 text-amber-600",
};
</script>