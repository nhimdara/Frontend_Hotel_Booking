// hotelData.js — Fake data for HotelAdmin Dashboard

export const currentUser = {
  name: 'Alex Rivera',
  role: 'General Manager',
  hotel: 'Grand Plaza Hotel',
  avatar: 'https://i.pravatar.cc/40?img=12',
}

export const stats = {
  occupancy: {
    value: 85,
    label: 'Optimal',
    color: 'teal',
  },
  checkIns: {
    today: 12,
    total: 18,
  },
  revenue: {
    amount: '$4,250',
    change: '+5% from yesterday',
    trend: 'up',
  },
}

export const bookings = [
  {
    id: 1,
    name: 'Julianna Smith',
    roomType: 'Deluxe King',
    roomNumber: 'Room 402',
    checkIn: 'Oct 12',
    checkOut: 'Oct 15',
    status: 'Confirmed',
  },
  {
    id: 2,
    name: 'Marcus Webb',
    roomType: 'Executive Suite',
    roomNumber: 'Room 105',
    checkIn: 'Oct 14',
    checkOut: 'Oct 20',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Eleanor Rigby',
    roomType: 'Twin Studio',
    roomNumber: 'Room 218',
    checkIn: 'Oct 11',
    checkOut: 'Oct 13',
    status: 'Confirmed',
  },
  {
    id: 4,
    name: 'David Nguyen',
    roomType: 'Standard Queen',
    roomNumber: 'Room 310',
    checkIn: 'Oct 15',
    checkOut: 'Oct 17',
    status: 'Confirmed',
  },
  {
    id: 5,
    name: 'Sofia Martínez',
    roomType: 'Penthouse Suite',
    roomNumber: 'Room 801',
    checkIn: 'Oct 16',
    checkOut: 'Oct 22',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Sofia Martínez',
    roomType: 'Penthouse Suite',
    roomNumber: 'Room 801',
    checkIn: 'Oct 16',
    checkOut: 'Oct 22',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Sofia Martínez',
    roomType: 'Penthouse Suite',
    roomNumber: 'Room 801',
    checkIn: 'Oct 16',
    checkOut: 'Oct 22',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Sofia Martínez',
    roomType: 'Penthouse Suite',
    roomNumber: 'Room 801',
    checkIn: 'Oct 16',
    checkOut: 'Oct 22',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Sofia Martínez',
    roomType: 'Penthouse Suite',
    roomNumber: 'Room 801',
    checkIn: 'Oct 16',
    checkOut: 'Oct 22',
    status: 'Pending',
  },
]

export const operations = {
  pendingClean: 8,
  maintenanceIssues: 2,
}

export const roomAvailability = {
  total: 120,
  occupied: 85,
  available: 27,
  cleaning: 8,
  occupancyPercent: 71,
}

