import rooms from "../data/rooms.js";
import RoomCard from "./RoomCard.jsx";
import "./Rooms.css";
function Rooms({ selectedRoom, setSelectedRoom }) {
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
    </section>
  );
}

export default Rooms;
