function RoomCard({ room, onSelect, selectedRoom }) {
  return (
    <div className="room-card">
      <h3>{room.name}</h3>
      <p>${room.price} / night</p>
      <button
        onClick={() => {
          onSelect(room);
        }}
      >
        {room.id === selectedRoom?.id ? "Selected" : "Select Room"}
      </button>
    </div>
  );
}

export default RoomCard;
