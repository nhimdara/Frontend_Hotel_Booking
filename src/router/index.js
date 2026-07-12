// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import NotFoundView from "../views/errors/NotFoundView.vue";
import publicRoutes from "./publicRoutes.js";
import customerRoutes from "./customerRoutes.js";
import adminRoutes from "./adminRoutes.js";
import { getCurrentUser, hasApiToken, isAdminUser } from "../service/auth.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [...publicRoutes, ...customerRoutes],
    },
    {
      path: "/dashboard",
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: adminRoutes,
    },
    {
      path: "/overview",
      redirect: "/dashboard",
    },
    {
      path: "/bookings",
      redirect: "/dashboard/bookings",
    },
    {
      path: "/guests",
      redirect: "/dashboard/guests",
    },
    {
      path: "/room-management",
      redirect: "/dashboard/room-management",
    },
    {
      path: "/hotel-management",
      redirect: "/dashboard/hotel-management",
    },
    {
      path: "/room-management/add",
      redirect: "/dashboard/room-management/add",
    },
    {
      path: "/hotel-management/:id/edit",
      redirect: (to) => ({
        path: `/dashboard/hotel-management/${to.params.id}/edit`,
      }),
    },
    {
      path: "/room-management/:id/edit",
      redirect: (to) => ({
        path: `/dashboard/room-management/${to.params.id}/edit`,
      }),
    },
    {
      path: "/settings",
      redirect: "/dashboard/settings",
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: MainLayout,
      children: [{ path: "", component: NotFoundView }],
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to) => {
  const user = getCurrentUser();

  if (to.meta.requiresAuth && !user) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }

  if (to.meta.requiresAdmin && !isAdminUser()) {
    return user ? { name: "hotels" } : { name: "login" };
  }

  if (to.meta.guestOnly && user) {
    return ["admin", "super_admin"].includes(user.role) ? { name: "dashboard" } : { name: "hotels" };
  }

  return true;
});

export default router;
