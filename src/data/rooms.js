import deluxeKing from "../assets/hotel-king-room.jpg";
import twoQueens from "../assets/hotel-queens-room.jpg";
import twoFull from "../assets/hotel-fulls-room.jpg";

const rooms = [
  {
    id: 1,
    name: "Deluxe King Room",
    price: 189,
    capacity: 2,
    description: "Spacious room with ocean views",
    image: deluxeKing,
  },

  {
    id: 2,
    name: "2 Queens Room",
    price: 169,
    capacity: 4,
    description: "Spacious room with ocean views",
    image: twoQueens,
  },

  {
    id: 3,
    name: "2 Full beds Room",
    price: 129,
    capacity: 2,
    description: "Spacious room with ocean views",
    image: twoFull,
  },
];

export default rooms;
