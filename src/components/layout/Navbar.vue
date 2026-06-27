<template>
  <nav class="relative z-30 w-full bg-white/95 backdrop-blur-sm">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
      <a href="/" class="font-display text-2xl font-semibold tracking-tight text-teal-900">
        StayEasy
      </a>

      <ul class="hidden items-center gap-9 text-sm font-medium text-slate-700 md:flex">
        <li>
          <a href="#" class="relative pb-1 text-teal-800">
            Home
            <span class="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-teal-800" />
          </a>
        </li>
        <li><a href="#" class="pb-1 transition-colors hover:text-teal-800">Search</a></li>
        <li><a href="#" class="pb-1 transition-colors hover:text-teal-800">Bookings</a></li>
        <li><a href="#" class="pb-1 transition-colors hover:text-teal-800">Support</a></li>
      </ul>

      <button
        type="button"
        class="h-10 w-10 overflow-hidden rounded-full ring-2 ring-teal-700/30 transition hover:ring-teal-700 focus:outline-none focus-visible:ring-teal-700"
      >
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="Account"
          class="h-full w-full object-cover"
        />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.font-display {
  font-family: "Fraunces", ui-serif, Georgia, serif;
}
</style>