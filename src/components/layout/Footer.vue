<template>
  <footer class="bg-slate-950 text-gray-300">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">

      <!-- Top -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

        <!-- Brand -->
        <div>
          <h2 class="text-3xl font-bold text-teal-400">
            StayEasy
          </h2>

          <p class="mt-6 text-gray-400 leading-8">
            Crafting peaceful retreats and premium hospitality
            experiences for the modern traveler. Experience curated
            luxury in the world's most beautiful destinations.
          </p>

          <!-- Social -->
          <div class="flex gap-4 mt-8">

            <!-- Website -->
            <a
              href="#"
              class="w-12 h-12 rounded-full bg-slate-800 hover:bg-teal-500 transition-all duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10m0-20C9.5 4.7 8 8.2 8 12s1.5 7.3 4 10m-8-10h16"
                />
              </svg>
            </a>

            <!-- Email -->
            <a
              href="#"
              class="w-12 h-12 rounded-full bg-slate-800 hover:bg-teal-500 transition-all duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>

            <!-- Phone -->
            <a
              href="#"
              class="w-12 h-12 rounded-full bg-slate-800 hover:bg-teal-500 transition-all duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3l2 5-2 2a16 16 0 008 8l2-2 5 2v3a2 2 0 01-2 2h-1C10.3 23 1 13.7 1 2V1"
                />
              </svg>
            </a>

          </div>
        </div>

        <!-- Discover -->
        <div>
          <h3 class="uppercase tracking-[4px] text-sm font-semibold text-white mb-8">
            Discover
          </h3>

          <ul class="space-y-5">
            <li v-for="item in discover" :key="item">
              <RouterLink
                :to="item.to"
                class="text-gray-400 hover:text-teal-400 transition duration-300"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="uppercase tracking-[4px] text-sm font-semibold text-white mb-8">
            Support
          </h3>

          <ul class="space-y-5">
            <li v-for="item in support" :key="item">
              <RouterLink
                :to="item.to"
                class="text-gray-400 hover:text-teal-400 transition duration-300"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="uppercase tracking-[4px] text-sm font-semibold text-white mb-8">
            Newsletter
          </h3>

          <p class="text-gray-400 mb-6">
            Join our mailing list for exclusive member rates,
            hotel offers, and travel inspiration.
          </p>

          <form class="space-y-4">

            <input
              type="email"
              placeholder="Email address"
              class="w-full px-5 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 outline-none focus:border-teal-400"
            />

            <button
              class="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold py-4 rounded-xl transition duration-300"
            >
              Subscribe
            </button>

          </form>
        </div>

      </div>

      <!-- Bottom -->
      <div class="border-t border-slate-800 mt-16 pt-8">

        <div
          class="flex flex-col md:flex-row justify-between items-center gap-5"
        >

          <p class="text-gray-500 text-sm">
            © {{ year }} StayEasy Hospitality Group. All rights reserved.
          </p>

          <div class="flex flex-wrap gap-8 text-sm">
            <a
              href="#"
              class="text-gray-400 hover:text-teal-400 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              class="text-gray-400 hover:text-teal-400 transition"
            >
              Terms of Service
            </a>

            <a
              href="#"
              class="text-gray-400 hover:text-teal-400 transition"
            >
              Cookie Settings
            </a>
          </div>

        </div>

      </div>

    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();

const discover = [
  { label: "Our Story", to: "/" },
  { label: "Hotels & Resorts", to: "/hotels" },
  { label: "Loyalty Program", to: "/register" },
  { label: "Careers", to: "/contact" },
];

const support = [
  { label: "Help Center", to: "/contact" },
  { label: "Contact Us", to: "/contact" },
  { label: "Reservation Guide", to: "/hotels" },
  { label: "Sitemap", to: "/" },
];
</script>
