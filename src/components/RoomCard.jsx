import "./RoomCard.css";

function RoomCard({ room, onSelect, selectedRoom }) {
  return (
    <div
      className={`room-card ${room.id === selectedRoom?.id ? "selected" : ""}`}
    >
      <img src={room.image} alt={room.name} className="room-image" />

      <div className="room-info">
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <p>Up to {room.capacity} guests</p>

        <p className="room-price">${room.price} / night</p>
        <button
          onClick={() => {
            onSelect(room);
          }}
        >
          {room.id === selectedRoom?.id ? "Selected" : "Select Room"}
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
