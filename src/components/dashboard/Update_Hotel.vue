<template>
  <div class="min-h-screen bg-slate-50 p-4 font-sans text-slate-800 sm:p-6">
    <div class="w-full">
      <div class="flex items-center gap-1.5 text-xs text-slate-400">
        <span>Hotel Management</span>
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="font-medium text-emerald-700">Update Hotel</span>
      </div>

      <div class="mt-2 flex items-start justify-between gap-3">
        <div>
          <h2 class="text-xl font-bold tracking-tight text-emerald-900 sm:text-2xl">
            Update {{ originalHotel.name || "Hotel" }}
          </h2>
          <p class="mt-1 text-sm text-slate-500">Edit property details shown on the booking site.</p>
        </div>
        <span
          v-if="isDirty"
          class="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full shrink-0"
        >
          Unsaved changes
        </span>
      </div>

      <div v-if="loading" class="mt-8 flex items-center justify-center py-20">
        <svg class="w-6 h-6 text-emerald-700 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span class="text-sm text-slate-500 ml-3">Loading hotel data...</span>
      </div>

      <form v-else class="mt-6 space-y-5" @submit.prevent="handleSubmit">
        <section class="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-6">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-emerald-800 sm:text-base">Property Details</h3>
              <p class="text-xs sm:text-sm text-slate-400 mt-0.5">Main hotel identity and booking information.</p>
            </div>
          </div>

          <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 block text-sm font-medium text-slate-700">Hotel Name</span>
              <input v-model="form.name" required class="field" placeholder="Grand Plaza Hotel" />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-medium text-slate-700">Location</span>
              <input v-model="form.location" required class="field" placeholder="Phnom Penh" />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-medium text-slate-700">Country</span>
              <input v-model="form.country" required class="field" placeholder="Cambodia" />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-medium text-slate-700">Price Per Night</span>
              <input v-model="form.price_per_night" required min="0" step="0.01" type="number" class="field" placeholder="89" />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-medium text-slate-700">Star Rating</span>
              <select v-model="form.star_rating" class="field">
                <option v-for="rating in [1, 2, 3, 4, 5]" :key="rating" :value="rating">{{ rating }} star</option>
              </select>
            </label>
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-6">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-emerald-800 sm:text-base">Hotel Media</h3>
              <p class="text-xs sm:text-sm text-slate-400 mt-0.5">Choose the image guests see first.</p>
            </div>
          </div>

          <div class="mt-5 space-y-4">
            <label class="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-4 py-5 text-center transition hover:border-emerald-300 hover:bg-emerald-50/50">
              <img v-if="imagePreview" :src="imagePreview" class="mb-3 h-32 w-full max-w-md rounded-lg object-cover" alt="Hotel preview" />
              <template v-else>
                <svg class="mb-2 h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0l-4 4m4-4l4 4" />
                </svg>
                <span class="text-sm font-medium text-slate-700">Choose a hotel image</span>
                <span class="mt-1 text-xs text-slate-400">JPG or PNG, up to 5MB</span>
              </template>
              <input type="file" accept="image/*" class="hidden" @change="handleImageFile" />
            </label>
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-6">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 3h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM9 12h6m-6 4h6" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-emerald-800 sm:text-base">Public Content</h3>
              <p class="text-xs sm:text-sm text-slate-400 mt-0.5">Description and amenities for guests.</p>
            </div>
          </div>

          <label class="mt-5 block">
            <span class="mb-1.5 block text-sm font-medium text-slate-700">Description</span>
            <textarea v-model="form.description" rows="5" maxlength="700" class="field resize-none" placeholder="Describe the property, location, and guest experience."></textarea>
            <p class="text-xs text-slate-400 text-right mt-1.5">{{ form.description.length }} / 700 characters</p>
          </label>
          <label class="mt-4 block">
            <span class="mb-1.5 block text-sm font-medium text-slate-700">Amenities</span>
            <input v-model="form.amenitiesText" class="field" placeholder="Pool, Spa, Free WiFi" />
          </label>
        </section>

        <div
          v-if="message.text"
          :class="[
            'rounded-xl border px-4 py-3 text-sm font-medium',
            message.type === 'error'
              ? 'border-rose-200 bg-rose-50 text-rose-700'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700',
          ]"
        >
          {{ message.text }}
        </div>

        <div class="flex items-center justify-between gap-3 pb-4">
          <button
            type="button"
            @click="revertChanges"
            :disabled="!isDirty"
            class="text-sm font-medium text-slate-500 hover:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Revert changes
          </button>
          <div class="flex justify-end gap-3">
            <button type="button" class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50" @click="router.push({ name: 'hotel-management' })">
              Cancel
            </button>
            <button type="submit" :disabled="!isDirty || saving" class="rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60">
              {{ saving ? "Saving..." : "Save Changes" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { hotelApi } from "../../service/api/Hotel.js";

const props = defineProps({
  hotelId: { type: [String, Number], default: null },
  id: { type: [String, Number], default: null },
});

const router = useRouter();
const activeHotelId = computed(() => props.hotelId ?? props.id ?? null);
const loading = ref(true);
const saving = ref(false);
const message = reactive({ type: "", text: "" });
const imageFile = ref(null);
const imagePreview = ref("");

const originalHotel = reactive({
  id: null,
  name: "",
  location: "",
  country: "",
  price_per_night: "",
  star_rating: 4,
  amenitiesText: "",
  description: "",
  image: "",
});

const form = reactive({
  name: "",
  location: "",
  country: "",
  price_per_night: "",
  star_rating: 4,
  amenitiesText: "",
  description: "",
});

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function applyHotelToState(hotel = {}) {
  const locationParts = String(hotel.location || "").split(",").map((item) => item.trim()).filter(Boolean);
  const location = hotel.raw?.location || locationParts[0] || "";
  const country = hotel.country || hotel.raw?.country || locationParts.slice(1).join(", ") || "Cambodia";

  Object.assign(originalHotel, {
    id: hotel.id ?? null,
    name: hotel.name ?? "",
    location,
    country,
    price_per_night: hotel.pricePerNight ?? hotel.price_per_night ?? hotel.price ?? "",
    star_rating: hotel.starRating || hotel.star_rating || 4,
    amenitiesText: Array.isArray(hotel.amenities) ? hotel.amenities.join(", ") : "",
    description: hotel.description ?? "",
    image: hotel.image || "",
  });

  form.name = originalHotel.name;
  form.location = originalHotel.location;
  form.country = originalHotel.country;
  form.price_per_night = originalHotel.price_per_night;
  form.star_rating = originalHotel.star_rating;
  form.amenitiesText = originalHotel.amenitiesText;
  form.description = originalHotel.description;
  imagePreview.value = originalHotel.image;
  imageFile.value = null;
}

async function loadHotel() {
  loading.value = true;
  message.text = "";
  try {
    if (activeHotelId.value == null) {
      applyHotelToState({});
    } else {
      const hotel = await hotelApi.show(activeHotelId.value);
      applyHotelToState(hotel);
    }
  } catch (err) {
    message.type = "error";
    message.text = err.message || "Could not load hotel.";
  } finally {
    loading.value = false;
  }
}

const isDirty = computed(() => {
  return (
    form.name !== originalHotel.name ||
    form.location !== originalHotel.location ||
    form.country !== originalHotel.country ||
    String(form.price_per_night ?? "") !== String(originalHotel.price_per_night ?? "") ||
    Number(form.star_rating || 0) !== Number(originalHotel.star_rating || 0) ||
    form.amenitiesText !== originalHotel.amenitiesText ||
    form.description !== originalHotel.description ||
    imagePreview.value !== originalHotel.image ||
    Boolean(imageFile.value)
  );
});

function handleImageFile(event) {
  const file = event.target.files?.[0] || null;
  if (imagePreview.value?.startsWith("blob:")) {
    URL.revokeObjectURL(imagePreview.value);
  }
  imageFile.value = file;
  imagePreview.value = file ? URL.createObjectURL(file) : originalHotel.image;
  event.target.value = "";
}

function hotelPayload() {
  const payload = {
    name: form.name.trim(),
    slug: slugify(form.name) || `hotel-${Date.now()}`,
    description: form.description || "A comfortable hotel stay with thoughtful service.",
    location: form.location.trim(),
    country: form.country.trim(),
    price_per_night: Number(form.price_per_night || 0),
    star_rating: Number(form.star_rating || 4),
    amenities: form.amenitiesText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  const data = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => data.append(`${key}[]`, item));
    } else {
      data.append(key, value);
    }
  });

  if (imageFile.value) {
    data.append("image", imageFile.value);
  }

  return data;
}

function revertChanges() {
  applyHotelToState(originalHotel);
}

async function handleSubmit() {
  if (!isDirty.value || !originalHotel.id) return;

  saving.value = true;
  message.text = "";
  try {
    const updated = await hotelApi.update(originalHotel.id, hotelPayload());
    applyHotelToState(updated);
    message.type = "success";
    message.text = "Hotel updated successfully.";
    router.push({ name: "hotel-management" });
  } catch (err) {
    message.type = "error";
    message.text = err.message || "Could not update hotel.";
  } finally {
    saving.value = false;
  }
}

onMounted(loadHotel);
watch(activeHotelId, loadHotel);
</script>

<style scoped>
.field {
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid rgb(226 232 240);
  background: white;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  color: rgb(51 65 85);
  outline: none;
}
.field:focus {
  border-color: rgb(110 231 183);
  box-shadow: 0 0 0 2px rgb(167 243 208 / 0.7);
}
</style>
