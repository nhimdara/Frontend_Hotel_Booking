import { ref } from "vue";
import { API_URL, apiFetch } from "./client.js";
import { clearApiToken, ensureApiToken } from "../auth.js";

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

const apiOrigin = API_URL.replace(/\/api\/?$/, "");

function parseList(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (!value) return [];

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  if (typeof value === "object") return Object.values(value);
  return [];
}

function resolveAssetUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${apiOrigin}${url}`;
  return `${apiOrigin}/${url}`;
}

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
  const imageUrls = parseList(raw.image_urls);
  if (raw.image_url) return resolveAssetUrl(raw.image_url);
  if (raw.image) return resolveAssetUrl(raw.image);
  if (imageUrls.length) {
    return resolveAssetUrl(imageUrls[0]);
  }
  if (Array.isArray(raw.images) && raw.images.length) {
    const image = raw.images[0];
    return resolveAssetUrl(
      typeof image === "string" ? image : image.url || image.path,
    );
  }
  return fallbackImage;
}

function normalizeBadge(raw) {
  const badge =
    raw.badge ||
    raw.primary_badge ||
    parseList(raw.badges)[0] ||
    null;

  if (!badge) return null;
  if (typeof badge === "string") {
    return { label: badge, style: badgeStyle(badge) };
  }

  const label = badge.label || badge.name || badge.title;
  return label ? { label, style: badge.style || badgeStyle(label) } : null;
}

function parseRoomTypes(raw = {}) {
  const sources = [
    ...parseList(raw.room_types),
    ...parseList(raw.rooms),
    ...parseList(raw.active_room_types),
  ];
  const source = sources.length ? sources : null;

  if (!source) return [];

  if (Array.isArray(source)) return source;

  if (typeof source === "string") {
    return parseList(source);
  }

  if (typeof source === "object") {
    return Object.entries(source)
      .map(([key, value]) => {
        if (value === false || value === null || value === undefined) return null;
        if (typeof value === "object") {
          return {
            ...value,
            type: value.type || value.room_type || key,
            name: value.name || value.label || `${key.charAt(0).toUpperCase()}${key.slice(1)} Room`,
          };
        }
        return key;
      })
      .filter(Boolean);
  }

  return [];
}

export function normalizeHotel(raw = {}) {
  const price = Number(raw.price ?? raw.price_per_night ?? 0);
  const rating = Number(raw.rating ?? raw.review_score ?? raw.star_rating ?? 0);
  const locationParts = [raw.location, raw.country].filter(Boolean);
  const amenities = parseList(raw.amenities);
  const imageUrls = parseList(raw.image_urls).map(resolveAssetUrl);
  const rooms = parseRoomTypes(raw).map((room) => {
    if (typeof room === "string") {
      return {
        type: room.toLowerCase(),
        name: `${room.charAt(0).toUpperCase()}${room.slice(1)} Room`,
      };
    }

    const roomType = room.type || room.room_type || room.category || "standard";

    return {
      ...room,
      type: roomType,
      name: room.name || room.roomName || room.room_number || `${roomType} Room`,
      price: Number(room.price ?? room.price_per_night ?? room.base_rate ?? price),
      max_guests: Number(room.max_guests ?? room.max_occupancy ?? room.capacity ?? 2),
      image: resolveAssetUrl(room.image || room.image_url) || firstImage(raw),
      available: room.available ?? room.status !== "maintenance",
    };
  });

  return {
    ...raw,
    id: Number(raw.id),
    slug: raw.slug,
    name: raw.name || "Untitled Hotel",
    rating,
    reviewScore: Number(raw.review_score ?? raw.rating ?? 0),
    starRating: Number(raw.star_rating ?? 0),
    location: locationParts.join(", ") || "Location unavailable",
    country: raw.country || "",
    latitude: raw.latitude,
    longitude: raw.longitude,
    description: raw.description || "No description available yet.",
    price,
    pricePerNight: price,
    badge: normalizeBadge(raw),
    badges: parseList(raw.badges),
    wishlisted: Boolean(raw.wishlisted),
    image: firstImage(raw),
    images: imageUrls.length ? imageUrls : [firstImage(raw)],
    amenities,
    rooms,
    bookingsCount: Number(raw.bookings_count ?? raw.bookingsCount ?? 0),
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
    const hotelList =
      data?.hotels?.data ||
      data?.data?.data ||
      (Array.isArray(data?.hotels) ? data.hotels : null) ||
      (Array.isArray(data?.data) ? data.data : null) ||
      (Array.isArray(data) ? data : []);

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
  async create(payload) {
    await ensureApiToken();
    const options =
      payload instanceof FormData
        ? { method: "POST", body: payload }
        : { method: "POST", body: JSON.stringify(payload) };
    try {
      return await apiFetch("/hotels", options);
    } catch (err) {
      if (err.status !== 401) throw err;
      clearApiToken();
      await ensureApiToken({ refresh: true });
      return apiFetch("/hotels", options);
    }
  },
  async update(id, payload) {
    await ensureApiToken();
    const options =
      payload instanceof FormData
        ? { method: "POST", body: payload }
        : { method: "PUT", body: JSON.stringify(payload) };
    try {
      return await apiFetch(`/hotels/${id}`, options);
    } catch (err) {
      if (err.status !== 401) throw err;
      clearApiToken();
      await ensureApiToken({ refresh: true });
      return apiFetch(`/hotels/${id}`, options);
    }
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
