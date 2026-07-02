<template>
  <div
    class="p-4 sm:p-6 bg-slate-50 min-h-screen font-sans antialiased text-slate-800"
  >
    <div class="w-full">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-1.5 text-xs text-slate-400">
        <span>Room Management</span>
        <svg
          class="w-3 h-3"
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
        <span class="font-medium text-emerald-700">Update Room</span>
      </div>

      <!-- Header -->
      <div class="flex items-start justify-between gap-3 mt-2">
        <div>
          <h2
            class="text-xl sm:text-2xl font-bold text-emerald-900 tracking-tight"
          >
            Uodate Room {{ originalRoom.roomName || "Room" }}
          </h2>
          <p class="text-sm text-slate-500 mt-1">
            Update the details below. Changes are saved to the hotel's digital
            catalog.
          </p>
        </div>
        <span
          v-if="isDirty"
          class="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full shrink-0 mt-1"
        >
          Unsaved changes
        </span>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="mt-8 flex items-center justify-center py-20">
        <svg
          class="w-6 h-6 text-emerald-700 animate-spin"
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
        <span class="text-sm text-slate-500 ml-3">Loading room data...</span>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="mt-6 space-y-5">
        <!-- Room Identity -->
        <div
          class="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-4 sm:p-6"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM7 21h10"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-sm sm:text-base font-semibold text-emerald-800">
                Room Identity
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 mt-0.5">
                Basic identifiers for staff and guest reference.
              </p>
            </div>
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-5 sm:mt-6"
          >
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5"
                >Room Name / Number</label
              >
              <input
                v-model="form.roomName"
                type="text"
                placeholder="e.g. 402 or 'The Azure Suite'"
                class="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5"
                >Room Type</label
              >
              <div class="relative">
                <select
                  v-model="form.roomType"
                  class="w-full text-sm text-slate-700 bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
                >
                  <option v-for="type in roomTypes" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
                <svg
                  class="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5"
                >Floor Number</label
              >
              <input
                v-model="form.floorNumber"
                type="text"
                placeholder="4"
                class="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5"
                >Wing / Building</label
              >
              <input
                v-model="form.wing"
                type="text"
                placeholder="e.g. North Wing"
                class="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
              />
            </div>
          </div>
        </div>

        <!-- Pricing & Capacity -->
        <div
          class="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-4 sm:p-6"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M3 10h18M7 15h1m4 0h5M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-sm sm:text-base font-semibold text-emerald-800">
                Pricing &amp; Capacity
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 mt-0.5">
                Financial and occupancy constraints.
              </p>
            </div>
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-5 sm:mt-6"
          >
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5"
                >Base Rate (Per Night)</label
              >
              <div class="relative">
                <span
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400"
                  >$</span
                >
                <input
                  v-model="form.baseRate"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl pl-7 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5"
                >Max Occupancy</label
              >
              <input
                v-model="form.maxOccupancy"
                type="number"
                min="1"
                placeholder="2"
                class="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
              />
            </div>
          </div>
        </div>

        <!-- Public Description -->
        <div
          class="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-4 sm:p-6"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M7 3h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM9 12h6m-6 4h6"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-sm sm:text-base font-semibold text-emerald-800">
                Public Description
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 mt-0.5">
                This content will be visible on the booking site.
              </p>
            </div>
          </div>

          <div class="mt-5 sm:mt-6">
            <textarea
              v-model="form.description"
              maxlength="500"
              rows="5"
              placeholder="Describe the ambiance, view, and specific amenities of this room..."
              class="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl px-3.5 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
            ></textarea>
            <p class="text-xs text-slate-400 text-right mt-1.5">
              {{ form.description.length }} / 500 characters
            </p>
          </div>
        </div>

        <!-- Room Media -->
        <div
          class="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-4 sm:p-6"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-sm sm:text-base font-semibold text-emerald-800">
                Room Media
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 mt-0.5">
                High-resolution photos of the space
              </p>
            </div>
          </div>

          <div class="mt-5 sm:mt-6 space-y-4">
            <!-- Import by link -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2"
                >Add image by link</label
              >
              <div class="flex gap-2">
                <input
                  v-model="form.mediaLink"
                  type="url"
                  placeholder="https://example.com/room-view.jpg"
                  class="flex-1 min-w-0 text-sm text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-200/70 focus:border-emerald-300 transition-colors"
                />
                <button
                  type="button"
                  @click="importLink"
                  class="text-sm font-medium text-white bg-emerald-800 px-4 sm:px-5 py-2.5 rounded-xl hover:bg-emerald-900 transition-colors shrink-0"
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Form actions -->
        <div class="flex items-center justify-between gap-3 pt-1 pb-4">
          <button
            type="button"
            @click="revertChanges"
            :disabled="!isDirty"
            class="text-sm font-medium text-slate-500 hover:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Revert changes
          </button>
          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="$emit('cancel')"
              class="text-sm font-medium text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!isDirty || saving"
              class="text-sm font-medium text-white bg-emerald-800 px-5 py-2.5 rounded-xl shadow-sm hover:bg-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
            >
              <svg
                v-if="saving"
                class="w-4 h-4 animate-spin"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              {{ saving ? "Saving..." : "Save Changes" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from "vue";
import { fetchRoom, updateRoom } from "../../service/api/rooms.js";

// `roomId` lets this component fetch its own data; `room` lets a parent pass
// already-loaded data directly (e.g. from a list it already fetched). At
// least one should be provided.
const props = defineProps({
  roomId: { type: [String, Number], default: null },
  id: { type: [String, Number], default: null },
  room: { type: Object, default: null },
});

const activeRoomId = computed(() => props.roomId ?? props.id ?? null);

const emit = defineEmits(["saved", "cancel"]);

const roomTypes = [
  "Standard King",
  "Standard Double",
  "Deluxe King",
  "Double Queen",
  "Junior Suite",
  "Penthouse Suite",
  "Ocean View Loft",
];

const loading = ref(true);
const saving = ref(false);

// Holds the data as it currently exists, before any in-progress edits.
// Used both to prefill the form and to detect/revert unsaved changes.
const originalRoom = reactive({
  id: null,
  roomName: "",
  roomType: "Standard King",
  floorNumber: "",
  wing: "",
  baseRate: "",
  maxOccupancy: "",
  description: "",
  media: [], // [{ id, url }]
});

const form = reactive({
  roomName: "",
  roomType: "Standard King",
  floorNumber: "",
  wing: "",
  baseRate: "",
  maxOccupancy: "",
  description: "",
  mediaFiles: [], // [{ id?, file, preview, existing }]
  mediaLink: "",
});

function applyRoomToState(data) {
  Object.assign(originalRoom, {
    id: data.id ?? null,
    roomName: data.roomName ?? "",
    roomType: data.roomType ?? "Standard King",
    floorNumber: data.floorNumber ?? "",
    wing: data.wing ?? "",
    baseRate: data.baseRate ?? "",
    maxOccupancy: data.maxOccupancy ?? "",
    description: data.description ?? "",
    media: Array.isArray(data.media) ? data.media : [],
  });

  form.roomName = originalRoom.roomName;
  form.roomType = originalRoom.roomType;
  form.floorNumber = String(originalRoom.floorNumber ?? "");
  form.wing = originalRoom.wing;
  form.baseRate = originalRoom.baseRate;
  form.maxOccupancy = originalRoom.maxOccupancy;
  form.description = originalRoom.description;
  form.mediaFiles = originalRoom.media.map((m) => ({
    id: m.id,
    file: null,
    preview: m.url,
    existing: true,
  }));
  form.mediaLink = "";
}

async function loadRoom() {
  loading.value = true;
  try {
    if (props.room) {
      // Parent already has the data — use it directly, no fetch needed.
      applyRoomToState(props.room);
    } else if (activeRoomId.value != null) {
      const data = await fetchRoomById(activeRoomId.value);
      applyRoomToState(data);
    } else {
      applyRoomToState({});
    }
  } finally {
    loading.value = false;
  }
}

async function fetchRoomById(id) {
  return fetchRoom(id);
}

onMounted(loadRoom);

// Re-load if the parent swaps which room is being edited.
watch(
  () => [activeRoomId.value, props.room],
  () => loadRoom(),
  { deep: true },
);

// True once anything in the form differs from the last-saved state.
const isDirty = computed(() => {
  const basicFieldsChanged =
    form.roomName !== originalRoom.roomName ||
    form.roomType !== originalRoom.roomType ||
    String(form.floorNumber ?? "") !== String(originalRoom.floorNumber ?? "") ||
    form.wing !== originalRoom.wing ||
    String(form.baseRate ?? "") !== String(originalRoom.baseRate ?? "") ||
    String(form.maxOccupancy ?? "") !==
      String(originalRoom.maxOccupancy ?? "") ||
    form.description !== originalRoom.description;

  const mediaChanged =
    form.mediaFiles.length !== originalRoom.media.length ||
    form.mediaFiles.some((f, i) => {
      const existingAtSamePosition = originalRoom.media[i];
      if (f.existing) {
        return !existingAtSamePosition || f.id !== existingAtSamePosition.id;
      }
      return true; // any newly added file counts as a change
    });

  return basicFieldsChanged || mediaChanged;
});

function handleFileUpload(e) {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    form.mediaFiles.push({
      file,
      preview: URL.createObjectURL(file),
      existing: false,
    });
  });
  e.target.value = "";
}

function removeFile(index) {
  const f = form.mediaFiles[index];
  if (f.file) URL.revokeObjectURL(f.preview);
  form.mediaFiles.splice(index, 1);
}

function importLink() {
  const url = form.mediaLink.trim();
  if (!url) return;
  form.mediaFiles.push({ file: null, preview: url, existing: false });
  form.mediaLink = "";
}

// Discards in-progress edits and restores the last-saved values.
function revertChanges() {
  applyRoomToState(originalRoom);
}

async function handleSubmit() {
  if (!isDirty.value) return;
  saving.value = true;
  try {
    const payload = {
      id: originalRoom.id,
      roomName: form.roomName,
      roomType: form.roomType,
      floorNumber: form.floorNumber,
      wing: form.wing,
      baseRate: form.baseRate,
      maxOccupancy: form.maxOccupancy,
      description: form.description,
      // Existing media kept as-is, plus any newly added files/links.
      media: form.mediaFiles.map((f) => ({
        id: f.id,
        url: f.existing ? f.preview : null,
        file: f.file,
      })),
    };

    const savedRoom = await updateRoom(originalRoom.id, form);

    // Treat the just-saved form values as the new "original" baseline.
    applyRoomToState(savedRoom);

    emit("saved", payload);
  } finally {
    saving.value = false;
  }
}
</script>
