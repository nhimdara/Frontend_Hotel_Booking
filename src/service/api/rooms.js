import { roomApi } from "./client.js";
import { rooms as demoRooms, stats as demoStats } from "./Data_room.js";
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

export function normalizeRoom(raw = {}) {
  const rawType = raw.room_type || raw.type || raw.roomType || raw.category || "";
  const normalizedType = typeMap[rawType] || rawType;
  const label = labelMap[normalizedType] || titleCase(rawType) || "Standard King";
  const status = raw.status || (raw.active === false ? "Maintenance" : "Available");

  return {
    id: raw.id,
    roomNumber: String(raw.room_number || raw.roomNumber || raw.name || raw.id || "Room"),
    roomName: raw.name || raw.roomName || raw.room_number || "",
    roomType: label,
    apiRoomType: normalizedType || typeMap[label] || "standard",
    floor: raw.floor ? `Floor ${raw.floor}` : raw.floorNumber ? `Floor ${raw.floorNumber}` : "Floor 1",
    floorNumber: raw.floor || raw.floorNumber || "1",
    wing: raw.wing || raw.building || raw.location || "",
    status: titleCase(status),
    baseRate: numberValue(raw.base_rate ?? raw.price_per_night ?? raw.price ?? raw.baseRate),
    maxOccupancy: numberValue(raw.max_occupancy ?? raw.max_guests ?? raw.maxOccupancy ?? raw.capacity, 2),
    description: raw.description || "",
    media: (raw.images || raw.image_urls || [])
      .map((image, index) => {
        const url =
          typeof image === "string"
            ? image
            : image.url || image.path || image.image_url || image.image_path;

        return {
          id: image.id || `${raw.id || "room"}-${index}`,
          url: resolveAssetUrl(url),
        };
      })
      .filter((item) => item.url),
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
      badge: total ? `${Math.round((occupied / total) * 100)}% Occupancy` : "0% Occupancy",
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

export async function fetchRooms() {
  await ensureApiToken();

  if (!hasApiToken()) {
    return { rooms: demoRooms.map(normalizeRoom), stats: demoStats, source: "demo" };
  }

  const data = await roomApi.list({ per_page: 1000 });
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

  if (!hasApiToken()) {
    const room = demoRooms.find((item) => String(item.id) === String(id));
    return normalizeRoom(room || { id });
  }

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

  if (!hasApiToken()) {
    return normalizeRoom({
      id: `local-${Date.now()}`,
      room_number: form.roomName,
      room_type: typeMap[form.roomType] || form.roomType,
      floor: form.floorNumber,
      wing: form.wing,
      price_per_night: form.baseRate,
      max_guests: form.maxOccupancy,
      description: form.description,
      image_urls: form.mediaFiles.map((file) => file.preview).filter(Boolean),
    });
  }

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

  if (!hasApiToken()) {
    return normalizeRoom({
      id,
      room_number: form.roomName,
      room_type: typeMap[form.roomType] || form.roomType,
      floor: form.floorNumber,
      wing: form.wing,
      price_per_night: form.baseRate,
      max_guests: form.maxOccupancy,
      description: form.description,
      image_urls: form.mediaFiles.map((file) => file.preview).filter(Boolean),
    });
  }

  const data = await roomApi.update(id, formToRoomPayload(form));
  return normalizeRoom(data.room || data.data || data);
}
