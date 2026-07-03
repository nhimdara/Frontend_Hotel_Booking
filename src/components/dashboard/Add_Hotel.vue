<template>
  <div class="min-h-screen bg-slate-50 p-4 font-sans text-slate-800 sm:p-6">
    <div class="w-full">
      <div class="flex items-center gap-1.5 text-xs text-slate-400">
        <span>Hotel Management</span>
        <svg
          class="h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span class="font-medium text-emerald-700">Add Hotel</span>
      </div>

      <h2
        class="mt-2 text-xl font-bold tracking-tight text-emerald-900 sm:text-2xl"
      >
        Create Hotel
      </h2>
      <p class="mt-1 text-sm text-slate-500">
        Add a property that guests can browse and book.
      </p>

      <form class="mt-6 space-y-5" @submit.prevent="handleSubmit">
        <section
          class="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-6"
        >
          <h3 class="text-sm font-semibold text-emerald-800 sm:text-base">
            Property Details
          </h3>
          <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 block text-sm font-medium text-slate-700"
                >Hotel Name</span
              >
              <input
                v-model="form.name"
                required
                class="field"
                placeholder="Grand Plaza Hotel"
              />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-medium text-slate-700"
                >Location</span
              >
              <input
                v-model="form.location"
                required
                class="field"
                placeholder="Phnom Penh"
              />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-medium text-slate-700"
                >Country</span
              >
              <input
                v-model="form.country"
                required
                class="field"
                placeholder="Cambodia"
              />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-medium text-slate-700"
                >Price Per Night</span
              >
              <input
                v-model="form.price_per_night"
                required
                min="0"
                step="0.01"
                type="number"
                class="field"
                placeholder="89"
              />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-medium text-slate-700"
                >Star Rating</span
              >
              <select v-model="form.star_rating" class="field">
                <option
                  v-for="rating in [1, 2, 3, 4, 5]"
                  :key="rating"
                  :value="rating"
                >
                  {{ rating }} star
                </option>
              </select>
            </label>
          </div>
          <div class="mt-4">
            <span class="mb-1.5 block text-sm font-medium text-slate-700"
              >Add image</span
            >

            <!-- File Upload -->
            <div>
              <label class="text-sm font-medium text-slate-700 mb-2 block"
                >Upload file</label
              >
              <label
                class="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-4 py-5 text-center transition hover:border-emerald-300 hover:bg-emerald-50/50"
              >
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  class="mb-3 h-28 w-full max-w-xs rounded-lg object-cover"
                  alt="Hotel preview"
                />
                <template v-else>
                  <svg
                    class="mb-2 h-6 w-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0l-4 4m4-4l4 4"
                    />
                  </svg>
                  <span class="text-sm font-medium text-slate-700"
                    >Choose a hotel image</span
                  >
                  <span class="mt-1 text-xs text-slate-400"
                    >JPG or PNG, up to 5MB</span
                  >
                </template>
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleImageFile"
                />
              </label>
            </div>
          </div>
          <label class="mt-4 block">
            <span class="mb-1.5 block text-sm font-medium text-slate-700"
              >Description</span
            >
            <textarea
              v-model="form.description"
              rows="5"
              class="field resize-none"
              placeholder="Describe the property, location, and guest experience."
            ></textarea>
          </label>
          <label class="mt-4 block">
            <span class="mb-1.5 block text-sm font-medium text-slate-700"
              >Amenities</span
            >
            <input
              v-model="form.amenitiesText"
              class="field"
              placeholder="Pool, Spa, Free WiFi"
            />
          </label>
          <div
            v-if="imageFile"
            class="mt-3 text-xs text-emerald-600 font-medium"
          >
            ✓ Image selected: {{ imageFile.name }}
          </div>
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

        <div class="flex justify-end gap-3 pb-4">
          <button
            type="button"
            class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            @click="router.push({ name: 'hotel-management' })"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="saving"
            class="rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ saving ? "Creating..." : "Create Hotel" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { hotelApi } from "../../service/api/Hotel.js";

const router = useRouter();
const saving = ref(false);
const message = reactive({ type: "", text: "" });
const imageFile = ref(null);
const imagePreview = ref("");

const form = reactive({
  name: "",
  location: "",
  country: "Cambodia",
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

function handleImageFile(event) {
  const file = event.target.files?.[0] || null;
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value);
  }
  imageFile.value = file;
  imagePreview.value = file ? URL.createObjectURL(file) : "";
  event.target.value = "";
}

function hotelPayload() {
  const payload = {
    name: form.name.trim(),
    slug: slugify(form.name) || `hotel-${Date.now()}`,
    description:
      form.description || "A comfortable hotel stay with thoughtful service.",
    location: form.location.trim(),
    country: form.country.trim(),
    price_per_night: Number(form.price_per_night || 0),
    star_rating: Number(form.star_rating || 4),
    amenities: form.amenitiesText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  // Always create FormData to ensure consistent handling
  const data = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => data.append(`${key}[]`, item));
    } else {
      data.append(key, value);
    }
  });

  // Append image if selected
  if (imageFile.value) {
    data.append("image", imageFile.value);
  }

  return data;
}

async function handleSubmit() {
  saving.value = true;
  message.type = "";
  message.text = "";

  try {
    const payload = hotelPayload();

    // Log what we're sending
    if (payload instanceof FormData) {
      console.log("📤 Sending FormData with fields:");
      for (let [key, value] of payload.entries()) {
        if (value instanceof File) {
          console.log(
            `  - ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`,
          );
        } else {
          console.log(`  - ${key}: ${value}`);
        }
      }
    }

    const result = await hotelApi.create(payload);

    console.log("✅ Hotel created successfully. Response:", result);
    console.log("Image in response:", result?.image);

    // Give API a moment to process image, then redirect
    setTimeout(() => {
      router.push({ name: "hotel-management" });
    }, 500);
  } catch (err) {
    message.type = "error";
    message.text = err.message || "Could not create hotel.";
    console.error("❌ Hotel creation error:", err);
  } finally {
    saving.value = false;
  }
}
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
