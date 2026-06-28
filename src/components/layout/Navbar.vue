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
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 text-xl font-bold text-white shadow-lg"
        >
          🏨
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
          <a
            href="#"
            class="group relative text-slate-700 transition hover:text-teal-700"
          >
            Contact

            <span
              class="absolute left-0 -bottom-2 h-[2px] w-full origin-left scale-x-0 rounded-full bg-teal-600 transition-transform duration-300 group-hover:scale-x-100"
            ></span>
          </a>
        </li>
      </ul>

      <!-- Right Side -->
      <div class="flex items-center gap-5">
        <!-- Book Button -->
        <RouterLink
          to="/hotels"
          class="hidden rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-teal-800 lg:block"
        >
          Book Now
        </RouterLink>

        <!-- Profile -->
        <button
          class="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-teal-500/30 transition hover:ring-teal-600"
        >
          <img
            src="https://i.pravatar.cc/80?img=12"
            class="h-full w-full object-cover"
          />

          <!-- Online Badge -->
          <span
            class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"
          ></span>
        </button>

        <!-- Mobile Menu -->
        <button class="rounded-lg p-2 transition hover:bg-slate-100 md:hidden">
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
  </nav>
</template>

<style scoped>
.font-display {
  font-family: "Fraunces", serif;
}
</style>
