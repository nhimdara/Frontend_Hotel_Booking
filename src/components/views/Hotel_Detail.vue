<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <!-- Header / Title -->
    <div class="max-w-5xl mx-auto px-4 pt-6 pb-2">
      <div class="flex items-start justify-between">
        <div>
          <span class="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
            ⭐ Editor's Choice
          </span>
          <h1 class="text-3xl font-bold text-gray-900 leading-tight">Azure Sanctuary Resort</h1>
          <p class="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
            North Malé Atoll, Maldives
          </p>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <button class="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            Share
          </button>
          <button class="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Photo Gallery -->
    <div class="max-w-5xl mx-auto px-4 mt-4">
      <div class="grid grid-cols-3 grid-rows-2 gap-2 h-72 rounded-2xl overflow-hidden">
        <!-- Large left image -->
        <div class="row-span-2 bg-gradient-to-br from-orange-300 via-pink-400 to-purple-600 relative">
          <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80" alt="Resort sunset" class="w-full h-full object-cover"/>
        </div>
        <!-- Top middle -->
        <div class="bg-cyan-400">
          <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80" alt="Ocean" class="w-full h-full object-cover"/>
        </div>
        <!-- Top right -->
        <div class="bg-amber-200">
          <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80" alt="Room" class="w-full h-full object-cover"/>
        </div>
        <!-- Bottom middle -->
        <div class="bg-blue-700">
          <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80" alt="Underwater" class="w-full h-full object-cover"/>
        </div>
        <!-- Bottom right with count overlay -->
        <div class="relative bg-teal-500">
          <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80" alt="Lagoon" class="w-full h-full object-cover"/>
          <button class="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition">
            <span class="text-white font-semibold text-sm flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
              View 24+ Photos
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-3 gap-8">
      <!-- Left Column -->
      <div class="col-span-2 space-y-8">

        <!-- Description -->
        <div>
          <h2 class="text-lg font-bold text-cyan-600 mb-2">An Escape to Eternal Azure</h2>
          <p class="text-gray-600 text-sm leading-relaxed">
            Tucked away in the pristine North Malé Atoll, the Azure Sanctuary Resort is a masterclass in modern tropical architecture. Designed as a seamless extension of the horizon, every villa offers an unobstructed view of the Indian Ocean. Our "Editorial's Choice" for 2024, this resort combines sustainable luxury with a boutique concierge service that anticipates your every need before you even whisper it.
          </p>
          <div class="flex items-center gap-3 mt-3">
            <span class="flex items-center gap-1 text-xs text-green-600 font-medium border border-green-200 bg-green-50 rounded-full px-2.5 py-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Best Rate Guaranteed
            </span>
            <span class="flex items-center gap-1 text-xs text-emerald-600 font-medium border border-emerald-200 bg-emerald-50 rounded-full px-2.5 py-1">
              🌿 Eco-Certified Gold
            </span>
          </div>
        </div>

        <!-- Amenities -->
        <div>
          <h3 class="text-base font-bold text-gray-900 mb-4">Curated Amenities</h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="amenity in amenities" :key="amenity.name" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 flex-shrink-0 mt-0.5">
                <span v-html="amenity.icon"></span>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ amenity.name }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ amenity.sub }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Location -->
        <div>
          <h3 class="text-base font-bold text-gray-900 mb-3">Location</h3>
          <div class="rounded-2xl overflow-hidden h-52 bg-gradient-to-br from-amber-100 to-orange-200 relative">
            <!-- Map placeholder -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-full h-full bg-cover bg-center opacity-60" style="background-image: url('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/73.4,4.2,9,0/600x300?access_token=placeholder')"></div>
              <div class="absolute w-4 h-4 bg-cyan-500 rounded-full border-2 border-white shadow-lg"></div>
            </div>
            <!-- Speedboat badge -->
            <div class="absolute bottom-3 left-3 bg-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-md">
              <div class="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M21 14l-9-9-9 9v7h6v-4h6v4h6v-7z"/></svg>
              </div>
              <div>
                <p class="text-xs font-bold text-gray-800">Speedboat Access</p>
                <p class="text-xs text-gray-500">45-min from Velana Intl. Airport</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Choose Your Room -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <div>
              <h3 class="text-base font-bold text-gray-900">Choose Your Room</h3>
              <p class="text-xs text-gray-500">Every sanctuary is uniquely curated for absolute serenity.</p>
            </div>
            <div class="flex gap-1.5">
              <button class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3 mt-4">
            <div v-for="room in rooms" :key="room.name" class="rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition group">
              <div class="relative h-36 overflow-hidden">
                <img :src="room.image" :alt="room.name" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                <span v-if="room.badge" :class="room.badgeColor" class="absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {{ room.badge }}
                </span>
              </div>
              <div class="p-3">
                <h4 class="text-sm font-bold text-gray-900">{{ room.name }}</h4>
                <p class="text-xs text-gray-500 mt-0.5">{{ room.desc }}</p>
                <div class="flex items-center gap-2 mt-2 text-xs text-gray-500 flex-wrap">
                  <span>📐 {{ room.size }}</span>
                  <span>🛏 {{ room.bed }}</span>
                  <span>👤 Max {{ room.max }}</span>
                </div>
                <div class="flex items-center justify-between mt-3">
                  <div>
                    <span class="text-base font-bold text-gray-900">${{ room.price }}</span>
                    <span class="text-xs text-gray-500"> /night</span>
                  </div>
                  <button class="bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column: Booking Card -->
      <div class="col-span-1">
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-6">
          <div class="flex items-center justify-between mb-1">
            <div>
              <span class="text-2xl font-bold text-gray-900">$580</span>
              <span class="text-sm text-gray-500"> /night</span>
            </div>
            <div class="flex items-center gap-1 text-sm">
              <span class="text-yellow-400">★</span>
              <span class="font-semibold text-gray-900">4.9</span>
              <span class="text-gray-400 text-xs">(124 reviews)</span>
            </div>
          </div>

          <div class="mt-4 border border-gray-200 rounded-xl overflow-hidden">
            <div class="grid grid-cols-2 divide-x divide-gray-200">
              <div class="p-3">
                <p class="text-xs text-gray-500 font-semibold uppercase tracking-wide">Check-in</p>
                <p class="text-sm font-bold text-gray-800 mt-0.5">Oct 24, 2024</p>
              </div>
              <div class="p-3">
                <p class="text-xs text-gray-500 font-semibold uppercase tracking-wide">Check-out</p>
                <p class="text-sm font-bold text-gray-800 mt-0.5">Oct 30, 2024</p>
              </div>
            </div>
            <div class="border-t border-gray-200 p-3 flex items-center justify-between">
              <div>
                <p class="text-xs text-gray-500 font-semibold uppercase tracking-wide">Guests</p>
                <p class="text-sm font-bold text-gray-800 mt-0.5">2 Adults, 1 Child</p>
              </div>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>

          <button class="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition text-sm">
            Reserve Now
          </button>

          <div class="mt-4 space-y-2 text-sm text-gray-600">
            <div class="flex justify-between">
              <span>$580 × 6 nights</span>
              <span class="font-medium text-gray-800">$3,480</span>
            </div>
            <div class="flex justify-between">
              <span>Cleaning fee</span>
              <span class="font-medium text-gray-800">$120</span>
            </div>
            <div class="flex justify-between">
              <span>Service fee</span>
              <span class="font-medium text-gray-800">$85</span>
            </div>
            <div class="border-t border-gray-100 pt-2 flex justify-between">
              <span class="font-bold text-gray-900">Total</span>
              <span class="font-bold text-gray-900">$3,685</span>
            </div>
          </div>

          <p class="text-center text-xs text-gray-400 mt-3">You won't be charged yet</p>
        </div>
      </div>
    </div>

    <div class="h-16"></div>
  </div>
</template>

<script setup>
const amenities = [
  {
    name: 'Infinity Pool',
    sub: 'Temperature controlled',
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>'
  },
  {
    name: 'Wellness Spa',
    sub: 'Signature therapies',
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>'
  },
  {
    name: 'Fine Dining',
    sub: '3 Michelin concepts',
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>'
  },
  {
    name: 'Giga-Wifi',
    sub: 'Island-wide coverage',
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>'
  },
  {
    name: 'Active Center',
    sub: 'Outdoor water yoga',
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>'
  },
  {
    name: 'Moon Bar',
    sub: 'Craft cocktails',
    icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>'
  }
]

const rooms = [
  {
    name: 'Beachfront Sanctuary',
    desc: 'Private beach lagoon',
    size: '90m²',
    bed: 'King Bed',
    max: 3,
    price: 580,
    badge: 'Best Value',
    badgeColor: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80'
  },
  {
    name: 'Overwater Oasis',
    desc: 'Infinite horizon views',
    size: '145m²',
    bed: 'King Bed',
    max: 2,
    price: 720,
    badge: 'Editor\'s Pick',
    badgeColor: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80'
  },
  {
    name: 'Azure Grand Suite',
    desc: 'Private pool & butler service',
    size: '330m²',
    bed: '2x King',
    max: 4,
    price: 1450,
    badge: 'Ultra Luxury',
    badgeColor: 'bg-purple-600',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80'
  }
]
</script>