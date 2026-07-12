import { getCurrentUser } from "../service/auth.js";
export function guestGuard() { const user = getCurrentUser(); return user ? { name: ["admin", "super_admin"].includes(user.role) ? "dashboard" : "hotels" } : true; }
