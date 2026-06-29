<template>
  <div
    class="p-4 sm:p-6 bg-gradient-to-br from-slate-50/90 via-white to-teal-50/60 min-h-screen font-sans antialiased"
  >
    <!-- Header -->
    <div class="flex items-start sm:items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Good morning, {{ firstName }}
        </h2>
        <p class="text-sm text-slate-500 mt-0.5 flex items-center gap-2">
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0"></span>
          <span class="line-clamp-1">Here is what's happening at {{ currentUser.hotel }} today.</span>
        </p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-xs font-medium text-teal-700 bg-teal-100/60 px-3 py-1.5 rounded-full border border-teal-200/50 backdrop-blur-sm shadow-sm whitespace-nowrap">
          📅 {{ todayLabel }}
        </span>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6">
      <!-- Occupancy -->
      <div class="group bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        <div class="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Occupancy</span>
          <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-50/50 flex items-center justify-center text-teal-500 group-hover:bg-teal-100 transition-colors">
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-2 flex-wrap">
          <span class="text-xl sm:text-2xl font-bold text-slate-800">{{ stats.occupancy.value }}%</span>
          <span class="text-xs font-medium text-emerald-700 bg-emerald-50/70 px-2 py-0.5 rounded-full border border-emerald-200/50">{{ stats.occupancy.label }}</span>
        </div>
        <div class="mt-3 h-1.5 sm:h-2 rounded-full bg-slate-100/80 overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400" :style="{ width: `${stats.occupancy.value}%` }"></div>
        </div>
        <p class="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
          <span class="inline-block w-1 h-1 rounded-full bg-teal-300"></span>
          {{ occupancyRooms }} of {{ roomAvailability.total }} rooms
        </p>
      </div>

      <!-- Check-ins -->
      <div class="group bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        <div class="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span class="truncate mr-1">Check-ins</span>
          <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50/50 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-100 transition-colors shrink-0">
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
          </div>
        </div>
        <div class="flex items-end gap-1.5 mt-2 flex-wrap">
          <span class="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">{{ stats.checkIns.today }}</span>
          <span class="text-xs sm:text-sm text-slate-400 font-medium mb-0.5">/ {{ stats.checkIns.total }}</span>
        </div>
        <div class="flex items-center gap-1.5 mt-1.5">
          <div class="flex -space-x-1.5">
            <div class="w-5 h-5 rounded-full bg-indigo-100 border border-white flex items-center justify-center text-[8px] font-medium text-indigo-700">JD</div>
            <div class="w-5 h-5 rounded-full bg-rose-100 border border-white flex items-center justify-center text-[8px] font-medium text-rose-700">MW</div>
            <div class="w-5 h-5 rounded-full bg-teal-100 border border-white flex items-center justify-center text-[8px] font-medium text-teal-700">+9</div>
          </div>
          <span class="text-[10px] text-slate-400 ml-0.5 hidden sm:inline">arriving soon</span>
        </div>
      </div>

      <!-- Revenue card -->
      <div class="group bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 col-span-2 lg:col-span-1">
        <div class="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Revenue</span>
          <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-50/50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-100 transition-colors">
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
        </div>
        <!-- Responsive layout: stacked on mobile, side-by-side on sm+ -->
        <div class="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <div class="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">{{ stats.revenue.amount }}</div>
            <div class="flex items-center gap-1.5 mt-1 text-xs font-medium text-emerald-600">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
              {{ stats.revenue.change }}
            </div>
          </div>
          <!-- Mini sparkline bar — visible on col-span-2 (mobile/tablet) -->
          <div class="flex items-end gap-0.5 h-8 lg:hidden">
            <div v-for="(h, i) in sparkline" :key="i"
              class="w-2 rounded-sm bg-gradient-to-t from-teal-500 to-emerald-400 opacity-70"
              :style="{ height: h + '%' }"
            ></div>
          </div>
        </div>
        <!-- Progress bar on mobile col-span-2 -->
        <div class="mt-3 h-1.5 rounded-full bg-slate-100/80 overflow-hidden lg:hidden">
          <div class="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 w-[72%]"></div>
        </div>
        <p class="text-[10px] text-slate-400 mt-1.5 lg:hidden">72% of monthly target</p>
      </div>
    </div>

    <!-- ── Revenue Performance Chart ── -->
    <div class="mt-6 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm">
      <!-- Chart header -->
      <div class="flex flex-col xs:flex-row xs:items-start justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h3 class="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
            <span class="inline-block w-1.5 h-5 rounded-full bg-gradient-to-b from-teal-400 to-emerald-400"></span>
            Revenue Performance
          </h3>
          <p class="text-xs text-slate-400 mt-0.5 ml-4">Daily revenue fluctuations — opening, high, low, closing.</p>
        </div>
        <!-- Legend + toggle -->
        <div class="flex flex-wrap items-center gap-3 ml-4 xs:ml-0">
          
          <div class="flex text-xs bg-slate-100/80 rounded-lg overflow-hidden border border-slate-200/60">
            <button
              v-for="tab in ['Current', 'Yearly']"
              :key="tab"
              @click="chartTab = tab"
              :class="[
                'px-2.5 py-1 font-medium transition-all',
                chartTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              ]"
            >{{ tab }}</button>
          </div>
        </div>
      </div>

      <!-- Scrollable chart wrapper -->
      <div class="overflow-x-auto -mx-1 px-1">
        <div class="min-w-[520px]">
          <svg
            :viewBox="`0 0 ${svgW} ${svgH}`"
            class="w-full"
            :style="{ height: chartHeight }"
            preserveAspectRatio="xMidYMid meet"
          >
            <!-- Y-axis grid lines -->
            <g v-for="(yVal, i) in yGridLines" :key="'grid-' + i">
              <line
                :x1="padL"
                :y1="scaleY(yVal)"
                :x2="svgW - padR"
                :y2="scaleY(yVal)"
                stroke="#e2e8f0"
                stroke-width="0.8"
                stroke-dasharray="3,3"
              />
              <text
                :x="padL - 6"
                :y="scaleY(yVal) + 3.5"
                text-anchor="end"
                fill="#94a3b8"
                font-size="9"
              >${{ yVal }}</text>
            </g>

            <!-- Candles -->
            <g v-for="(c, i) in candles" :key="'c-' + i">
              <!-- X label -->
              <text
                :x="cx(i)"
                :y="svgH - padB + 13"
                text-anchor="middle"
                fill="#94a3b8"
                font-size="9"
              >{{ c.label }}</text>

              <!-- Wick -->
              <line
                :x1="cx(i)" :y1="scaleY(c.high)"
                :x2="cx(i)" :y2="scaleY(c.low)"
                stroke="#cbd5e1"
                stroke-width="1.5"
                stroke-linecap="round"
              />

              <!-- Body -->
              <rect
                :x="cx(i) - bodyW / 2"
                :y="scaleY(Math.max(c.open, c.close))"
                :width="bodyW"
                :height="Math.max(2, Math.abs(scaleY(c.open) - scaleY(c.close)))"
                :fill="c.bullish ? '#1a3a2e' : '#cbd5e1'"
                rx="2.5"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>

    <!-- Recent Bookings -->
    <div class="flex items-center justify-between mt-8 mb-4">
      <h3 class="text-sm font-semibold text-slate-800 flex items-center gap-2">
        <span class="inline-block w-1.5 h-5 rounded-full bg-gradient-to-b from-teal-400 to-emerald-400"></span>
        Recent bookings
      </h3>
      <button class="text-xs font-medium text-teal-600 hover:text-teal-800 bg-teal-50/50 px-3 py-1.5 rounded-full border border-teal-200/60 hover:bg-teal-100/60 transition-all">
        View all →
      </button>
    </div>

    <div class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
      <!-- Desktop table -->
      <table class="w-full text-sm hidden sm:table">
        <thead>
          <tr class="bg-slate-50/80 border-b border-slate-200/60">
            <th class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Guest name</th>
            <th class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Room type</th>
            <th class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Check-in / out</th>
            <th class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Status</th>
            <th class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(booking, index) in paginatedBookings"
            :key="booking.id"
            :class="['border-t border-slate-100/60', index % 2 === 0 ? 'bg-white/50' : 'bg-slate-50/30']"
          >
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center shrink-0 text-teal-700 font-medium text-xs shadow-sm">
                  {{ booking.initials }}
                </div>
                <span class="font-medium text-slate-800">{{ booking.name }}</span>
              </div>
            </td>
            <td class="px-5 py-3.5">
              <p class="font-medium text-slate-800">{{ booking.roomType }}</p>
              <p class="text-xs text-slate-400">{{ booking.roomNumber }}</p>
            </td>
            <td class="px-5 py-3.5 text-slate-600 text-sm hidden md:table-cell">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ booking.dates }}
              </div>
            </td>
            <td class="px-5 py-3.5">
              <span :class="['text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap',
                booking.status === 'Confirmed'
                  ? 'bg-teal-50/80 text-teal-700 border border-teal-200/50'
                  : 'bg-amber-50/80 text-amber-700 border border-amber-200/50']">
                {{ booking.status }}
              </span>
            </td>
            <td class="px-5 py-3.5">
              <button class="text-slate-400 hover:text-slate-700 hover:bg-slate-100/70 rounded-lg p-1.5 transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="paginatedBookings.length === 0">
            <td colspan="5" class="px-5 py-10 text-center text-slate-400 text-sm">No bookings on this page.</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile cards -->
      <div class="sm:hidden divide-y divide-slate-100/60">
        <div v-for="booking in paginatedBookings" :key="booking.id" class="p-4 flex items-start gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center shrink-0 text-teal-700 font-medium text-xs shadow-sm">
            {{ booking.initials }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2">
              <span class="font-medium text-slate-800 truncate">{{ booking.name }}</span>
              <span :class="['text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0 whitespace-nowrap',
                booking.status === 'Confirmed'
                  ? 'bg-teal-50/80 text-teal-700 border border-teal-200/50'
                  : 'bg-amber-50/80 text-amber-700 border border-amber-200/50']">
                {{ booking.status }}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">{{ booking.roomType }} · {{ booking.roomNumber }}</p>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center gap-1.5 text-xs text-slate-400">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ booking.dates }}
              </div>
              <button class="text-slate-400 hover:text-slate-700 hover:bg-slate-100/70 rounded-lg p-1.5 -mr-1.5 transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div v-if="paginatedBookings.length === 0" class="px-5 py-10 text-center text-slate-400 text-sm">
          No bookings on this page.
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-t border-slate-100/60 bg-slate-50/40">
        <p class="text-xs text-slate-400 whitespace-nowrap">
          <span class="hidden sm:inline">Showing </span>
          <span class="font-medium text-slate-600">{{ rangeStart }}–{{ rangeEnd }}</span>
          of
          <span class="font-medium text-slate-600">{{ bookings.length }}</span>
        </p>
        <div class="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
            :class="['flex items-center gap-1 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full border transition-all',
              currentPage === 1
                ? 'text-slate-300 border-slate-200/60 cursor-not-allowed'
                : 'text-teal-600 border-teal-200/60 hover:bg-teal-50/60 hover:text-teal-800']"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span class="hidden sm:inline">Previous</span>
          </button>
          <span class="text-xs font-medium text-slate-500 px-1 whitespace-nowrap">
            <span class="hidden sm:inline">Page </span>{{ currentPage }}<span class="hidden sm:inline"> of {{ totalPages }}</span><span class="sm:hidden">/{{ totalPages }}</span>
          </span>
          <button
            type="button"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            :class="['flex items-center gap-1 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full border transition-all',
              currentPage === totalPages
                ? 'text-slate-300 border-slate-200/60 cursor-not-allowed'
                : 'text-teal-600 border-teal-200/60 hover:bg-teal-50/60 hover:text-teal-800']"
          >
            <span class="hidden sm:inline">Next</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {
  currentUser,
  stats,
  bookings as rawBookings,
  operations as dashboardOperations,
  roomAvailability,
} from '../../service/api/Data_overview.js'

// ── Header ───────────────────x───────────────────────────
const firstName = computed(() => currentUser.name.split(' ')[0])
const todayLabel = computed(() =>
  new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
)
const occupancyRooms = computed(() =>
  Math.round((roomAvailability.total * stats.occupancy.value) / 100)
)

// ── Revenue card sparkline ───────────────────────────────
const sparkline = [40, 55, 45, 70, 60, 80, 65, 90, 72, 85]

// ── Revenue Performance Chart ────────────────────────────
const chartTab = ref('Current')

const candles = [
  { label: 'Oct 01', open: 280, high: 310, low: 230, close: 260, bullish: false },
  { label: 'Oct 04', open: 255, high: 300, low: 240, close: 285, bullish: true  },
  { label: 'Oct 07', open: 310, high: 320, low: 240, close: 250, bullish: false },
  { label: 'Oct 10', open: 250, high: 330, low: 235, close: 315, bullish: true  },
  { label: 'Oct 13', open: 320, high: 340, low: 280, close: 295, bullish: false },
  { label: 'Oct 16', open: 285, high: 335, low: 270, close: 320, bullish: true  },
  { label: 'Oct 19', open: 270, high: 390, low: 245, close: 375, bullish: true  },
  { label: 'Oct 22', open: 370, high: 385, low: 310, close: 325, bullish: false },
  { label: 'Oct 25', open: 340, high: 355, low: 270, close: 280, bullish: false },
  { label: 'Oct 28', open: 260, high: 380, low: 210, close: 360, bullish: true  },
  { label: 'Oct 31', open: 295, high: 375, low: 270, close: 355, bullish: true  },
]

// SVG dimensions (logical units — scales via viewBox)
const svgW   = 560
const svgH   = 220
const padL   = 36
const padR   = 8
const padT   = 10
const padB   = 24
const bodyW  = 14

// Responsive height class
const chartHeight = 'clamp(160px, 35vw, 240px)'

const allVals = candles.flatMap(c => [c.high, c.low])
const minVal  = Math.min(...allVals) - 20
const maxVal  = Math.max(...allVals) + 20

const yGridLines = computed(() => {
  const step = 50
  const lines = []
  for (let v = Math.ceil(minVal / step) * step; v <= maxVal; v += step) lines.push(v)
  return lines
})

function scaleY(val) {
  const h = svgH - padT - padB
  return padT + h - ((val - minVal) / (maxVal - minVal)) * h
}

function cx(i) {
  const usable = svgW - padL - padR
  return padL + (i + 0.5) * (usable / candles.length)
}

// ── Bookings table ───────────────────────────────────────
const bookings = computed(() =>
  rawBookings.map(b => ({
    ...b,
    dates: `${b.checkIn} – ${b.checkOut}`,
    initials: b.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase(),
  }))
)

const pageSize    = 5
const currentPage = ref(1)
const totalPages  = computed(() => Math.max(1, Math.ceil(bookings.value.length / pageSize)))

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return bookings.value.slice(start, start + pageSize)
})

const rangeStart = computed(() =>
  bookings.value.length === 0 ? 0 : (currentPage.value - 1) * pageSize + 1
)
const rangeEnd = computed(() =>
  Math.min(currentPage.value * pageSize, bookings.value.length)
)

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

watch(totalPages, newTotal => {
  if (currentPage.value > newTotal) currentPage.value = newTotal
})
</script>

<style scoped>
* { transition: all 0.2s ease; }
</style>