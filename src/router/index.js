// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import PublicLayout from "../components/layout/PublicLayout.vue";
import DashboardLayout from "../components/layout/DashboardLayout.vue";
import Home_Page from "../components/views/Home_Page.vue";
import Hotel_Card from "../components/views/Hotel_Card.vue";
import Hotel_Detail from "../components/views/Hotel_Detail.vue";
import Confirm_Page from "../components/views/Confirm_Page.vue";
import Process_Page from "../components/views/Process_Page.vue";
import Login_Page from "../components/views/Login_Page.vue";
import Register_Page from "../components/views/Register_Page.vue";
import Contact_Page from "../components/views/Contact_Page.vue";
import Overview from "../components/dashboard/Overview.vue";
import Booking from "../components/dashboard/Booking.vue";
import Guests from "../components/dashboard/Guests.vue";
import Room_Management from "../components/dashboard/Room_Management.vue";
import Hotel_Management from "../components/dashboard/Hotel_Management.vue";
import Add_Room from "../components/dashboard/Add_Room.vue";
import Add_Hotel from "../components/dashboard/Add_Hotel.vue";
import Update_Room from "../components/dashboard/Update_Room.vue";
import Update_Hotel from "../components/dashboard/Update_Hotel.vue";
import Setting from "../components/dashboard/Setting.vue";
import { getCurrentUser, hasApiToken, isAdminUser } from "../service/auth.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: PublicLayout,
      children: [
        {
          path: "",
          name: "home",
          component: Home_Page,
        },
        {
          path: "hotels",
          name: "hotels",
          component: Hotel_Card,
        },
        {
          path: "hotel/:id",
          name: "hotel-detail",
          component: Hotel_Detail,
        },
        {
          path: "confirm",
          name: "confirm",
          component: Confirm_Page,
          meta: { requiresAuth: true },
        },
        {
          path: "process",
          name: "process",
          component: Process_Page,
          meta: { requiresAuth: true },
        },
        {
          path: "login",
          name: "login",
          component: Login_Page,
          meta: { guestOnly: true },
        },
        {
          path: "register",
          name: "register",
          component: Register_Page,
          meta: { guestOnly: true },
        },
        {
          path: "contact",
          name: "contact",
          component: Contact_Page,
        },
      ],
    },
    {
      path: "/dashboard",
      component: DashboardLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: "",
          name: "dashboard",
          component: Overview,
        },
        {
          path: "bookings",
          name: "bookings",
          component: Booking,
        },
        {
          path: "guests",
          name: "guests",
          component: Guests,
        },
        {
          path: "room-management",
          name: "rooms",
          component: Room_Management,
        },
        {
          path: "hotel-management",
          name: "hotel-management",
          component: Hotel_Management,
        },
        {
          path: "room-management/add",
          name: "room-add",
          component: Add_Room,
        },
        {
          path: "hotels/add",
          name: "hotel-add",
          component: Add_Hotel,
        },
        {
          path: "hotel-management/:id/edit",
          name: "hotel-edit",
          component: Update_Hotel,
          props: (route) => ({ hotelId: route.params.id }),
        },
        {
          path: "room-management/:id/edit",
          name: "room-edit",
          component: Update_Room,
          props: (route) => ({ roomId: route.params.id }),
        },
        {
          path: "settings",
          name: "settings",
          component: Setting,
        },
      ],
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
    return user.role === "admin" ? { name: "dashboard" } : { name: "hotels" };
  }

  return true;
});

export default router;
