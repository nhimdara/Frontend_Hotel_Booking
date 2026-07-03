import { ref } from "vue";
import { API_URL, apiFetch } from "./client.js";
import { clearApiToken, ensureApiToken } from "../auth.js";

export const fallbackImage =
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

console.log("🔧 Hotel API Configuration:", {
  API_URL,
  apiOrigin,
  env: import.meta.env.VITE_API_URL,
});

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

export function resolveAssetUrl(url) {
  if (!url) return "";

  const normalizedUrl = String(url).trim().replace(/\\/g, "/");
  if (!normalizedUrl) return "";

  // Already an absolute URL
  if (/^https?:\/\//i.test(normalizedUrl)) {
    console.log(`  resolveAssetUrl: ${normalizedUrl} -> absolute URL`);
    return normalizedUrl;
  }

  const withoutLeadingSlash = normalizedUrl.replace(/^\/+/, "");
  const publicStoragePath = withoutLeadingSlash
    .replace(/^public\//, "storage/")
    .replace(/^storage\/app\/public\//, "storage/");

  // Path starting with /
  if (normalizedUrl.startsWith("/")) {
    const resolved = `${apiOrigin}${normalizedUrl}`;
    console.log(
      `  resolveAssetUrl: ${normalizedUrl} -> ${resolved} (apiOrigin: ${apiOrigin})`,
    );
    return resolved;
  }

  // Handle relative paths that might have storage/uploads folders
  if (
    publicStoragePath.includes("storage/") ||
    publicStoragePath.includes("uploads/")
  ) {
    const resolved = `${apiOrigin}/${publicStoragePath}`
      .replace(/\/\//g, "/")
      .replace(/:\//, "://");
    console.log(
      `  resolveAssetUrl: ${normalizedUrl} -> ${resolved} (storage/uploads path)`,
    );
    return resolved;
  }

  const resolved = `${apiOrigin}/${publicStoragePath}`;
  console.log(
    `  resolveAssetUrl: ${normalizedUrl} -> ${resolved} (relative path)`,
  );
  return resolved;
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

  // Check for various image field names that API might return
  if (raw.image) {
    const resolved = resolveAssetUrl(raw.image);
    console.log("✓ Found image in image:", { raw: raw.image, resolved });
    return resolved;
  }
  if (raw.image_url) {
    const resolved = resolveAssetUrl(raw.image_url);
    console.log("✓ Found image in image_url:", {
      raw: raw.image_url,
      resolved,
    });
    return resolved;
  }
  if (raw.image_path) {
    const resolved = resolveAssetUrl(raw.image_path);
    console.log("✓ Found image in image_path:", {
      raw: raw.image_path,
      resolved,
    });
    return resolved;
  }
  if (raw.featured_image) {
    const resolved = resolveAssetUrl(raw.featured_image);
    console.log("✓ Found image in featured_image:", {
      raw: raw.featured_image,
      resolved,
    });
    return resolved;
  }
  if (raw.cover_image) {
    const resolved = resolveAssetUrl(raw.cover_image);
    console.log("✓ Found image in cover_image:", {
      raw: raw.cover_image,
      resolved,
    });
    return resolved;
  }

  if (imageUrls.length) {
    const resolved = resolveAssetUrl(imageUrls[0]);
    console.log("✓ Found image in image_urls array:", {
      raw: imageUrls[0],
      resolved,
    });
    return resolved;
  }
  if (Array.isArray(raw.images) && raw.images.length) {
    const image = raw.images[0];
    const url = typeof image === "string" ? image : image.url || image.path;
    const resolved = resolveAssetUrl(url);
    console.log("✓ Found image in images array:", { raw: url, resolved });
    return resolved;
  }

  console.log(
    "✗ No image found, using fallback. Image-related fields:",
    Object.keys(raw).filter((k) => k.includes("image")),
  );
  if (Object.keys(raw).length > 0) {
    console.log("  All available fields in response:", Object.keys(raw));
  }
  return fallbackImage;
}

function normalizeBadge(raw) {
  const badge =
    raw.badge || raw.primary_badge || parseList(raw.badges)[0] || null;

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
        if (value === false || value === null || value === undefined)
          return null;
        if (typeof value === "object") {
          return {
            ...value,
            type: value.type || value.room_type || key,
            name:
              value.name ||
              value.label ||
              `${key.charAt(0).toUpperCase()}${key.slice(1)} Room`,
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
      name:
        room.name || room.roomName || room.room_number || `${roomType} Room`,
      price: Number(
        room.price ?? room.price_per_night ?? room.base_rate ?? price,
      ),
      max_guests: Number(
        room.max_guests ?? room.max_occupancy ?? room.capacity ?? 2,
      ),
      image: resolveAssetUrl(room.image || room.image_url) || fallbackImage,
      available: room.available ?? room.status !== "maintenance",
    };
  });

  const finalImage = firstImage(raw);
  console.log("Hotel normalized:", {
    name: raw.name,
    apiOrigin,
    rawImageFields: {
      image_url: raw.image_url,
      image: raw.image,
      image_path: raw.image_path,
      featured_image: raw.featured_image,
      cover_image: raw.cover_image,
      image_urls: raw.image_urls,
    },
    finalImage,
    allRawKeys: Object.keys(raw),
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
    image: finalImage,
    images: imageUrls.length ? imageUrls : [finalImage],
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
    const existingIndex = hotels.value.findIndex(
      (item) => item.id === hotel.id,
    );

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
      const response = await apiFetch("/hotels", options);
      console.log("Raw API response from hotel creation:", response);
      console.log("Response keys:", response ? Object.keys(response) : "null");

      // Handle different API response formats
      const hotelData = response?.data || response?.hotel || response;
      console.log("Extracted hotel data:", hotelData);
      console.log("Hotel data image fields:", {
        image: hotelData?.image,
        image_url: hotelData?.image_url,
        image_path: hotelData?.image_path,
      });

      // Normalize to trigger image extraction logging
      console.log("📍 Now normalizing hotel data to extract image...");
      const normalized = normalizeHotel(hotelData);
      console.log("✅ Normalized hotel with image:", normalized.image);

      return normalized;
    } catch (err) {
      if (err.status !== 401) throw err;
      clearApiToken();
      await ensureApiToken({ refresh: true });
      const response = await apiFetch("/hotels", options);
      console.log("Retry response from hotel creation:", response);
      const hotelData = response?.data || response?.hotel || response;
      console.log("📍 Now normalizing hotel data from retry...");
      const normalized = normalizeHotel(hotelData);
      return normalized;
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
