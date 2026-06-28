import { createRouter, createWebHistory } from "vue-router";
import Home_Page from "../components/views/Home_Page.vue";
import Hotel_Card from "../components/views/Hotel_Card.vue";

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
  ],
  scrollBehavior() {
    // Always scroll to top when navigating to a new page
    return { top: 0, behavior: "smooth" };
  },
});

export default router;