import { computed, reactive } from "vue";

const STORAGE_KEY = "stayeasy_wishlist";

function readWishlist() {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

const state = reactive({ items: readWishlist() });

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
}

function isSaved(id) {
  return state.items.some((item) => String(item.id) === String(id));
}

function toggle(hotel) {
  const index = state.items.findIndex((item) => String(item.id) === String(hotel.id));
  if (index >= 0) {
    state.items.splice(index, 1);
    persist();
    return false;
  }
  state.items.unshift({
    id: hotel.id, name: hotel.name, location: hotel.location,
    description: hotel.description,
    price: Number(hotel.price || hotel.pricePerNight || 0),
    rating: Number(hotel.rating || hotel.reviewScore || 0),
    image: hotel.image, savedAt: new Date().toISOString(),
  });
  persist();
  return true;
}

function remove(id) {
  const index = state.items.findIndex((item) => String(item.id) === String(id));
  if (index >= 0) { state.items.splice(index, 1); persist(); }
}

export function syncWishlist(hotels = []) {
  hotels.forEach((hotel) => { hotel.wishlisted = isSaved(hotel.id); });
  return hotels;
}

export function useWishlist() {
  return { items: computed(() => state.items), count: computed(() => state.items.length), isSaved, toggle, remove };
}
