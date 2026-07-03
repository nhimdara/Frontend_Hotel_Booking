<template>
  <div class="flex h-screen bg-slate-100 overflow-hidden">
    <!-- Mobile / tablet overlay -->
    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-slate-900/40 z-30 lg:hidden"
        @click="isMobileMenuOpen = false"
      ></div>
    </transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:static inset-y-0 left-0 z-40 w-65 min-h-screen bg-slate-50 border-r border-slate-200 flex flex-col shadow-sm transition-transform duration-200 ease-out',
        isMobileMenuOpen
          ? 'translate-x-0'
          : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- User Profile -->
      <div class="px-7 pt-6 pb-5 border-b border-slate-200">
        <div class="flex items-center justify-between gap-3 mb-3">
          <div class="flex items-center gap-3">
            <img
              :src="user?.avatar"
              :alt="user?.fullName"
              class="w-10 h-10 rounded-full object-cover ring-2 ring-teal-400 ring-offset-1 shrink-0"
            />
            <div class="leading-tight">
              <p class="text-sm font-semibold text-slate-800">
                {{ user?.fullName }}
              </p>
              <p class="text-xs text-slate-500">{{ user?.title }}</p>
            </div>
          </div>
          <!-- Close button, mobile/tablet only -->
          <button
            @click="isMobileMenuOpen = false"
            class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition shrink-0"
            aria-label="Close menu"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p
          class="text-[10px] font-bold tracking-widest text-teal-600 uppercase"
        >
          Grand Plaza Hotel
        </p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          custom
          v-slot="{ isActive, navigate }"
        >
          <button
            @click="handleNavigate(navigate)"
            :class="[
              'relative w-full flex items-center gap-3 px-3 py-2.75 rounded-lg text-sm font-medium transition-all duration-150 group',
              isActive
                ? 'bg-teal-50 text-teal-700 shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700',
            ]"
          >
            <!-- Active indicator bar -->
            <span
              :class="[
                'absolute left-0 w-1 h-6 rounded-r-full transition-all duration-200',
                isActive ? 'bg-teal-500' : 'bg-transparent',
              ]"
            />
            <component
              :is="item.icon"
              :class="[
                'w-4 h-4 shrink-0 transition-colors',
                isActive
                  ? 'text-teal-600'
                  : 'text-slate-400 group-hover:text-slate-600',
              ]"
            />
            <span>{{ item.name }}</span>
          </button>
        </router-link>
      </nav>

      <!-- Footer -->
      <div class="px-5 py-4 border-t border-slate-200">
        <button
          type="button"
          class="mb-3 flex w-full items-center justify-center rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
          @click="handleLogout"
        >
          Logout
        </button>
        <p class="text-[10px] text-slate-400 text-center">HotelAdmin v2.1</p>
      </div>
    </aside>

    <!-- Main content area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Topbar -->
      <header
        class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shadow-sm shrink-0"
      >
        <div class="flex items-center gap-3">
          <!-- Hamburger, mobile/tablet only -->
          <button
            @click="isMobileMenuOpen = true"
            class="lg:hidden p-1.5 -ml-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
            aria-label="Open menu"
          >
            <svg
              class="w-5.5 h-5.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 class="text-sm font-semibold text-slate-700 tracking-wide">
            HotelAdmin
          </h1>
        </div>

        <div class="flex items-center gap-2 sm:gap-4">
          <!-- Search: full input on sm+, icon-only trigger on mobile -->
          <div class="relative hidden sm:block">
            <input
              type="text"
              placeholder="Quick search..."
              class="pl-8 pr-3 py-1.5 text-sm bg-slate-100 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent w-36 md:w-48 transition"
            />
            <svg
              class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </div>
          <button
            class="sm:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
            aria-label="Search"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </button>

          <!-- Bell -->
          <button
            class="relative p-1.5 rounded-lg hover:bg-slate-100 transition"
            aria-label="Notifications"
          >
            <svg
              class="w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              class="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white"
            ></span>
          </button>

          <!-- Avatar -->
          <img
            :src="user?.avatar"
            :alt="user?.fullName"
            class="w-8 h-8 rounded-full ring-2 ring-teal-400 cursor-pointer shrink-0"
          />
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { h, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../service/auth.js";

const isMobileMenuOpen = ref(false);
const router = useRouter();
const auth = useAuth();
const user = auth.user;

function handleNavigate(navigate) {
  navigate();
  isMobileMenuOpen.value = false;
}

function handleLogout() {
  auth.logout();
  router.push("/");
}

// Inline icon components (no extra deps needed)
import {
  DashboardIcon,
  BookingsIcon,
  GuestsIcon,
  HotelManagementIcon,
  RoomManagementIcon,
  SettingsIcon,
} from "./icons.js";

const navItems = [
  { name: "Overview", to: "/overview", icon: DashboardIcon },
  { name: "Bookings", to: "/bookings", icon: BookingsIcon },
  { name: "Guests", to: "/guests", icon: GuestsIcon },
  { name: "Hotel Management", to: "/hotel-management", icon: HotelManagementIcon },
  { name: "Room Management", to: "/room-management", icon: RoomManagementIcon },
  { name: "Settings", to: "/settings", icon: SettingsIcon },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
