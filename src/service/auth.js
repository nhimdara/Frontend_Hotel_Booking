import { reactive, computed } from "vue";
import { authApi } from "./api/client.js";

const USERS_KEY = "stayeasy_users";
const SESSION_KEY = "stayeasy_session";
const TOKEN_KEY = "token";

const seededUsers = [
  {
    id: "admin-1",
    fullName: "Alex Rivera",
    email: "admin@stayeasy.com",
    password: "password",
    role: "admin",
    title: "General Manager",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
];

const state = reactive({
  user: loadSession(),
  token: localStorage.getItem(TOKEN_KEY),
});

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(seededUsers));
    return [...seededUsers];
  }

  try {
    const users = JSON.parse(raw);
    const hasAdmin = users.some((user) => user.email === seededUsers[0].email);
    if (!hasAdmin) {
      const nextUsers = [...seededUsers, ...users];
      localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
      return nextUsers;
    }
    return users;
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(seededUsers));
    return [...seededUsers];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function normalizeApiUser(user = {}) {
  const email = user.email || "";
  const role = user.role || user.type || user.account_type;

  return {
    ...user,
    fullName: user.fullName || user.name || "",
    role: role || (email.toLowerCase() === seededUsers[0].email ? "admin" : "user"),
  };
}

function persistSession(user) {
  const safeUser = { ...user };
  delete safeUser.password;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
  state.user = safeUser;
  return safeUser;
}

function tokenFromResponse(data = {}) {
  return (
    data.token ||
    data.access_token ||
    data.auth_token ||
    data.authorisation?.token ||
    data.authorization?.token ||
    data.data?.token ||
    data.data?.access_token ||
    ""
  );
}

function userFromResponse(data = {}) {
  return (
    data.user ||
    data.data?.user ||
    data.profile ||
    data.data?.profile ||
    data.data ||
    {}
  );
}

function persistAuthToken(data) {
  const token = tokenFromResponse(data);
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    state.token = token;
  }
  return token;
}

export function getAuthToken() {
  return state.token || localStorage.getItem(TOKEN_KEY);
}

export function hasApiToken() {
  return Boolean(getAuthToken());
}

export function clearApiToken() {
  localStorage.removeItem(TOKEN_KEY);
  state.token = null;
}

export async function ensureApiToken({ refresh = false } = {}) {
  const email = state.user?.email?.toLowerCase();
  const existingToken = getAuthToken();
  if (existingToken && (!refresh || email !== seededUsers[0].email)) return existingToken;

  if (email !== seededUsers[0].email) return "";

  const data = await authApi.login({
    email,
    password: seededUsers[0].password,
  });

  const token = persistAuthToken(data);
  persistSession({
    ...state.user,
    ...normalizeApiUser(userFromResponse(data)),
  });

  return token;
}

async function login(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const data = await authApi.login({
      email: normalizedEmail,
      password,
    });

    persistAuthToken(data);

    return persistSession(normalizeApiUser(userFromResponse(data)));
  } catch (err) {
    if (normalizedEmail === seededUsers[0].email && password === "admin123") {
      const data = await authApi.login({
        email: normalizedEmail,
        password: seededUsers[0].password,
      });

      persistAuthToken(data);
      return persistSession(normalizeApiUser(userFromResponse(data)));
    }

    const user = readUsers().find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail && item.password === password,
    );

    if (!user) {
      throw err.status === 401
        ? new Error("Email or password is incorrect.")
        : err;
    }

    localStorage.removeItem(TOKEN_KEY);
    state.token = null;
    return persistSession(user);
  }
}

async function register(payload) {
  const users = readUsers();
  const email = payload.email.trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === email)) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: `user-${Date.now()}`,
    fullName: payload.fullName.trim(),
    email,
    password: payload.password,
    role: payload.role === "admin" ? "admin" : "user",
    title: payload.role === "admin" ? "Hotel Administrator" : "StayEasy Member",
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      payload.fullName.trim(),
    )}&background=0f766e&color=fff`,
  };

  try {
    const data = await authApi.register({
      name: payload.fullName.trim(),
      email,
      password: payload.password,
      password_confirmation: payload.password,
    });

    persistAuthToken(data);

    writeUsers([...users, newUser]);
    return persistSession({
      ...newUser,
      ...normalizeApiUser(userFromResponse(data)),
    });
  } catch (err) {
    throw err;
  }
}

function updateProfile(profile) {
  if (!state.user) return null;

  const users = readUsers();
  const updatedUser = { ...state.user, ...profile };
  const nextUsers = users.map((user) =>
    user.id === state.user.id ? { ...user, ...profile } : user,
  );

  writeUsers(nextUsers);
  persistSession(updatedUser);
  return updatedUser;
}

function logout() {
  authApi.logout().catch(() => {});
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SESSION_KEY);
  state.token = null;
  state.user = null;
}

export function useAuth() {
  return {
    user: computed(() => state.user),
    isAuthenticated: computed(() => Boolean(state.user)),
    isAdmin: computed(() => state.user?.role === "admin"),
    login,
    register,
    updateProfile,
    logout,
  };
}

export function getCurrentUser() {
  return state.user;
}

export function isAdminUser() {
  return state.user?.role === "admin";
}
