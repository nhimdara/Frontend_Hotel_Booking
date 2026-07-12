import { isAdminUser } from "../service/auth.js";
export function adminGuard() { return isAdminUser() ? true : { name: "hotels" }; }
