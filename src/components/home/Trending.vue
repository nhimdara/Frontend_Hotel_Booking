<template>
  <section
    class="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-14 sm:py-20 lg:py-24"
  >
    <!-- Background Decoration -->
    <div
      class="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-teal-100 opacity-30 blur-3xl sm:h-80 sm:w-80"
    ></div>

    <div
      class="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-cyan-100 opacity-20 blur-3xl sm:h-72 sm:w-72"
    ></div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <!-- LEFT CONTENT -->
        <div>
          <p
            class="uppercase tracking-[5px] text-xs font-semibold text-teal-700"
          >
            Our Promise
          </p>

          <h2
            class="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl xl:text-6xl"
          >
            Seamless stays
            <span class="block text-teal-700">for modern minds.</span>
          </h2>

          <p class="mt-5 max-w-xl text-base leading-7 text-gray-500 sm:mt-8 sm:text-lg sm:leading-9">
            Experience thoughtfully designed spaces, effortless booking, and
            exceptional hospitality that lets you focus on work, relaxation, and
            unforgettable travel experiences.
          </p>

          <!-- FEATURES -->
          <div class="mt-8 space-y-4 sm:mt-12 sm:space-y-5">
            <div
              v-for="(item, index) in promises"
              :key="index"
                class="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl sm:p-5"
            >
              <!-- ICON -->
              <div
                class="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-teal-700"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <!-- TEXT -->
              <div>
                <h4 class="font-semibold text-gray-800">
                  {{ item.title }}
                </h4>
                <p class="mt-1 text-sm text-gray-500">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT IMAGE GRID -->
        <div class="grid grid-cols-2 gap-3 sm:gap-5">
          <!-- Image 1 -->
          <div
            class="group relative h-44 overflow-hidden rounded-2xl shadow-xl sm:h-64 sm:rounded-3xl"
          >
            <img
              :src="images[0]"
              class="w-full h-full object-cover duration-700 group-hover:scale-110"
              alt="Luxury stay 1"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent"
            ></div>
          </div>

          <!-- Image 2 (tall) -->
          <div
            class="group relative row-span-2 h-[380px] overflow-hidden rounded-2xl shadow-xl sm:h-[540px] sm:rounded-3xl"
          >
            <img
              :src="images[1]"
              class="w-full h-full object-cover duration-700 group-hover:scale-110"
              alt="Luxury stay 2"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent"
            ></div>
          </div>

          <!-- Image 3 -->
          <div
            class="group relative h-44 overflow-hidden rounded-2xl shadow-xl sm:h-64 sm:rounded-3xl"
          >
            <img
              :src="images[2]"
              class="w-full h-full object-cover duration-700 group-hover:scale-110"
              alt="Luxury stay 3"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent"
            ></div>
          </div>

          <!-- Image 4 -->
          <div
            class="group relative col-span-2 h-44 overflow-hidden rounded-2xl shadow-xl sm:h-64 sm:rounded-3xl lg:col-span-1"
          >
            <img
              :src="images[3]"
              class="w-full h-full object-cover duration-700 group-hover:scale-110"
              alt="Luxury stay 4"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const promises = [
  {
    title: "Curated Workspaces",
    description:
      "Designed for productivity with high-speed Wi-Fi and comfortable working environments.",
  },
  {
    title: "24/7 Digital Concierge",
    description:
      "Our dedicated support team is always available whenever you need assistance.",
  },
  {
    title: "Premium Amenities",
    description:
      "Luxury facilities including spa, pool, fitness center, and complimentary services.",
  },
];

const images = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
];
</script>
