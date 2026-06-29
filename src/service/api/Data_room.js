// Mock data for the Room Inventory page.
// Swap this out for a real API/store later — the component only
// expects the same shapes (stats fields + rooms array).

export const stats = {
  totalRooms: { value: 124, badge: "+2% vs last month" },
  occupied: { value: 104, badge: "84% Occupancy" },
  maintenance: { value: 6, badge: "Requires Attention" },
  available: { value: 14, badge: "Ready to Book" },
};

export const rooms = [
  { id: "r101", roomNumber: "101", roomType: "Deluxe King", floor: "Floor 1", status: "Available" },
  { id: "r102", roomNumber: "102", roomType: "Double Queen", floor: "Floor 1", status: "Occupied" },
  { id: "r204", roomNumber: "204", roomType: "Penthouse Suite", floor: "Floor 2", status: "Cleaning" },
  { id: "r208", roomNumber: "208", roomType: "Standard King", floor: "Floor 2", status: "Maintenance" },
  { id: "r301", roomNumber: "301", roomType: "Deluxe King", floor: "Floor 3", status: "Available" },
  { id: "r305", roomNumber: "305", roomType: "Standard King", floor: "Floor 3", status: "Occupied" },
  { id: "r306", roomNumber: "306", roomType: "Double Queen", floor: "Floor 3", status: "Available" },
  { id: "r402", roomNumber: "402", roomType: "Deluxe King", floor: "Floor 4", status: "Occupied" },
  { id: "r407", roomNumber: "407", roomType: "Penthouse Suite", floor: "Floor 4", status: "Cleaning" },
  { id: "r410", roomNumber: "410", roomType: "Standard King", floor: "Floor 4", status: "Available" },
  { id: "r501", roomNumber: "501", roomType: "Double Queen", floor: "Floor 5", status: "Maintenance" },
  { id: "r505", roomNumber: "505", roomType: "Deluxe King", floor: "Floor 5", status: "Occupied" },
  { id: "r512", roomNumber: "512", roomType: "Penthouse Suite", floor: "Floor 5", status: "Available" },
  { id: "r601", roomNumber: "601", roomType: "Standard King", floor: "Floor 6", status: "Occupied" },
  { id: "r604", roomNumber: "604", roomType: "Double Queen", floor: "Floor 6", status: "Cleaning" },
];