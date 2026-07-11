<template>
  <div class="min-h-screen bg-[#f5f9f9] px-4 py-10 font-sans text-[#111c1c] sm:px-6 lg:px-8">
    <div class="mx-auto max-w-4xl">
      <div class="mb-6">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#148080]">
          Reservation Status
        </p>
        <h1 class="mt-2 font-serif text-4xl font-normal tracking-tight sm:text-5xl">
          {{ pageTitle }}
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-[#526464]">
          Your booking is now with the hotel team for final approval. Most requests are reviewed within a few minutes.
        </p>
      </div>

      <div class="grid gap-5 lg:grid-cols-[1fr_320px]">
        <section class="rounded-2xl border border-[#dde8e8] bg-white p-5 shadow-sm sm:p-7">
          <div class="flex items-start gap-4">
            <div
              :class="[
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
                bookingStatus === 'denied' || bookingStatus === 'cancelled'
                  ? 'bg-rose-50 text-rose-600'
                  : bookingStatus === 'confirmed'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-[#e6f4f4] text-[#0d5c5c]',
              ]"
            >
              <svg v-if="bookingStatus === 'confirmed'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else-if="bookingStatus === 'denied' || bookingStatus === 'cancelled'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <svg v-else class="h-5 w-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="min-w-0">
              <h2 class="text-lg font-semibold">
                {{ statusTitle }}
              </h2>
              <p class="mt-1 text-sm leading-6 text-[#526464]">
                {{ statusCopy }}
              </p>
            </div>
          </div>

          <div class="mt-7 space-y-4">
            <div
              v-for="step in steps"
              :key="step.label"
              class="flex items-center gap-3"
            >
              <div
                :class="[
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                  step.done
                    ? 'border-[#0d5c5c] bg-[#0d5c5c] text-white'
                    : 'border-[#cbdada] bg-white text-[#94a6a6]',
                ]"
              >
                <svg v-if="step.done" class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else>{{ step.number }}</span>
              </div>
              <div>
                <p class="text-sm font-semibold">{{ step.label }}</p>
                <p class="text-xs text-[#6c7c7c]">{{ step.description }}</p>
              </div>
            </div>
          </div>

          <div class="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              class="rounded-xl bg-[#0d5c5c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a4a4a]"
              @click="loadBooking"
            >
              {{ isLoading ? "Checking..." : "Refresh status" }}
            </button>
            <button
              type="button"
              class="rounded-xl border border-[#dde8e8] bg-white px-4 py-2.5 text-sm font-semibold text-[#0d5c5c] transition hover:bg-[#f2fafa]"
              @click="router.push({ name: 'hotels' })"
            >
              {{ bookingStatus === "confirmed" ? "Book another stay" : "Browse hotels" }}
            </button>
          </div>

          <p class="mt-4 text-xs text-[#94a6a6]">
            Last checked {{ lastCheckedLabel }}
          </p>
        </section>

        <aside class="rounded-2xl border border-[#dde8e8] bg-white p-5 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-widest text-[#94a6a6]">Booking</p>
          <div v-if="booking" class="mt-4 space-y-4 text-sm">
            <div>
              <p class="font-semibold">{{ booking.hotel?.name || "Hotel booking" }}</p>
              <p class="text-[#6c7c7c]">{{ booking.booking_reference || `#${booking.id}` }}</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <p class="text-xs text-[#94a6a6]">Check-in</p>
                <p class="font-medium">{{ formatDate(booking.check_in) }}</p>
              </div>
              <div>
                <p class="text-xs text-[#94a6a6]">Check-out</p>
                <p class="font-medium">{{ formatDate(booking.check_out) }}</p>
              </div>
            </div>
            <div class="rounded-xl bg-[#f2fafa] px-4 py-3">
              <p class="text-xs text-[#6c7c7c]">Paid amount</p>
              <p class="font-serif text-2xl text-[#0d5c5c]">${{ Number(booking.total_price || 0).toFixed(2) }}</p>
            </div>
          </div>
          <p v-else-if="errorMessage" class="mt-4 text-sm text-rose-600">
            {{ errorMessage }}
          </p>
          <p v-else class="mt-4 text-sm text-[#6c7c7c]">
            Loading booking details...
          </p>
        </aside>
      </div>

      <section v-if="booking && bookingStatus === 'confirmed'" id="booking-receipt" class="receipt mt-6 overflow-hidden rounded-2xl border border-[#d8e5e4] bg-white shadow-sm">
        <div class="flex flex-col gap-5 border-b border-[#e5eeee] bg-[#0d5c5c] px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <svg viewBox="0 0 32 32" class="h-7 w-7" fill="none" aria-hidden="true"><path d="M7 24V8h5v6h8V8h5v16h-5v-6h-8v6H7Z" fill="currentColor"/><path d="M4 26h24" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".65"/></svg>
            </div>
            <div>
              <p class="font-serif text-2xl">StayEasy</p>
              <p class="text-xs text-white/65">Booking receipt</p>
            </div>
          </div>
          <div class="text-left sm:text-right">
            <p class="text-xs font-semibold uppercase tracking-widest text-white/60">Receipt number</p>
            <p class="mt-1 font-mono text-sm font-bold">{{ receiptNumber }}</p>
          </div>
        </div>

        <div class="p-6 sm:p-8">
          <div class="grid gap-7 border-b border-[#e5eeee] pb-7 sm:grid-cols-2">
            <div>
              <p class="receipt-label">Issued to</p>
              <p class="mt-2 font-semibold text-[#111c1c]">{{ booking.guest_name || booking.user?.name || "Guest" }}</p>
              <p class="mt-1 text-sm text-[#6c7c7c]">{{ booking.guest_email || booking.user?.email || "Email not provided" }}</p>
              <p v-if="booking.guest_phone" class="mt-1 text-sm text-[#6c7c7c]">{{ booking.guest_phone }}</p>
            </div>
            <div class="sm:text-right">
              <p class="receipt-label">Reservation</p>
              <p class="mt-2 font-semibold text-[#111c1c]">{{ booking.booking_reference || `#${booking.id}` }}</p>
              <p class="mt-1 text-sm capitalize text-[#6c7c7c]">Status: {{ statusDisplay }}</p>
              <p class="mt-1 text-sm text-[#6c7c7c]">Issued {{ formatDateTime(booking.payment?.authorized_at || booking.updated_at || booking.created_at) }}</p>
            </div>
          </div>

          <div class="grid gap-6 py-7 sm:grid-cols-4">
            <div class="sm:col-span-2">
              <p class="receipt-label">Property</p>
              <p class="mt-2 font-semibold">{{ booking.hotel?.name || "Hotel booking" }}</p>
              <p class="mt-1 text-sm text-[#6c7c7c]">{{ booking.hotel?.location || booking.hotel?.address || "Booked through StayEasy" }}</p>
            </div>
            <div><p class="receipt-label">Check-in</p><p class="mt-2 text-sm font-semibold">{{ formatDate(booking.check_in) }}</p></div>
            <div><p class="receipt-label">Check-out</p><p class="mt-2 text-sm font-semibold">{{ formatDate(booking.check_out) }}</p></div>
          </div>

          <div class="overflow-hidden rounded-xl border border-[#e2ebeb]">
            <div class="grid grid-cols-[1fr_auto] gap-4 bg-[#f5f9f9] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#6c7c7c]">
              <span>Booking details</span><span>Amount</span>
            </div>
            <div class="grid grid-cols-[1fr_auto] gap-4 px-4 py-5">
              <div>
                <p class="font-semibold">{{ booking.room_type || "Hotel accommodation" }}</p>
                <p class="mt-1 text-sm text-[#6c7c7c]">{{ booking.nights || calculateNights(booking.check_in, booking.check_out) }} night(s) · {{ booking.guests || 1 }} guest(s)</p>
              </div>
              <p class="font-semibold">{{ formatMoney(booking.total_price) }}</p>
            </div>
          </div>

          <div class="ml-auto mt-6 max-w-sm space-y-3">
            <div class="flex justify-between text-sm text-[#6c7c7c]"><span>Payment method</span><span class="capitalize">{{ paymentMethod }}</span></div>
            <div class="flex justify-between border-t border-[#e5eeee] pt-4 text-lg font-bold"><span>Total paid</span><span class="text-[#0d5c5c]">{{ formatMoney(booking.payment?.amount || booking.total_price) }}</span></div>
          </div>

          <div class="receipt-actions mt-8 flex flex-col gap-4 rounded-xl bg-[#f5f9f9] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-xs leading-5 text-[#6c7c7c]">Keep this receipt and your booking reference for check-in. Need help? Contact hello@stayeasy.com.</p>
            <button type="button" class="shrink-0 rounded-xl bg-[#0d5c5c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a4a4a]" @click="printReceipt">Print / Save PDF</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { bookingApi } from "../../service/api/client.js";

const route = useRoute();
const router = useRouter();
const booking = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");
const lastCheckedAt = ref(null);
let pollInterval = null;

const bookingId = computed(() => Number(route.query.bookingId || route.params.id));
const bookingStatus = computed(() => String(booking.value?.status || "awaiting_approval"));
const receiptNumber = computed(() => `RCP-${booking.value?.booking_reference || booking.value?.id || "PENDING"}`);
const statusDisplay = computed(() => bookingStatus.value.replaceAll("_", " "));
const paymentMethod = computed(() => String(booking.value?.payment?.method || "QR payment").replaceAll("_", " "));
const pageTitle = computed(() => {
  if (bookingStatus.value === "confirmed") return "Booking confirmed";
  if (bookingStatus.value === "denied") return "Request not approved";
  if (bookingStatus.value === "cancelled") return "Booking cancelled";
  return "Payment received";
});

const statusTitle = computed(() => {
  if (bookingStatus.value === "confirmed") return "Your stay is confirmed";
  if (bookingStatus.value === "denied") return "The hotel could not approve this request";
  if (bookingStatus.value === "cancelled") return "This booking was cancelled";
  return "Waiting for hotel approval";
});

const statusCopy = computed(() => {
  if (bookingStatus.value === "confirmed") return "The hotel has approved your reservation. You can arrive with your booking reference and ID.";
  if (bookingStatus.value === "denied") return "Your payment was recorded, but the hotel declined this reservation. Please contact support for the next step.";
  if (bookingStatus.value === "cancelled") return "This booking is no longer active.";
  return "Payment is complete. The hotel team now checks availability, room readiness, and guest details before final confirmation.";
});

const steps = computed(() => [
  { number: 1, label: "Payment received", description: "Your payment authorization is complete.", done: true },
  { number: 2, label: "Hotel review", description: "The admin team approves or denies the request.", done: ["confirmed", "denied", "cancelled"].includes(bookingStatus.value) },
  { number: 3, label: "Final confirmation", description: "Your booking becomes ready for check-in.", done: bookingStatus.value === "confirmed" },
]);

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(value) {
  if (!value) return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value || 0));
}

function calculateNights(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.ceil((end - start) / 86400000);
  return Number.isFinite(nights) && nights > 0 ? nights : 1;
}

function printReceipt() {
  window.print();
}

const lastCheckedLabel = computed(() => {
  if (!lastCheckedAt.value) return "just now";
  return lastCheckedAt.value.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" });
});

async function loadBooking() {
  if (!bookingId.value) return;
  isLoading.value = true;
  errorMessage.value = "";
  try {
    booking.value = await bookingApi.show(bookingId.value);
    lastCheckedAt.value = new Date();
    if (["confirmed", "denied", "cancelled"].includes(bookingStatus.value) && pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  } catch (err) {
    errorMessage.value = err.message || "Could not load this booking.";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadBooking();
  pollInterval = setInterval(loadBooking, 10000);
});

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval);
});
</script>

<style scoped>
.font-serif {
  font-family: "DM Serif Display", Georgia, serif;
}
.receipt-label { font-size: .7rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #829595; }

@media print {
  :global(body *) { visibility: hidden !important; }
  .receipt, .receipt * { visibility: visible !important; }
  .receipt { position: absolute; inset: 0; width: 100%; border: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
  .receipt-actions { display: none !important; }
  @page { size: A4; margin: 12mm; }
}
</style>
