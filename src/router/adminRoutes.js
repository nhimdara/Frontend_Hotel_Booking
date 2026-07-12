import Overview from "../components/dashboard/Overview.vue";
import Booking from "../components/dashboard/Booking.vue";
import Guests from "../components/dashboard/Guests.vue";
import RoomManagement from "../components/dashboard/Room_Management.vue";
import HotelManagement from "../components/dashboard/Hotel_Management.vue";
import AddRoom from "../components/dashboard/Add_Room.vue";
import AddHotel from "../components/dashboard/Add_Hotel.vue";
import UpdateRoom from "../components/dashboard/Update_Room.vue";
import UpdateHotel from "../components/dashboard/Update_Hotel.vue";
import Setting from "../components/dashboard/Setting.vue";
import AdminManagement from "../components/dashboard/Admin_Management.vue";

export default [
  { path: "", name: "dashboard", component: Overview },
  { path: "bookings", name: "bookings", component: Booking },
  { path: "guests", name: "guests", component: Guests },
  { path: "room-management", name: "rooms", component: RoomManagement },
  { path: "hotel-management", name: "hotel-management", component: HotelManagement },
  { path: "room-management/add", name: "room-add", component: AddRoom },
  { path: "hotels/add", name: "hotel-add", component: AddHotel },
  { path: "hotel-management/:id/edit", name: "hotel-edit", component: UpdateHotel, props: route => ({ hotelId: route.params.id }) },
  { path: "room-management/:id/edit", name: "room-edit", component: UpdateRoom, props: route => ({ roomId: route.params.id }) },
  { path: "settings", name: "settings", component: Setting },
  { path: "administrators", name: "administrators", component: AdminManagement },
];
