import HomeView from "../views/public/HomeView.vue";
import HotelListView from "../views/public/HotelListView.vue";
import HotelDetailView from "../views/public/HotelDetailView.vue";
import ContactView from "../views/public/ContactView.vue";
import AboutView from "../views/public/AboutView.vue";
import FAQView from "../views/public/FAQView.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import CheckoutView from "../views/booking/CheckoutView.vue";
import PaymentView from "../views/booking/PaymentView.vue";

export default [
  { path: "", name: "home", component: HomeView },
  { path: "hotels", name: "hotels", component: HotelListView },
  { path: "hotel/:id", name: "hotel-detail", component: HotelDetailView },
  { path: "confirm", name: "confirm", component: CheckoutView, meta: { requiresAuth: true } },
  { path: "process", name: "process", component: PaymentView, meta: { requiresAuth: true } },
  { path: "login", name: "login", component: LoginView, meta: { guestOnly: true } },
  { path: "register", name: "register", component: RegisterView, meta: { guestOnly: true } },
  { path: "contact", name: "contact", component: ContactView },
  { path: "about", name: "about", component: AboutView },
  { path: "faq", name: "faq", component: FAQView },
];
