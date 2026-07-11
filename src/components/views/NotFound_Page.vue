<template>
  <main class="flex min-h-[70vh] items-center bg-[#f7f8f6] px-6 py-20">
    <div class="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
      <div>
        <p class="text-sm font-bold uppercase tracking-[.25em] text-teal-700">Error 404</p>
        <h1 class="font-display mt-4 text-5xl leading-tight text-slate-950 sm:text-7xl">This room is<br />off the map.</h1>
        <p class="mt-6 max-w-lg text-lg leading-8 text-slate-500">The page you’re looking for may have moved, or the address may be incorrect. Let’s get you back somewhere comfortable.</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/" class="rounded-full bg-teal-800 px-6 py-3 text-sm font-bold text-white hover:bg-teal-900">Return home</RouterLink>
          <RouterLink to="/hotels" class="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:border-teal-700 hover:text-teal-800">Browse hotels</RouterLink>
        </div>
      </div>
      <div class="relative hidden lg:block">
        <div class="absolute -inset-5 rounded-[2.5rem] border border-teal-900/10"></div>
        <img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200&auto=format&fit=crop" alt="Quiet hotel lounge" class="h-[480px] w-full rounded-[2rem] object-cover shadow-2xl" />
      </div>
    </div>
  </main>
</template>
