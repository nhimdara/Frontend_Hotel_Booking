import { adminApi, bookingApi } from "./client.js";
import { clearApiToken, ensureApiToken, hasApiToken } from "../auth.js";
import { guests as demoGuests } from "./Data_guest.js";
import { fetchRooms } from "./rooms.js";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function numberValue(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function percentValue(value, fallback = 0) {
  const parsed = numberValue(value, fallback);
  const percent = parsed > 0 && parsed <= 1 ? parsed * 100 : parsed;
  return Math.max(0, Math.min(100, Math.round(percent)));
}

function occupancyLabel(percent) {
  if (percent >= 80) return "Optimal";
  if (percent > 0) return "Active";
  return "Low";
}

function money(value) {
  return currency.format(numberValue(value));
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.data?.data)) return value.data.data;
  if (value && typeof value === "object") return Object.values(value);
  return [];
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function normalizeStatus(value, paymentValue = "") {
  const status = String(value || "").toLowerCase();
  const paymentStatus = String(paymentValue || "").toLowerCase();
  if (status.includes("awaiting") || status.includes("approval")) return "Awaiting Approval";
  if (status.includes("denied")) return "Denied";
  if (status.includes("cancel")) return "Canceled";
  if (status.includes("check")) return "Checked-in";
  if (status.includes("pending")) return "Pending";
  if (status.includes("confirm")) return "Confirmed";
  if (["paid", "authorized", "completed"].some((item) => paymentStatus.includes(item))) return "Paid";
  return "Confirmed";
}

function isOccupyingBooking(booking) {
  return ["Confirmed", "Paid", "Checked-in"].includes(booking.status);
}

function bookingRoomKey(booking) {
  const raw = booking.raw || {};
  return (
    raw.room_id ||
    raw.roomId ||
    raw.room?.id ||
    booking.bookingId ||
    booking.id
  );
}

function deriveOccupancy(bookings = [], roomData = null, existing = {}) {
  const activeBookings = bookings.filter(isOccupyingBooking);
  const occupiedKeys = new Set(activeBookings.map(bookingRoomKey).filter(Boolean));
  const bookedRooms = occupiedKeys.size || activeBookings.length;
  const rooms = roomData?.rooms || [];
  const occupiedFromRooms = numberValue(roomData?.stats?.occupied?.value, 0);
  const totalRooms = rooms.length || numberValue(existing.roomAvailability?.total, 0) || bookedRooms;
  const occupiedRooms = Math.min(Math.max(occupiedFromRooms, bookedRooms), totalRooms || bookedRooms);
  const occupancyPercent = totalRooms ? percentValue((occupiedRooms / totalRooms) * 100) : 0;

  return {
    percent: occupancyPercent,
    total: totalRooms || 1,
    occupied: occupiedRooms,
    available: Math.max((totalRooms || 0) - occupiedRooms, 0),
  };
}

export function normalizeBooking(raw = {}) {
  const guest = raw.user || raw.guest || raw.customer || {};
  const hotel = raw.hotel || {};
  const room = raw.room || {};
  const payment =
    raw.payment ||
    raw.latest_payment ||
    raw.payment_details ||
    raw.payments?.[0] ||
    {};
  const roomType = raw.room_type || raw.roomType || room.type || room.room_type || room.name || "Room";
  const checkIn = raw.check_in || raw.checkIn;
  const checkOut = raw.check_out || raw.checkOut;
  const guestName =
    raw.name ||
    raw.guest_name ||
    guest.name ||
    guest.fullName ||
    "Guest";

  return {
    id: raw.id || raw.booking_reference || raw.bookingReference,
    name: guestName,
    email: raw.email || guest.email || "—",
    roomType,
    roomNumber: raw.room_number || raw.roomNumber || room.number || room.room_number || hotel.name || "Unassigned",
    bookingId: raw.booking_reference || raw.bookingReference || raw.id || "—",
    checkIn: formatDate(checkIn),
    checkOut: formatDate(checkOut),
    nights: numberValue(raw.nights, 1),
    status: normalizeStatus(raw.status, raw.payment_status || raw.paymentStatus || payment.status),
    paymentStatus: String(payment.status || raw.payment_status || raw.paymentStatus || "unpaid"),
    rawStatus: raw.status || "",
    raw,
  };
}

export function normalizeOverview(raw = {}) {
  const payload = raw.data || raw;
  const overview = payload.overview || payload.summary || payload.stats || payload;
  const occupancy = overview.occupancy || overview.occupancy_rate || payload.occupancy || {};
  const checkIns =
    overview.check_ins ||
    overview.checkIns ||
    overview.checkins ||
    payload.check_ins ||
    {};
  const revenue = overview.revenue || payload.revenue || {};
  const rooms =
    overview.rooms ||
    overview.room_availability ||
    overview.roomAvailability ||
    payload.room_availability ||
    {};

  const occupancyPercent = percentValue(
    occupancy.value ??
      occupancy.percent ??
      occupancy.rate ??
      occupancy.percentage ??
      overview.occupancy_rate ??
      overview.occupancy,
  );
  const totalRooms = numberValue(
    rooms.total ?? rooms.total_rooms ?? overview.total_rooms,
    0,
  );
  const occupiedRooms = numberValue(
    rooms.occupied ?? rooms.occupied_rooms ?? overview.occupied_rooms,
    Math.round((totalRooms * occupancyPercent) / 100),
  );
  const availableRooms = numberValue(
    rooms.available ?? rooms.available_rooms ?? overview.available_rooms,
    Math.max(totalRooms - occupiedRooms, 0),
  );

  return {
    stats: {
      occupancy: {
        value: occupancyPercent,
        label: occupancy.label || (occupancyPercent >= 80 ? "Optimal" : "Active"),
      },
      checkIns: {
        today: numberValue(checkIns.today ?? overview.check_ins_today),
        total: numberValue(checkIns.total ?? overview.check_ins_total ?? checkIns.today),
      },
      revenue: {
        amount: money(
          revenue.amount ??
            revenue.total ??
            revenue.value ??
            overview.total_revenue ??
            overview.revenue,
        ),
        change: revenue.change || revenue.label || revenue.period || "Live total",
      },
    },
    roomAvailability: {
      total: totalRooms || Math.max(occupiedRooms, 1),
      occupied: occupiedRooms,
      available: availableRooms,
    },
  };
}

export function normalizeRevenueSeries(raw = {}) {
  const payload = raw.data || raw;
  const rows =
    payload.data?.data ||
    payload.data ||
    payload.series ||
    payload.revenue_performance ||
    payload.revenuePerformance ||
    payload.revenue ||
    payload ||
    [];
  const list = toArray(rows);

  return list.map((item, index) => {
    const open = numberValue(item.open ?? item.opening ?? item.start ?? item.amount ?? item.revenue);
    const close = numberValue(item.close ?? item.closing ?? item.end ?? item.amount ?? item.revenue, open);
    const high = numberValue(item.high ?? Math.max(open, close), Math.max(open, close));
    const low = numberValue(item.low ?? Math.min(open, close), Math.min(open, close));

    return {
      label: item.label || item.date || item.month || `#${index + 1}`,
      open,
      high,
      low,
      close,
      bullish: close >= open,
    };
  });
}

export async function fetchDashboardData({ hotelId, range = "current" } = {}) {
  await ensureApiToken();

  const [overview, revenue, recentBookings, roomData] = await Promise.all([
    adminApi.overview(hotelId),
    adminApi.revenuePerformance(hotelId, range),
    adminApi.recentBookings(hotelId, 10),
    fetchRooms(hotelId ? { hotel_id: hotelId } : {}).catch(() => null),
  ]);
  const normalizedOverview = normalizeOverview(overview);
  const bookings = toArray(
    recentBookings.bookings ||
    recentBookings.recent_bookings ||
    recentBookings.recentBookings ||
    recentBookings.data?.data ||
    recentBookings.data?.bookings ||
    recentBookings.data?.recent_bookings ||
    recentBookings.data ||
    recentBookings
  ).map(normalizeBooking);
  const shouldDeriveOccupancy = normalizedOverview.stats.occupancy.value === 0 && bookings.some(isOccupyingBooking);
  const derivedOccupancy = shouldDeriveOccupancy
    ? deriveOccupancy(bookings, roomData, normalizedOverview)
    : null;

  if (derivedOccupancy) {
    normalizedOverview.stats.occupancy = {
      value: derivedOccupancy.percent,
      label: occupancyLabel(derivedOccupancy.percent),
    };
    normalizedOverview.roomAvailability = {
      total: derivedOccupancy.total,
      occupied: derivedOccupancy.occupied,
      available: derivedOccupancy.available,
    };
  }

  return {
    ...normalizedOverview,
    candles: normalizeRevenueSeries(revenue),
    bookings,
  };
}

export async function fetchBookingsData({ hotelId } = {}) {
  await ensureApiToken();

  let bookings;
  let summary;

  try {
    [bookings, summary] = await Promise.all([
      adminApi.bookings(hotelId).catch(() => bookingApi.list()),
      adminApi.bookingsSummary(hotelId).catch(() => null),
    ]);
  } catch (err) {
    if (err.status !== 401) throw err;

    clearApiToken();
    await ensureApiToken({ refresh: true });
    [bookings, summary] = await Promise.all([
      adminApi.bookings(hotelId).catch(() => bookingApi.list()),
      adminApi.bookingsSummary(hotelId).catch(() => null),
    ]);
  }
  const rows =
    bookings.bookings?.data ||
    bookings.bookings ||
    bookings.data?.bookings?.data ||
    bookings.data?.bookings ||
    bookings.data?.data ||
    bookings.data ||
    bookings ||
    [];
  const normalized = toArray(rows).map(normalizeBooking);
  const summaryPayload = summary?.data || summary || {};
  const roomData = await fetchRooms(hotelId ? { hotel_id: hotelId } : {}).catch(() => null);
  const summaryOccupancy = percentValue(summaryPayload.occupancy_rate ?? summaryPayload.occupancy ?? 0);
  const derivedOccupancy = summaryOccupancy === 0 && normalized.some(isOccupyingBooking)
    ? deriveOccupancy(normalized, roomData)
    : null;
  const totalRevenue =
    summaryPayload.revenue_mtd ??
    summaryPayload.revenue?.total ??
    summaryPayload.revenue?.amount ??
    summaryPayload.revenue ??
    summaryPayload.total_revenue ??
    0;

  return {
    stats: {
      totalBookings: { value: summaryPayload.total_bookings ?? summaryPayload.bookings_count ?? normalized.length },
      checkInsToday: { value: summaryPayload.check_ins_today ?? summaryPayload.checkins_today ?? 0 },
      pendingApproval: {
        value:
          summaryPayload.pending_approval ??
          normalized.filter((booking) => booking.status === "Awaiting Approval").length,
      },
      occupancyRate: { value: derivedOccupancy?.percent ?? summaryOccupancy },
      revenue: { value: money(totalRevenue), period: summaryPayload.period || "MTD" },
    },
    bookings: normalized,
  };
}

export async function fetchGuestsData() {
  await ensureApiToken();

  if (!hasApiToken()) {
    return demoGuests;
  }

  const data = await adminApi.users();
  const users = data.users || data.data?.users || data.data?.data || data.data || data || [];

  return toArray(users).map((user) => ({
        id: user.id,
        name: user.name || user.fullName || "Guest",
        email: user.email || "—",
        avatar:
          user.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "Guest")}&background=0f766e&color=fff`,
        status: user.status || "Past Guest",
        loyalty: user.loyalty || user.role || "Member",
        loyaltyProgress: numberValue(user.loyalty_progress, 0),
        lastVisit: formatDate(user.last_visit || user.updated_at),
        totalSpent: money(user.total_spent || 0),
      }));
}
