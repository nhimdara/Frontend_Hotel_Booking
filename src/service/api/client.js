export const API_URL =
 import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"; // Make sure this is correct

export function jsonHeaders(token = localStorage.getItem("token")) {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiFetch(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const token = localStorage.getItem("token");
  const headers = {
    ...(isFormData
      ? {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
      : jsonHeaders(token)),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const error = new Error(data?.message || "API request failed");
    if (data?.errors) {
      error.message = Object.values(data.errors).flat().join(" ");
    }
    error.status = res.status;
    error.errors = data?.errors || {};
    error.data = data;
    throw error;
  }

  return data;
}

export const authApi = {
  register(payload) {
    return apiFetch("/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  login(payload) {
    return apiFetch("/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  logout() {
    return apiFetch("/logout", { method: "POST" });
  },
  profile() {
    return apiFetch("/profile");
  },
  updateProfile(payload) {
    return apiFetch("/profile", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
};

export const bookingApi = {
  list() {
    return apiFetch("/bookings",
      {
        method: "GET",
        headers: jsonHeaders(),
      }
    );
  },
  create(payload) {
    return apiFetch("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  show(id) {
    return apiFetch(`/bookings/${id}`);
  },
  update(id, payload) {
    return apiFetch(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
  remove(id) {
    return apiFetch(`/bookings/${id}`, { method: "DELETE" });
  },
};

export const paymentApi = {
  initiate(bookingId, method = "qr_scan") {
    return apiFetch(`/bookings/${bookingId}/payment`, {
      method: "POST",
      body: JSON.stringify({ method }),
    });
  },
  status(paymentId) {
    return apiFetch(`/payments/${paymentId}/status`);
  },
  authorize(paymentId) {
    return apiFetch(`/payments/${paymentId}/authorize`, { method: "POST" });
  },
};

export const adminApi = {
  hotelAdmins() {
    return apiFetch("/admin/hotel-admins");
  },
  createHotelAdmin(payload) {
    return apiFetch("/admin/hotel-admins", { method: "POST", body: JSON.stringify(payload) });
  },
  updateHotelAdmin(id, payload) {
    return apiFetch(`/admin/hotel-admins/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  },
  deleteHotelAdmin(id) {
    return apiFetch(`/admin/hotel-admins/${id}`, { method: "DELETE" });
  },
  users() {
    return apiFetch("/admin/users");
  },
  changeUserRole(userId, role) {
    return apiFetch(`/admin/users/${userId}/role`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    });
  },
  deleteUser(userId) {
    return apiFetch(`/admin/users/${userId}`, { method: "DELETE" });
  },
  overview(hotelId) {
    const query = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiFetch(`/admin/dashboard/overview${query}`);
  },
  revenuePerformance(hotelId, range = "current") {
    const params = new URLSearchParams({ range });
    if (hotelId) params.set("hotel_id", hotelId);
    return apiFetch(`/admin/dashboard/revenue-performance?${params}`);
  },
  recentBookings(hotelId, limit = 5) {
    const params = new URLSearchParams({ limit });
    if (hotelId) params.set("hotel_id", hotelId);
    return apiFetch(`/admin/dashboard/recent-bookings?${params}`);
  },
  bookings(hotelId) {
    const query = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiFetch(`/admin/bookings${query}`);
  },
  bookingsSummary(hotelId) {
    const query = hotelId ? `?hotel_id=${hotelId}` : "";
    return apiFetch(`/admin/dashboard/bookings-summary${query}`);
  },
};

export const roomApi = {
  list(params = {}) {
    const query = new URLSearchParams(params);
    return apiFetch(`/admin/rooms${query.toString() ? `?${query}` : ""}`);
  },
  show(id) {
    return apiFetch(`/admin/rooms/${id}`);
  },
  create(payload) {
    if (payload instanceof FormData) {
      return apiFetch("/admin/rooms", {
        method: "POST",
        body: payload,
      });
    }

    return apiFetch("/admin/rooms", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  update(id, payload) {
    if (payload instanceof FormData) {
      payload.append("_method", "PUT");
      return apiFetch(`/admin/rooms/${id}`, {
        method: "POST",
        body: payload,
      });
    }

    return apiFetch(`/admin/rooms/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
  remove(id) {
    return apiFetch(`/admin/rooms/${id}`, { method: "DELETE" });
  },
};
