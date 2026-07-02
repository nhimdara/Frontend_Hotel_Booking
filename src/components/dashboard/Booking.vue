<template>
  <div
    class="p-4 sm:p-6 bg-linear-to-br from-slate-50/90 via-white to-teal-50/60 min-h-screen font-sans antialiased"
  >
    <!-- Header -->
    <div class="flex items-start sm:items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Bookings Management
        </h2>
        <p class="text-sm text-slate-500 mt-0.5 flex items-center gap-2">
          <span
            class="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0"
          ></span>
          <span class="line-clamp-1">
            Manage guest arrivals, departures, and active reservations.
          </span>
        </p>
      </div>
      <div class="flex items-center gap-2.5">
        <button
          type="button"
          class="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="isLoading"
          @click="loadBookings"
        >
          {{ isLoading ? "Refreshing..." : "Refresh" }}
        </button>
      </div>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
      <div
        class="group bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="min-w-0">
            <p class="text-xs text-slate-500 font-medium truncate">Total Bookings</p>
            <p class="text-xl sm:text-2xl font-bold text-slate-800 mt-2 tracking-tight">
              {{ stats.totalBookings.value }}
            </p>
          </div>
          <div
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50/70 flex items-center justify-center text-teal-500 group-hover:bg-teal-100 transition-colors shrink-0"
          >
            <svg
              class="w-4.5 h-4.5 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        class="group bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="min-w-0">
            <p class="text-xs text-slate-500 font-medium truncate">Pending Review</p>
            <p class="text-xl sm:text-2xl font-bold text-slate-800 mt-2 tracking-tight">
              {{ stats.pendingApproval.value }}
            </p>
          </div>
          <div
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50/70 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-100 transition-colors shrink-0"
          >
            <svg
              class="w-4.5 h-4.5 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        class="group bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="min-w-0">
            <p class="text-xs text-slate-500 font-medium truncate">Occupancy Rate</p>
            <p class="text-xl sm:text-2xl font-bold text-slate-800 mt-2 tracking-tight">
              {{ stats.occupancyRate.value }}%
            </p>
          </div>
          <div
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50/70 flex items-center justify-center text-amber-500 group-hover:bg-amber-100 transition-colors shrink-0"
          >
            <svg
              class="w-4.5 h-4.5 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 7v11a1 1 0 001 1h16a1 1 0 001-1V9a1 1 0 00-1-1h-7l-2-2H4a1 1 0 00-1 1z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        class="group bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="min-w-0">
            <p class="text-xs text-slate-500 font-medium truncate">
              Revenue ({{ stats.revenue.period }})
            </p>
            <p class="text-xl sm:text-2xl font-bold text-slate-800 mt-2 tracking-tight">
              {{ stats.revenue.value }}
            </p>
          </div>
          <div
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50/70 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-100 transition-colors shrink-0"
          >
            <svg
              class="w-4.5 h-4.5 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Search + filters + table -->
    <div
      class="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl shadow-sm mt-6 overflow-hidden"
    >
      <div
        v-if="notice.message"
        :class="[
          'mx-4 mt-4 rounded-xl border px-4 py-3 text-sm font-medium sm:mx-5',
          notice.type === 'error'
            ? 'border-rose-200 bg-rose-50 text-rose-700'
            : 'border-teal-200 bg-teal-50 text-teal-700',
        ]"
      >
        {{ notice.message }}
      </div>

      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-b border-slate-100/60"
      >
        <div class="flex items-center gap-2.5 w-full sm:flex-1 sm:max-w-sm">
          <div class="relative flex-1">
            <svg
              class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search guests..."
              class="w-full text-sm placeholder:text-slate-400 text-slate-700 bg-slate-50/70 border border-slate-200/70 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-200/70 focus:border-teal-300 transition-all"
            />
          </div>
          <button
            type="button"
            class="shrink-0 w-9 h-9 flex items-center justify-center text-slate-500 bg-slate-50/70 border border-slate-200/70 rounded-xl hover:bg-slate-100/70 transition-all"
            aria-label="Filter"
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
                stroke-width="1.5"
                d="M3 4h18M6 9h12M10 14h4"
              />
            </svg>
          </button>
        </div>

        <div class="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 sm:pb-0 sm:-mb-0 [&::-webkit-scrollbar]:hidden">
          <button
            v-for="filter in statusFilters"
            :key="filter"
            type="button"
            @click="activeFilter = filter"
            :class="[
              'text-xs font-medium px-3.5 py-2 rounded-full border transition-all whitespace-nowrap shrink-0',
              activeFilter === filter
                ? 'bg-teal-500 text-white border-teal-500 shadow-sm'
                : 'text-slate-500 border-slate-200/70 bg-white/60 hover:bg-slate-50/70',
            ]"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Desktop / tablet table (md and up) -->
      <table class="w-full text-sm hidden md:table">
        <thead>
          <tr class="bg-slate-50/80 border-b border-slate-200/60">
            <th
              class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5"
            >
              Guest name
            </th>
            <th
              class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5"
            >
              Room type
            </th>
            <th
              class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell"
            >
              Booking ID
            </th>
            <th
              class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5"
            >
              Check-in / out
            </th>
            <th
              class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5"
            >
              Status
            </th>
            <th
              class="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(booking, index) in paginatedBookings"
            :key="booking.id"
            :class="[
              'border-t border-slate-100/60',
              index % 2 === 0 ? 'bg-white/50' : 'bg-slate-50/30',
            ]"
          >
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-linear-to-br from-teal-100 to-emerald-100 flex items-center justify-center shrink-0 text-teal-700 font-medium text-xs shadow-sm"
                >
                  {{ booking.initials }}
                </div>
                <div>
                  <p class="font-medium text-slate-800">{{ booking.name }}</p>
                  <p class="text-xs text-slate-400">{{ booking.email }}</p>
                </div>
              </div>
            </td>

            <td class="px-5 py-3.5">
              <p class="font-medium text-slate-800">{{ booking.roomType }}</p>
              <p class="text-xs text-slate-400">{{ booking.roomNumber }}</p>
            </td>

            <td class="px-5 py-3.5 text-slate-600 hidden lg:table-cell">
              {{ booking.bookingId }}
            </td>

            <td class="px-5 py-3.5 text-slate-600 text-sm">
              <div class="flex items-center gap-1.5">
                <svg
                  class="w-3.5 h-3.5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {{ booking.checkIn }} – {{ booking.checkOut }}
              </div>
              <p class="text-xs text-slate-400 mt-0.5 ml-5">
                {{ booking.nights }}
                {{ booking.nights === 1 ? "Night" : "Nights" }}
              </p>
            </td>

            <td class="px-5 py-3.5">
              <span
                :class="[
                  'text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap',
                  statusStyles[booking.status],
                ]"
              >
                {{ booking.status }}
              </span>
            </td>

            <td class="px-5 py-3.5">
              <div
                v-if="booking.status === 'Awaiting Approval'"
                class="flex items-center gap-2"
              >
                <button
                  type="button"
                  class="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="updatingBookingId === booking.id"
                  @click="updateBookingStatus(booking, 'confirmed')"
                >
                  {{ updatingBookingId === booking.id ? "Saving..." : "Approve" }}
                </button>
                <button
                  type="button"
                  class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="updatingBookingId === booking.id"
                  @click="updateBookingStatus(booking, 'denied')"
                >
                  Deny
                </button>
              </div>
              <div v-else class="flex items-center gap-1">
                <button
                  v-if="booking.status !== 'Canceled'"
                  class="text-slate-400 hover:text-teal-600 hover:bg-teal-50/70 rounded-lg p-1.5 transition-all"
                  aria-label="Edit booking"
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
                      stroke-width="1.5"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 113 3L12 16l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                </button>
                <button
                  v-else
                  class="text-slate-400 hover:text-teal-600 hover:bg-teal-50/70 rounded-lg p-1.5 transition-all"
                  aria-label="Restore booking"
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
                      stroke-width="1.5"
                      d="M3 12a9 9 0 1018 0 9 9 0 00-18 0zm0 0v-3m0 3h3M12 8v4l3 2"
                    />
                  </svg>
                </button>
                <button
                  class="text-slate-400 hover:text-slate-700 hover:bg-slate-100/70 rounded-lg p-1.5 transition-all"
                  aria-label="More actions"
                >
                  <svg
                    class="w-4.5 h-4.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="paginatedBookings.length === 0">
            <td
              colspan="6"
              class="px-5 py-10 text-center text-slate-400 text-sm"
            >
              {{ emptyStateText }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile / small tablet stacked cards (below md) -->
      <div class="md:hidden divide-y divide-slate-100/60">
        <div
          v-for="booking in paginatedBookings"
          :key="booking.id"
          class="p-4"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-10 h-10 rounded-full bg-linear-to-br from-teal-100 to-emerald-100 flex items-center justify-center shrink-0 text-teal-700 font-medium text-xs shadow-sm"
            >
              {{ booking.initials }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <p class="font-medium text-slate-800 truncate">{{ booking.name }}</p>
                <span
                  :class="[
                    'text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide shrink-0 whitespace-nowrap',
                    statusStyles[booking.status],
                  ]"
                >
                  {{ booking.status }}
                </span>
              </div>
              <p class="text-xs text-slate-400 truncate">{{ booking.email }}</p>

              <div class="flex items-center justify-between gap-2 mt-2.5">
                <div>
                  <p class="text-sm font-medium text-slate-700">{{ booking.roomType }}</p>
                  <p class="text-xs text-slate-400">{{ booking.roomNumber }} · {{ booking.bookingId }}</p>
                </div>
              </div>

              <div class="flex items-center justify-between mt-2.5">
                <div class="flex items-center gap-1.5 text-xs text-slate-500">
                  <svg
                    class="w-3.5 h-3.5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {{ booking.checkIn }} – {{ booking.checkOut }}
                  <span class="text-slate-400">
                    ({{ booking.nights }} {{ booking.nights === 1 ? "Night" : "Nights" }})
                  </span>
                </div>

                <div class="flex items-center gap-1 -mr-1.5">
                  <template v-if="booking.status === 'Awaiting Approval'">
                    <button
                      type="button"
                      class="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                      :disabled="updatingBookingId === booking.id"
                      @click="updateBookingStatus(booking, 'confirmed')"
                    >
                      {{ updatingBookingId === booking.id ? "Saving..." : "Approve" }}
                    </button>
                    <button
                      type="button"
                      class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                      :disabled="updatingBookingId === booking.id"
                      @click="updateBookingStatus(booking, 'denied')"
                    >
                      Deny
                    </button>
                  </template>
                  <template v-else>
                  <button
                    v-if="booking.status !== 'Canceled'"
                    class="text-slate-400 hover:text-teal-600 hover:bg-teal-50/70 rounded-lg p-1.5 transition-all"
                    aria-label="Edit booking"
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
                        stroke-width="1.5"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 113 3L12 16l-4 1 1-4 9.5-9.5z"
                      />
                    </svg>
                  </button>
                  <button
                    v-else
                    class="text-slate-400 hover:text-teal-600 hover:bg-teal-50/70 rounded-lg p-1.5 transition-all"
                    aria-label="Restore booking"
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
                        stroke-width="1.5"
                        d="M3 12a9 9 0 1018 0 9 9 0 00-18 0zm0 0v-3m0 3h3M12 8v4l3 2"
                      />
                    </svg>
                  </button>
                  <button
                    class="text-slate-400 hover:text-slate-700 hover:bg-slate-100/70 rounded-lg p-1.5 transition-all"
                    aria-label="More actions"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                      />
                    </svg>
                  </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="paginatedBookings.length === 0"
          class="px-5 py-10 text-center text-slate-400 text-sm"
        >
          {{ emptyStateText }}
        </div>
      </div>

      <!-- Pagination (same pattern as overview dashboard) -->
      <div
        class="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-t border-slate-100/60 bg-slate-50/40"
      >
        <p class="text-xs text-slate-400 whitespace-nowrap">
          <span class="hidden sm:inline">Showing </span>
          <span class="font-medium text-slate-600"
            >{{ rangeStart }}–{{ rangeEnd }}</span
          >
          of
          <span class="font-medium text-slate-600">{{
            filteredBookings.length
          }}</span>
        </p>

        <div class="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
            :class="[
              'flex items-center gap-1 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full border transition-all',
              currentPage === 1
                ? 'text-slate-300 border-slate-200/60 cursor-not-allowed'
                : 'text-teal-600 border-teal-200/60 hover:bg-teal-50/60 hover:text-teal-800',
            ]"
          >
            <svg
              class="w-3.5 h-3.5"
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
            <span class="hidden sm:inline">Previous</span>
          </button>

          <span class="text-xs font-medium text-slate-500 px-1 whitespace-nowrap">
            <span class="hidden sm:inline">Page </span>{{ currentPage }}<span class="hidden sm:inline"> of {{ totalPages }}</span><span class="sm:hidden">/{{ totalPages }}</span>
          </span>

          <button
            type="button"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            :class="[
              'flex items-center gap-1 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full border transition-all',
              currentPage === totalPages
                ? 'text-slate-300 border-slate-200/60 cursor-not-allowed'
                : 'text-teal-600 border-teal-200/60 hover:bg-teal-50/60 hover:text-teal-800',
            ]"
          >
            <span class="hidden sm:inline">Next</span>
            <svg
              class="w-3.5 h-3.5"
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
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { fetchBookingsData } from "../../service/api/dashboard.js";
import { bookingApi } from "../../service/api/client.js";
const stats = ref({
  totalBookings: { value: 0 },
  checkInsToday: { value: 0 },
  pendingApproval: { value: 0 },
  occupancyRate: { value: 0 },
  revenue: { value: "USD 0", period: "MTD" },
});
const rawBookings = ref([]);
const isLoading = ref(false);
const updatingBookingId = ref(null);
const notice = ref({ type: "", message: "" });
const statusFilters = ["All Status", "Awaiting Approval", "Paid", "Confirmed", "Checked-in", "Canceled", "Denied", "Pending"];
async function loadBookings() {
  isLoading.value = true;
  notice.value = { type: "", message: "" };
  try {
    const data = await fetchBookingsData();
    stats.value = data.stats;
    rawBookings.value = data.bookings;
  } catch (err) {
    notice.value = {
      type: "error",
      message: err.message || "Could not load bookings. Please check the API connection.",
    };
  } finally {
    isLoading.value = false;
  }
}
async function updateBookingStatus(booking, status) {
  updatingBookingId.value = booking.id;
  notice.value = { type: "", message: "" };
  try {
    await bookingApi.update(booking.id, { status });
    await loadBookings();
    notice.value = {
      type: "success",
      message:
        status === "confirmed"
          ? `Booking ${booking.bookingId} approved. The guest can now check in.`
          : `Booking ${booking.bookingId} denied. The guest status page has been updated.`,
    };
  } catch (err) {
    notice.value = {
      type: "error",
      message: err.message || "Could not update this booking.",
    };
  } finally {
    updatingBookingId.value = null;
  }
}
const bookingsWithInitials = computed(() => rawBookings.value.map((booking) => ({
  ...booking,
  initials: booking.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
})));
const searchQuery = ref("");
const activeFilter = ref("All Status");
const filteredBookings = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return bookingsWithInitials.value.filter((booking) => {
    const matchesStatus = activeFilter.value === "All Status" || booking.status === activeFilter.value;
    const matchesSearch = query === "" || booking.name.toLowerCase().includes(query) || booking.email.toLowerCase().includes(query) || String(booking.bookingId).toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });
});
const emptyStateText = computed(() => {
  if (isLoading.value) return "Loading bookings...";
  if (notice.value.type === "error") return "Bookings could not be loaded.";
  return "No bookings match your search.";
});
const pageSize = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.max(1, Math.ceil(filteredBookings.value.length / pageSize)));
const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredBookings.value.slice(start, start + pageSize);
});
const rangeStart = computed(() => filteredBookings.value.length === 0 ? 0 : (currentPage.value - 1) * pageSize + 1);
const rangeEnd = computed(() => Math.min(currentPage.value * pageSize, filteredBookings.value.length));
function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}
watch([searchQuery, activeFilter], () => { currentPage.value = 1; });
watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) currentPage.value = newTotal;
});
const statusStyles = {
  Paid: "bg-emerald-50/80 text-emerald-700 border border-emerald-200/50",
  "Awaiting Approval": "bg-sky-50/80 text-sky-700 border border-sky-200/50",
  Confirmed: "bg-teal-50/80 text-teal-700 border border-teal-200/50",
  "Checked-in": "bg-amber-50/80 text-amber-700 border border-amber-200/50",
  Canceled: "bg-rose-50/80 text-rose-600 border border-rose-200/50",
  Denied: "bg-rose-50/80 text-rose-600 border border-rose-200/50",
  Pending: "bg-slate-50/80 text-slate-600 border border-slate-200/50",
};
onMounted(loadBookings);
</script>

<style>
* {
  transition: all 0.2s ease;
}
</style>
