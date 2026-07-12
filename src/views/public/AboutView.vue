<template>
  <main class="bg-white">
    <section class="bg-teal-950 px-6 py-24 text-center text-white"><p class="text-xs font-bold uppercase tracking-[.3em] text-teal-300">Our story</p><h1 class="font-display mx-auto mt-4 max-w-3xl text-4xl sm:text-6xl">Thoughtful stays, made simple.</h1><p class="mx-auto mt-6 max-w-2xl leading-8 text-white/65">StayEasy connects travelers with carefully selected hotels through clear pricing, trusted information, and dependable support.</p></section>
    <section class="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-3"><article v-for="item in values" :key="item.title" class="rounded-3xl bg-slate-50 p-8"><span class="text-3xl">{{ item.icon }}</span><h2 class="mt-5 text-xl font-semibold text-slate-900">{{ item.title }}</h2><p class="mt-3 leading-7 text-slate-500">{{ item.text }}</p></article></section>
  </main>
</template>
<script setup>const values=[{icon:'✓',title:'Verified quality',text:'Properties and room information are reviewed for accuracy.'},{icon:'◇',title:'Clear booking',text:'Simple choices, transparent prices, and no unnecessary booking stress.'},{icon:'♡',title:'Guest first',text:'Helpful support before, during, and after every stay.'}];</script>
