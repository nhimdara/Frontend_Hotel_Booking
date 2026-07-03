import { roomApi } from "./client.js";
import { clearApiToken, ensureApiToken, hasApiToken } from "../auth.js";
import { resolveAssetUrl } from "./Hotel.js";

const typeMap = {
  "Standard King": "standard",
  "Standard Double": "standard",
  "Double Queen": "deluxe",
  "Deluxe King": "deluxe",
  "Junior Suite": "suite",
  "Penthouse Suite": "presidential",
  "Ocean View Loft": "suite",
};

const labelMap = {
  standard: "Standard King",
  deluxe: "Deluxe King",
  suite: "Junior Suite",
  presidential: "Penthouse Suite",
};

function numberValue(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function titleCase(value = "") {
  return value
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeRoomStatus(raw = {}) {
  const value = String(
    raw.status ||
      raw.room_status ||
      raw.availability_status ||
      (raw.active === false ? "maintenance" : ""),
  ).toLowerCase();

  if (["occupied", "booked", "reserved", "checked_in", "checked in"].some((item) => value.includes(item))) {
    return "Occupied";
  }
  if (["maintenance", "repair", "out_of_service", "out of service", "inactive"].some((item) => value.includes(item))) {
    return "Maintenance";
  }
  if (["cleaning", "housekeeping", "dirty"].some((item) => value.includes(item))) {
    return "Cleaning";
  }
  if (["available", "vacant", "ready", "active"].some((item) => value.includes(item))) {
    return "Available";
  }
  if (raw.available === true || raw.is_available === true) return "Available";
  if (raw.available === false || raw.is_available === false) return "Occupied";

  return "Available";
}

function parseList(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (!value) return [];

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [value];
    } catch {
      return [value];
    }
  }

  if (typeof value === "object") return Object.values(value);
  return [];
}

function imageUrlFromValue(value) {
  if (!value) return "";
  if (typeof value === "string") return value;

  return (
    value.url ||
    value.path ||
    value.image ||
    value.image_url ||
    value.image_path ||
    value.featured_image ||
    value.cover_image ||
    value.thumbnail ||
    ""
  );
}

function roomImageCandidates(raw = {}) {
  return [
    imageUrlFromValue(raw.image_url),
    imageUrlFromValue(raw.image),
    imageUrlFromValue(raw.image_path),
    imageUrlFromValue(raw.featured_image),
    imageUrlFromValue(raw.cover_image),
    imageUrlFromValue(raw.thumbnail),
    ...parseList(raw.image_urls).map(imageUrlFromValue),
    ...parseList(raw.images).map(imageUrlFromValue),
    ...parseList(raw.media).map(imageUrlFromValue),
    ...parseList(raw.photos).map(imageUrlFromValue),
  ].filter(Boolean);
}

export function normalizeRoom(raw = {}) {
  const rawType = raw.room_type || raw.type || raw.roomType || raw.category || "";
  const normalizedType = typeMap[rawType] || rawType;
  const label = labelMap[normalizedType] || titleCase(rawType) || "Standard King";
  const media = roomImageCandidates(raw)
    .map((url, index) => ({
      id: `${raw.id || "room"}-${index}`,
      url: resolveAssetUrl(url),
    }))
    .filter((item) => item.url);

  return {
    id: raw.id,
    roomNumber: String(raw.room_number || raw.roomNumber || raw.name || raw.id || "Room"),
    roomName: raw.name || raw.roomName || raw.room_number || "",
    roomType: label,
    apiRoomType: normalizedType || typeMap[label] || "standard",
    floor: raw.floor ? `Floor ${raw.floor}` : raw.floorNumber ? `Floor ${raw.floorNumber}` : "Floor 1",
    floorNumber: raw.floor || raw.floorNumber || "1",
    wing: raw.wing || raw.building || raw.location || "",
    status: normalizeRoomStatus(raw),
    baseRate: numberValue(raw.base_rate ?? raw.price_per_night ?? raw.price ?? raw.baseRate),
    maxOccupancy: numberValue(raw.max_occupancy ?? raw.max_guests ?? raw.maxOccupancy ?? raw.capacity, 2),
    description: raw.description || "",
    image: media[0]?.url || "",
    media,
    raw,
  };
}

function computeStats(rooms) {
  const total = rooms.length;
  const occupied = rooms.filter((room) => room.status === "Occupied").length;
  const maintenance = rooms.filter((room) => room.status === "Maintenance").length;
  const available = rooms.filter((room) => room.status === "Available").length;

  return {
    totalRooms: { value: total, badge: "From API" },
    occupied: {
      value: occupied,
      badge: `${occupied} of ${total} Occupied`,
    },
    maintenance: { value: maintenance, badge: "Requires Attention" },
    available: { value: available, badge: "Ready to Book" },
  };
}

function roomRowsFromResponse(data) {
  const paginated =
    data?.rooms ||
    data?.data?.rooms ||
    data?.data ||
    data;

  if (Array.isArray(paginated)) return paginated;
  if (Array.isArray(paginated?.data)) return paginated.data;
  if (Array.isArray(data?.rooms?.data)) return data.rooms.data;
  if (Array.isArray(data?.data?.data)) return data.data.data;

  return [];
}

function requireApiToken() {
  if (!hasApiToken()) {
    throw new Error("API token is required to load rooms.");
  }
}

export async function fetchRooms(params = {}) {
  await ensureApiToken();
  requireApiToken();

  const data = await roomApi.list({ per_page: 1000, ...params });
  const rows = roomRowsFromResponse(data);
  const rooms = rows.map(normalizeRoom);

  return {
    rooms,
    stats: computeStats(rooms),
    source: "api",
  };
}

export async function fetchRoom(id) {
  await ensureApiToken();
  requireApiToken();

  const data = await roomApi.show(id);
  return normalizeRoom(data.room || data.data || data);
}

function formToRoomPayload(form) {
  const hasUploads = form.mediaFiles.some((item) => item.file);
  const imageUrls = form.mediaFiles
    .filter((item) => !item.file)
    .map((item) => item.preview || item.url)
    .filter(Boolean);

  const payload = {
    room_number: form.roomName.trim(),
    hotel_id: form.hotelId ? Number(form.hotelId) : undefined,
    room_type: typeMap[form.roomType] || form.roomType || "standard",
    floor: numberValue(form.floorNumber, 1),
    wing: form.wing || "",
    base_rate: numberValue(form.baseRate),
    max_occupancy: numberValue(form.maxOccupancy, 2),
    status: String(form.status || "available").toLowerCase(),
    description: form.description || "",
    image_urls: imageUrls,
  };

  if (!hasUploads) return payload;

  const data = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      value.forEach((item) => data.append(`${key}[]`, item));
    } else {
      data.append(key, value);
    }
  });
  form.mediaFiles
    .filter((item) => item.file)
    .forEach((item) => data.append("image_files[]", item.file));

  return data;
}

export async function createRoom(form) {
  await ensureApiToken();
  requireApiToken();

  const payload = formToRoomPayload(form);
  let data;

  try {
    data = await roomApi.create(payload);
  } catch (err) {
    if (err.status !== 401) throw err;
    clearApiToken();
    await ensureApiToken({ refresh: true });
    data = await roomApi.create(payload);
  }

  return normalizeRoom(data.room || data.data || data);
}

export async function updateRoom(id, form) {
  await ensureApiToken();
  requireApiToken();

  const data = await roomApi.update(id, formToRoomPayload(form));
  return normalizeRoom(data.room || data.data || data);
}

export async function fetchRoomsForHotel(hotelId) {
  const { rooms } = await fetchRooms({ hotel_id: hotelId });

  return rooms.filter((room) => {
    const rawHotelId = room.raw?.hotel_id ?? room.raw?.hotelId ?? room.raw?.hotel?.id;
    return rawHotelId == null || String(rawHotelId) === String(hotelId);
  });
}

function seedRoomFormsForHotel(hotel = {}) {
  const basePrice = numberValue(hotel.pricePerNight ?? hotel.price ?? 120, 120);

  return [
    {
      hotelId: hotel.id,
      roomName: `${hotel.name || "Hotel"} Standard 101`,
      roomType: "Standard King",
      floorNumber: "1",
      wing: "Main",
      baseRate: Math.max(1, Math.round(basePrice)),
      maxOccupancy: 2,
      description: `A comfortable standard room at ${hotel.name || "this hotel"}.`,
      mediaFiles: [],
    },
    {
      hotelId: hotel.id,
      roomName: `${hotel.name || "Hotel"} Deluxe 201`,
      roomType: "Deluxe King",
      floorNumber: "2",
      wing: "Main",
      baseRate: Math.max(1, Math.round(basePrice * 1.25)),
      maxOccupancy: 3,
      description: `A larger deluxe room with upgraded amenities at ${hotel.name || "this hotel"}.`,
      mediaFiles: [],
    },
    {
      hotelId: hotel.id,
      roomName: `${hotel.name || "Hotel"} Suite 301`,
      roomType: "Junior Suite",
      floorNumber: "3",
      wing: "Main",
      baseRate: Math.max(1, Math.round(basePrice * 1.6)),
      maxOccupancy: 4,
      description: `A spacious suite for guests who want extra comfort at ${hotel.name || "this hotel"}.`,
      mediaFiles: [],
    },
  ];
}

export async function ensureRoomsForHotel(hotel) {
  if (!hotel?.id) return [];

  const existingRooms = await fetchRoomsForHotel(hotel.id);
  if (existingRooms.length) return existingRooms;

  const createdRooms = [];
  for (const form of seedRoomFormsForHotel(hotel)) {
    createdRooms.push(await createRoom(form));
  }

  return createdRooms;
}
