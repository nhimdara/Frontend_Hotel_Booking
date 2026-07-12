import { getCurrentUser } from "../service/auth.js";
export function authGuard(to) { return getCurrentUser() ? true : { name: "login", query: { redirect: to.fullPath } }; }
