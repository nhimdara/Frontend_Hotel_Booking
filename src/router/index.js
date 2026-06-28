// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home_Page from "../components/views/Home_Page.vue";
import Hotel_Card from "../components/views/Hotel_Card.vue";
import Hotel_Detail from "../components/views/Hotel_Detail.vue";
import Confirm_Page from "../components/views/Confirm_Page.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home_Page,
    },
    {
      path: "/hotels",
      name: "hotels",
      component: Hotel_Card,
    },
    {
      path: "/hotel/:id",
      name: "hotel-detail",
      component: Hotel_Detail,
    },
    {
      path: "/confirm",
      name: "confirm",
      component: Confirm_Page,
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
