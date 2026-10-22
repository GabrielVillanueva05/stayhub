import rooms from "../data/rooms.js";
import RoomCard from "./RoomCard.jsx";
import { useState } from "react";

function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <section className="rooms">
      <h2>Available Rooms</h2>

      {rooms.map((room) => {
        return (
          <RoomCard
            room={room}
            onSelect={setSelectedRoom}
            selectedRoom={selectedRoom}
            key={room.id}
          />
        );
      })}

      <h2>Selected Room: {selectedRoom ? selectedRoom.name : "None"}</h2>
    </section>
  );
}

export default Rooms;
