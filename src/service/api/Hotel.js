import { ref } from "vue";
import { apiFetch } from "./client.js";

const fallbackImage =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80";

const hotels = ref([]);
const stats = ref({
  matches: 0,
  avg_price: 0,
  avg_rating: 0,
});
const loading = ref(false);
const error = ref("");

function badgeStyle(label = "") {
  const lower = label.toLowerCase();
  if (lower.includes("top")) return "bg-amber-400 text-slate-900";
  if (lower.includes("pool")) return "bg-teal-800 text-white";
  if (lower.includes("new")) return "bg-emerald-500 text-white";
  if (lower.includes("value")) return "bg-blue-500 text-white";
  if (lower.includes("gem")) return "bg-purple-500 text-white";
  return "bg-slate-800 text-white";
}

function firstImage(raw) {
  if (raw.image_url) return raw.image_url;
  if (raw.image) return raw.image;
  if (Array.isArray(raw.image_urls) && raw.image_urls.length) {
    return raw.image_urls[0];
  }
  if (Array.isArray(raw.images) && raw.images.length) {
    const image = raw.images[0];
    return typeof image === "string" ? image : image.url || image.path;
  }
  return fallbackImage;
}

function normalizeBadge(raw) {
  const badge =
    raw.badge ||
    raw.primary_badge ||
    (Array.isArray(raw.badges) ? raw.badges[0] : null);

  if (!badge) return null;
  if (typeof badge === "string") {
    return { label: badge, style: badgeStyle(badge) };
  }

  const label = badge.label || badge.name || badge.title;
  return label ? { label, style: badge.style || badgeStyle(label) } : null;
}

export function normalizeHotel(raw = {}) {
  const price = Number(raw.price ?? raw.price_per_night ?? 0);
  const rating = Number(raw.rating ?? raw.review_score ?? raw.star_rating ?? 0);
  const locationParts = [raw.location, raw.country].filter(Boolean);

  return {
    ...raw,
    id: Number(raw.id),
    name: raw.name || "Untitled Hotel",
    rating,
    location: locationParts.join(", ") || "Location unavailable",
    description: raw.description || "No description available yet.",
    price,
    badge: normalizeBadge(raw),
    wishlisted: Boolean(raw.wishlisted),
    image: firstImage(raw),
    amenities: raw.amenities || [],
    rooms: raw.room_types || raw.rooms || [],
  };
}

function queryString(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, value);
    }
  });
  const query = search.toString();
  return query ? `?${query}` : "";
}

async function fetchHotels(params = {}) {
  loading.value = true;
  error.value = "";

  try {
    const data = await apiFetch(`/hotels${queryString(params)}`, {
      headers: { Accept: "application/json" },
    });
    const hotelList = data?.hotels?.data || data?.hotels || data?.data || [];

    hotels.value = hotelList.map(normalizeHotel);
    stats.value = data?.stats || {
      matches: hotels.value.length,
      avg_price: 0,
      avg_rating: 0,
    };

    return hotels.value;
  } catch (err) {
    error.value = err.message || "Could not load hotels.";
    throw err;
  } finally {
    loading.value = false;
  }
}

async function fetchHotel(id) {
  loading.value = true;
  error.value = "";

  try {
    const data = await apiFetch(`/hotels/${id}`, {
      headers: { Accept: "application/json" },
    });
    const rawHotel = data?.hotel || data?.data || data;
    const hotel = normalizeHotel(rawHotel);
    const existingIndex = hotels.value.findIndex((item) => item.id === hotel.id);

    if (existingIndex >= 0) {
      hotels.value.splice(existingIndex, 1, hotel);
    } else {
      hotels.value.push(hotel);
    }

    return hotel;
  } catch (err) {
    error.value = err.message || "Could not load hotel.";
    throw err;
  } finally {
    loading.value = false;
  }
}

export const hotelApi = {
  list: fetchHotels,
  show: fetchHotel,
  create(payload) {
    const options =
      payload instanceof FormData
        ? { method: "POST", body: payload }
        : { method: "POST", body: JSON.stringify(payload) };
    return apiFetch("/hotels", options);
  },
  update(id, payload) {
    const options =
      payload instanceof FormData
        ? { method: "POST", body: payload }
        : { method: "PUT", body: JSON.stringify(payload) };
    return apiFetch(`/hotels/${id}`, options);
  },
  remove(id) {
    return apiFetch(`/hotels/${id}`, { method: "DELETE" });
  },
};

export default {
  setup() {
    return {
      hotels,
      stats,
      loading,
      error,
      fetchHotels,
      fetchHotel,
    };
  },
};
