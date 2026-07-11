<template>
  <nav
    class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-sm"
  >
    <div
      class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10"
    >
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex items-center gap-3 transition hover:opacity-90"
      >
        <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-800 text-white shadow-lg shadow-teal-900/15">
          <svg viewBox="0 0 32 32" class="h-7 w-7" fill="none" aria-hidden="true"><path d="M7 24V8h5v6h8V8h5v16h-5v-6h-8v6H7Z" fill="currentColor"/><path d="M4 26h24" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".6"/></svg>
        </div>

        <div>
          <h1 class="font-display text-2xl font-semibold text-slate-900">
            StayEasy
          </h1>
          <p class="text-xs tracking-widest text-slate-400 uppercase">
            Luxury Booking
          </p>
        </div>
      </RouterLink>

      <!-- Navigation -->
      <ul class="hidden items-center gap-10 text-sm font-medium md:flex">
        <li>
          <RouterLink
            to="/"
            class="group relative transition"
            :class="
              $route.path === '/'
                ? 'text-teal-700'
                : 'text-slate-700 hover:text-teal-700'
            "
          >
            Home

            <span
              class="absolute left-0 -bottom-2 h-[2px] w-full origin-left rounded-full bg-teal-600 transition-transform duration-300"
              :class="
                $route.path === '/'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              "
            ></span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/hotels"
            class="group relative transition"
            :class="
              $route.path === '/hotels'
                ? 'text-teal-700'
                : 'text-slate-700 hover:text-teal-700'
            "
          >
            Hotels

            <span
              class="absolute left-0 -bottom-2 h-[2px] w-full origin-left rounded-full bg-teal-600 transition-transform duration-300"
              :class="
                $route.path === '/hotels'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              "
            ></span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/contact"
            class="group relative transition"
            :class="
              $route.path === '/contact'
                ? 'text-teal-700'
                : 'text-slate-700 hover:text-teal-700'
            "
          >
            Contact

            <span
              class="absolute left-0 -bottom-2 h-[2px] w-full origin-left rounded-full bg-teal-600 transition-transform duration-300"
              :class="
                $route.path === '/contact'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              "
            ></span>
          </RouterLink>
        </li>
      </ul>

      <!-- Right Side -->
      <div class="flex items-center gap-4">
        <!-- Book Button -->
        <RouterLink
          to="/hotels"
          class="hidden rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-teal-800 lg:block"
        >
          Book Now
        </RouterLink>

        <RouterLink
          v-if="!isAuthenticated"
          to="/login"
          class="hidden rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-700 hover:text-teal-800 sm:inline-flex"
        >
          Login
        </RouterLink>

        <RouterLink
          v-if="!isAuthenticated"
          to="/register"
          class="hidden rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:inline-flex"
        >
          Register
        </RouterLink>

        <div v-else class="relative">
          <button
            class="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-sm transition hover:border-teal-500"
            @click="isAccountOpen = !isAccountOpen"
          >
            <span
              class="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-teal-700 text-xs font-semibold text-white ring-2 ring-teal-500/30"
            >
              <img
                v-if="showAvatarImage"
                :src="user.avatar"
                :alt="user.fullName"
                class="h-full w-full object-cover"
                @error="avatarFailed = true"
              />
              <span v-else aria-hidden="true">{{ userInitials }}</span>
              <span
                class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"
              ></span>
            </span>
            <span class="hidden max-w-28 truncate text-sm font-semibold text-slate-700 sm:block">
              {{ user.fullName }}
            </span>
          </button>

          <div
            v-if="isAccountOpen"
            class="absolute right-0 mt-3 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
          >
            <div class="border-b border-slate-100 px-3 py-2">
              <p class="truncate text-sm font-semibold text-slate-900">{{ user.fullName }}</p>
              <p class="truncate text-xs text-slate-500">{{ user.email }}</p>
            </div>
            <RouterLink
              v-if="isAdmin"
              to="/dashboard"
              class="mt-2 block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              @click="isAccountOpen = false"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/hotels"
              class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              @click="isAccountOpen = false"
            >
              Browse hotels
            </RouterLink>
            <button
              type="button"
              class="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
              @click="handleLogout"
            >
              Logout
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <button
          :aria-expanded="isMobileOpen"
          aria-label="Toggle navigation"
          class="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
          @click="isMobileOpen = !isMobileOpen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="isMobileOpen"
      class="border-t border-slate-200 bg-white px-6 py-4 shadow-sm md:hidden"
    >
      <div class="flex flex-col gap-2 text-sm font-semibold text-slate-700">
        <RouterLink to="/" class="rounded-lg px-3 py-2 hover:bg-slate-50" @click="isMobileOpen = false">
          Home
        </RouterLink>
        <RouterLink to="/hotels" class="rounded-lg px-3 py-2 hover:bg-slate-50" @click="isMobileOpen = false">
          Hotels
        </RouterLink>
        <RouterLink to="/contact" class="rounded-lg px-3 py-2 hover:bg-slate-50" @click="isMobileOpen = false">
          Contact
        </RouterLink>
        <RouterLink
          v-if="isAdmin"
          to="/dashboard"
          class="rounded-lg px-3 py-2 hover:bg-slate-50"
          @click="isMobileOpen = false"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          to="/login"
          class="rounded-lg px-3 py-2 hover:bg-slate-50"
          @click="isMobileOpen = false"
        >
          Login
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          to="/register"
          class="rounded-lg bg-teal-800 px-3 py-2 text-white"
          @click="isMobileOpen = false"
        >
          Register
        </RouterLink>
        <button
          v-if="isAuthenticated"
          type="button"
          class="rounded-lg px-3 py-2 text-left text-rose-600 hover:bg-rose-50"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../service/auth.js";

const router = useRouter();
const auth = useAuth();
const user = auth.user;
const isAuthenticated = auth.isAuthenticated;
const isAdmin = auth.isAdmin;
const isAccountOpen = ref(false);
const isMobileOpen = ref(false);
const avatarFailed = ref(false);

const userInitials = computed(() => {
  const name = user.value?.fullName || user.value?.name || user.value?.email || "Guest";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
});

const showAvatarImage = computed(() => Boolean(user.value?.avatar) && !avatarFailed.value);

watch(
  () => user.value?.avatar,
  () => {
    avatarFailed.value = false;
  },
);

function handleLogout() {
  auth.logout();
  isAccountOpen.value = false;
  isMobileOpen.value = false;
  router.push("/");
}
</script>

<style scoped>
.font-display {
  font-family: "Fraunces", serif;
}
</style>
