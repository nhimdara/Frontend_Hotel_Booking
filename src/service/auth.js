import { reactive, computed } from "vue";

const USERS_KEY = "stayeasy_users";
const SESSION_KEY = "stayeasy_session";

const seededUsers = [
  {
    id: "admin-1",
    fullName: "Alex Rivera",
    email: "admin@stayeasy.com",
    password: "admin123",
    role: "admin",
    title: "General Manager",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
];

const state = reactive({
  user: loadSession(),
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

function persistSession(user) {
  const safeUser = { ...user };
  delete safeUser.password;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
  state.user = safeUser;
  return safeUser;
}

function login(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = readUsers().find(
    (item) =>
      item.email.toLowerCase() === normalizedEmail && item.password === password,
  );

  if (!user) {
    throw new Error("Email or password is incorrect.");
  }

  return persistSession(user);
}

function register(payload) {
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

  writeUsers([...users, newUser]);
  return persistSession(newUser);
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
  localStorage.removeItem(SESSION_KEY);
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
