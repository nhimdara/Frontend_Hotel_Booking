import { createRouter, createWebHistory } from "vue-router";
import Home_Page from "../components/views/Home_Page.vue";
import Hotel_Card from "../components/views/Hotel_Card.vue";
import Hotel_Detail from "../components/views/Hotel_Detail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home_Page,
  },
  {
    path: "/hotels",
    name: "Hotels",
    component: Hotel_Card,
  },
  {
    path: "/hotel",
    name: "HotelDetail",
    component: Hotel_Detail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
