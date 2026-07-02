import { adminApi, bookingApi } from "./client.js";
import { hasApiToken } from "../auth.js";
import {
  bookings as overviewBookings,
  roomAvailability as overviewRoomAvailability,
  stats as overviewStats,
} from "./Data_overview.js";
import {
  bookings as demoBookings,
  stats as demoBookingStats,
} from "./Data_bookin.js";
import { guests as demoGuests } from "./Data_guest.js";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function numberValue(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
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

function normalizeStatus(value) {
  const status = String(value || "confirmed").toLowerCase();
  if (status.includes("cancel")) return "Canceled";
  if (status.includes("check")) return "Checked-in";
  if (status.includes("pending")) return "Pending";
  return "Confirmed";
}

export function normalizeBooking(raw = {}) {
  const guest = raw.user || raw.guest || raw.customer || {};
  const hotel = raw.hotel || {};
  const roomType = raw.room_type || raw.roomType || raw.room?.type || "Room";
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
    roomNumber: raw.room_number || raw.roomNumber || raw.room?.number || hotel.name || "Unassigned",
    bookingId: raw.booking_reference || raw.bookingReference || raw.id || "—",
    checkIn: formatDate(checkIn),
    checkOut: formatDate(checkOut),
    nights: numberValue(raw.nights, 1),
    status: normalizeStatus(raw.status),
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

  const occupancyPercent = numberValue(
    occupancy.value ??
      occupancy.percent ??
      occupancy.rate ??
      occupancy.percentage ??
      overview.occupancy_rate ??
      overview.occupancy,
  );
  const totalRooms = numberValue(rooms.total ?? overview.total_rooms, 0);
  const occupiedRooms = numberValue(
    rooms.occupied ?? overview.occupied_rooms,
    Math.round((totalRooms * occupancyPercent) / 100),
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
      available: numberValue(rooms.available ?? overview.available_rooms),
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
    const open = numberValue(item.open ?? item.start ?? item.amount ?? item.revenue);
    const close = numberValue(item.close ?? item.end ?? item.amount ?? item.revenue, open);
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
  if (!hasApiToken()) {
    return {
      stats: overviewStats,
      roomAvailability: overviewRoomAvailability,
      candles: [
        { label: "Mon", open: 180, high: 260, low: 140, close: 240, bullish: true },
        { label: "Tue", open: 240, high: 290, low: 210, close: 225, bullish: false },
        { label: "Wed", open: 225, high: 330, low: 220, close: 310, bullish: true },
        { label: "Thu", open: 310, high: 360, low: 280, close: 340, bullish: true },
        { label: "Fri", open: 340, high: 380, low: 300, close: 320, bullish: false },
      ],
      bookings: overviewBookings.map(normalizeBooking),
    };
  }

  const [overview, revenue, recentBookings] = await Promise.all([
    adminApi.overview(hotelId),
    adminApi.revenuePerformance(hotelId, range),
    adminApi.recentBookings(hotelId, 10),
  ]);

  return {
    ...normalizeOverview(overview),
    candles: normalizeRevenueSeries(revenue),
    bookings: toArray(
      recentBookings.bookings ||
      recentBookings.recent_bookings ||
      recentBookings.recentBookings ||
      recentBookings.data?.data ||
      recentBookings.data?.bookings ||
      recentBookings.data?.recent_bookings ||
      recentBookings.data ||
      recentBookings
    ).map(normalizeBooking),
  };
}

export async function fetchBookingsData() {
  if (!hasApiToken()) {
    return {
      stats: demoBookingStats,
      bookings: demoBookings.map(normalizeBooking),
    };
  }

  const [bookings, summary] = await Promise.all([
    bookingApi.list(),
    adminApi.bookingsSummary().catch(() => null),
  ]);
  const rows =
    bookings.bookings ||
    bookings.data?.bookings ||
    bookings.data?.data ||
    bookings.data ||
    bookings ||
    [];
  const normalized = toArray(rows).map(normalizeBooking);
  const summaryPayload = summary?.data || summary || {};
  const totalRevenue =
    summaryPayload.revenue?.total ??
    summaryPayload.revenue?.amount ??
    summaryPayload.revenue ??
    summaryPayload.total_revenue ??
    0;

  return {
    stats: {
      totalBookings: { value: summaryPayload.total_bookings ?? summaryPayload.bookings_count ?? normalized.length },
      checkInsToday: { value: summaryPayload.check_ins_today ?? summaryPayload.checkins_today ?? 0 },
      occupancyRate: { value: summaryPayload.occupancy_rate ?? summaryPayload.occupancy ?? 0 },
      revenue: { value: money(totalRevenue), period: summaryPayload.period || "MTD" },
    },
    bookings: normalized,
  };
}

export async function fetchGuestsData() {
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
