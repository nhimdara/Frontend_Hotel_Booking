const Overview = () => import("../components/dashboard/Overview.vue");
const Booking = () => import("../components/dashboard/Booking.vue");
const Guests = () => import("../components/dashboard/Guests.vue");
const RoomManagement = () => import("../components/dashboard/Room_Management.vue");
const HotelManagement = () => import("../components/dashboard/Hotel_Management.vue");
const AddRoom = () => import("../components/dashboard/Add_Room.vue");
const AddHotel = () => import("../components/dashboard/Add_Hotel.vue");
const UpdateRoom = () => import("../components/dashboard/Update_Room.vue");
const UpdateHotel = () => import("../components/dashboard/Update_Hotel.vue");
const Setting = () => import("../components/dashboard/Setting.vue");
const AdminManagement = () => import("../components/dashboard/Admin_Management.vue");

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
