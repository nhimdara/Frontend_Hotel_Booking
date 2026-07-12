<template>
  <section class="bg-white px-5 py-16 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p class="text-xs font-bold uppercase tracking-[.28em] text-teal-700">Simple by design</p>
          <h2 class="font-display mt-3 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">From “maybe” to checked in.</h2>
          <p class="mt-5 leading-8 text-slate-500">A calm booking experience with the important details visible at every step.</p>
          <div class="mt-9 space-y-7">
            <div v-for="(step, index) in steps" :key="step.title" class="flex gap-5">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-teal-50 text-sm font-bold text-teal-800">0{{ index + 1 }}</span>
              <div><h3 class="font-semibold text-slate-900">{{ step.title }}</h3><p class="mt-1 text-sm leading-6 text-slate-500">{{ step.text }}</p></div>
            </div>
          </div>
          <RouterLink to="/hotels" class="mt-9 inline-flex items-center gap-2 rounded-full bg-teal-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-teal-900">Start exploring <span>→</span></RouterLink>
        </div>

        <div class="relative rounded-[2rem] bg-teal-950 p-6 text-white shadow-2xl shadow-teal-950/15 sm:p-10">
          <div class="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-teal-400/20 blur-3xl" />
          <div class="relative">
            <div class="flex items-center justify-between"><div><p class="text-xs font-bold uppercase tracking-[.2em] text-teal-300">Guest favorites</p><h3 class="font-display mt-2 text-3xl">The little things matter.</h3></div><span class="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70">4.8 ★ average</span></div>
            <div class="mt-8 grid gap-4 sm:grid-cols-2">
              <article v-for="perk in perks" :key="perk.title" class="rounded-2xl border border-white/10 bg-white/[.06] p-5 backdrop-blur">
                <span class="text-2xl">{{ perk.icon }}</span><h4 class="mt-4 font-semibold">{{ perk.title }}</h4><p class="mt-2 text-sm leading-6 text-white/55">{{ perk.text }}</p>
              </article>
            </div>
            <blockquote class="mt-5 rounded-2xl bg-amber-300 p-6 text-slate-950"><p class="font-display text-xl leading-8">“Everything felt clear—from choosing our room to receiving the confirmation.”</p><footer class="mt-4 text-xs font-bold uppercase tracking-[.18em] text-slate-700">Dara · Verified guest</footer></blockquote>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { title: "Find the right place", text: "Search by destination, dates, guests, price, and rating." },
  { title: "Choose your room", text: "Compare real room details, amenities, capacity, and nightly price." },
  { title: "Book with confidence", text: "Review your stay, add guest details, pay, and receive confirmation." },
];
const perks = [
  { icon: "◇", title: "Clear prices", text: "See the important costs before you confirm." },
  { icon: "✓", title: "Verified stays", text: "Useful property and room information." },
  { icon: "↻", title: "Flexible choices", text: "Booking options designed around real trips." },
  { icon: "☏", title: "Human support", text: "Help is available when plans need attention." },
];
</script>
