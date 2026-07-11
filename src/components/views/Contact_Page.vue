<template>
  <main class="min-h-screen bg-slate-50 text-slate-900">
    <section class="relative overflow-hidden bg-slate-950">
      <img
        src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80"
        alt="Hotel reception desk"
        class="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/20"></div>

      <div class="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div class="max-w-2xl text-white">
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-teal-200">
            Contact StayEasy
          </p>
          <h1 class="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            We are here before, during, and after your stay.
          </h1>
          <p class="mt-5 max-w-xl text-base leading-7 text-white/80">
            Ask about a reservation, request hotel support, or speak with our
            hospitality team about your next trip.
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div class="grid gap-5 md:grid-cols-3">
        <article
          v-for="item in contactCards"
          :key="item.title"
          class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div
            class="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700"
          >
            <component :is="item.icon" class="h-5 w-5" />
          </div>
          <h2 class="text-lg font-bold text-slate-950">{{ item.title }}</h2>
          <p class="mt-2 text-sm leading-6 text-slate-500">
            {{ item.description }}
          </p>
          <a
            :href="item.href"
            class="mt-4 inline-flex text-sm font-bold text-teal-700 hover:text-teal-900"
          >
            {{ item.value }}
          </a>
        </article>
      </div>

      <div class="mt-10 grid gap-8 lg:grid-cols-[1fr_0.78fr]">
        <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div class="mb-7">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              Send a message
            </p>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              How can we help?
            </h2>
          </div>

          <form class="grid gap-5" @submit.prevent="submitForm">
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Full name
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Topic
                </label>
                <select
                  v-model="form.topic"
                  class="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                >
                  <option v-for="topic in topics" :key="topic" :value="topic">
                    {{ topic }}
                  </option>
                </select>
              </div>

              <div>
                <label class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Booking ID
                </label>
                <input
                  v-model="form.bookingId"
                  type="text"
                  class="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Message
              </label>
              <textarea
                v-model="form.message"
                required
                rows="6"
                class="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="Tell us what you need help with"
              ></textarea>
            </div>

            <p
              v-if="sent"
              class="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
            >
              Message ready. Our hospitality team will follow up shortly.
            </p>

            <button
              type="submit"
              class="h-12 rounded-lg bg-teal-800 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-teal-900 md:w-fit"
            >
              Send message
            </button>
          </form>
        </section>

        <aside class="space-y-5">
          <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 class="text-lg font-bold text-slate-950">Guest support hours</h2>
            <div class="mt-5 space-y-4">
              <div
                v-for="row in hours"
                :key="row.label"
                class="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0"
              >
                <span class="text-sm font-medium text-slate-500">{{ row.label }}</span>
                <span class="text-sm font-bold text-slate-900">{{ row.value }}</span>
              </div>
            </div>
          </section>

          <section class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="h-56 bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=80"
                alt="StayEasy hotel exterior"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="p-6">
              <h2 class="text-lg font-bold text-slate-950">StayEasy Hospitality</h2>
              <p class="mt-2 text-sm leading-6 text-slate-500">
                18 Riverside Avenue, Phnom Penh, Cambodia
              </p>
              <RouterLink
                to="/hotels"
                class="mt-5 inline-flex rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-teal-700 hover:text-teal-800"
              >
                Browse hotels
              </RouterLink>
            </div>
          </section>
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup>
import { h, reactive, ref } from "vue";

const topics = [
  "Reservation support",
  "Payment question",
  "Hotel partnership",
  "Admin support",
  "General question",
];

const form = reactive({
  name: "",
  email: "",
  topic: topics[0],
  bookingId: "",
  message: "",
});

const sent = ref(false);

function submitForm() {
  sent.value = true;
}

const PhoneIcon = {
  render: () =>
    h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "stroke-width": "2" }, [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M3 5a2 2 0 012-2h3l2 5-2 2a16 16 0 008 8l2-2 5 2v3a2 2 0 01-2 2h-1C10.3 23 1 13.7 1 2V1",
      }),
    ]),
};

const MailIcon = {
  render: () =>
    h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "stroke-width": "2" }, [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      }),
    ]),
};

const LocationIcon = {
  render: () =>
    h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "stroke-width": "2" }, [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z",
      }),
      h("circle", { cx: "12", cy: "10", r: "3" }),
    ]),
};

const contactCards = [
  {
    title: "Call reservations",
    description: "Talk with our booking team for trip changes and urgent help.",
    value: "+855 23 555 018",
    href: "tel:+85523555018",
    icon: PhoneIcon,
  },
  {
    title: "Email support",
    description: "Send documents, payment questions, or guest requests.",
    value: "support@stayeasy.com",
    href: "mailto:support@stayeasy.com",
    icon: MailIcon,
  },
  {
    title: "Visit our office",
    description: "Meet our hospitality team in central Phnom Penh.",
    value: "View location",
    href: "#",
    icon: LocationIcon,
  },
];

const hours = [
  { label: "Monday to Friday", value: "8:00 AM - 9:00 PM" },
  { label: "Saturday", value: "9:00 AM - 6:00 PM" },
  { label: "Sunday", value: "10:00 AM - 4:00 PM" },
  { label: "Emergency support", value: "24 hours" },
];
</script>
