<template>
  <main
    class="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10"
  >
    <div
      class="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/60"
    >
      <div class="grid md:grid-cols-2">
        <!-- Image: capped height, rounded, no longer stretches full viewport -->
        <div class="relative h-64 md:h-full">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80"
            alt="Luxury hotel lobby"
            class="h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"
          ></div>
          <div class="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
            <p
              class="text-xs font-semibold uppercase tracking-[0.25em] text-teal-200"
            >
              StayEasy
            </p>
            <h1 class="mt-2 text-2xl font-bold leading-tight md:text-3xl">
              Welcome back to better stays.
            </h1>
            <p class="mt-2 hidden text-sm leading-6 text-white/80 md:block">
              Sign in as a guest to continue booking, or use the admin demo to
              manage rooms, bookings, guests, and settings.
            </p>
          </div>
        </div>

        <!-- Form -->
        <div class="flex items-center justify-center px-8 py-12 md:px-14">
          <div class="w-full max-w-md">
            <div class="mb-6">
              <p
                class="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700"
              >
                Account access
              </p>
              <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Login
              </h2>
              <p class="mt-1.5 text-sm text-slate-500">
                Use your account to book hotels or enter the admin dashboard.
              </p>
            </div>

            <form class="space-y-4" novalidate @submit.prevent="submit">
              <div>
                <label
                  class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  Email
                </label>
                <input
                  v-model.trim="form.email"
                  type="email"
                  autocomplete="email"
                  :aria-invalid="!!fieldErrors.email"
                  :class="inputClass(fieldErrors.email)"
                  placeholder="you@example.com"
                  @blur="touched.email = true"
                  @input="error = ''"
                />
                <p
                  v-if="fieldErrors.email"
                  class="mt-1.5 text-xs font-medium text-rose-600"
                >
                  {{ fieldErrors.email }}
                </p>
              </div>

              <div>
                <label
                  class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  Password
                </label>
                <div class="relative">
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="current-password"
                    :aria-invalid="!!fieldErrors.password"
                    :class="[inputClass(fieldErrors.password), 'pr-11']"
                    placeholder="Enter password"
                    @blur="touched.password = true"
                    @input="error = ''"
                  />
                  <button
                    type="button"
                    tabindex="-1"
                    class="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 transition hover:text-slate-600"
                    :aria-label="
                      showPassword ? 'Hide password' : 'Show password'
                    "
                    @click="showPassword = !showPassword"
                  >
                    <svg
                      v-if="!showPassword"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path
                        d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 7 11 7a13.16 13.16 0 0 1-1.67 2.68"
                      />
                      <path
                        d="M6.61 6.61A13.526 13.526 0 0 0 1 12s4 7 11 7a9.74 9.74 0 0 0 5.39-1.61"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
                <p
                  v-if="fieldErrors.password"
                  class="mt-1.5 text-xs font-medium text-rose-600"
                >
                  {{ fieldErrors.password }}
                </p>
              </div>

              <p
                v-if="error"
                class="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700"
              >
                {{ error }}
              </p>

              <button
                type="submit"
                :disabled="loading"
                class="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-teal-800 text-sm font-bold text-white shadow-sm transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:bg-teal-800/60"
              >
                <svg
                  v-if="loading"
                  class="h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                {{ loading ? "Signing in..." : "Login" }}
              </button>
            </form>

            <button
              type="button"
              :disabled="loading"
              class="mt-3 h-11 w-full rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-teal-700 hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
              @click="fillAdmin"
            >
              Use admin demo
            </button>

            <p class="mt-5 text-center text-sm text-slate-500">
              New here?
              <RouterLink
                to="/register"
                class="font-semibold text-teal-700 hover:text-teal-900"
              >
                Create an account
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "../../service/auth.js";

const router = useRouter();
const route = useRoute();
const auth = useAuth();

const error = ref("");
const loading = ref(false);
const showPassword = ref(false);

const form = reactive({
  email: "",
  password: "",
});

const touched = reactive({
  email: false,
  password: false,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldErrors = computed(() => {
  const errs = {};
  if (touched.email) {
    if (!form.email) errs.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email))
      errs.email = "Enter a valid email address.";
  }
  if (touched.password) {
    if (!form.password) errs.password = "Password is required.";
  }
  return errs;
});

function inputClass(hasError) {
  return [
    "h-12 w-full rounded-lg border bg-white px-4 text-sm text-slate-800 outline-none transition focus:ring-4",
    hasError
      ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100"
      : "border-slate-200 focus:border-teal-500 focus:ring-teal-100",
  ];
}

function validate() {
  touched.email = true;
  touched.password = true;
  return !fieldErrors.value.email && !fieldErrors.value.password;
}

function redirectAfterLogin(user) {
  const redirect = route.query.redirect;

  if (redirect) {
    router.push(String(redirect));
    return;
  }
  router.push(user.role === "admin" ? "/dashboard" : "/hotels");
}

async function submit() {
  error.value = "";
  if (!validate()) return;

  loading.value = true;
  try {
    const user = await Promise.resolve(auth.login(form.email, form.password));
    redirectAfterLogin(user);
  } catch (err) {
    error.value = err.message || "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
}

function fillAdmin() {
  form.email = "admin@stayeasy.com";
  form.password = "password";
  touched.email = false;
  touched.password = false;
  error.value = "";
}
</script>
