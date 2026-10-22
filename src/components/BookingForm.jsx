import { useState } from "react";

function BookingForm({ selectedRoom }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  let difference = null;

  if (checkInDate && checkOutDate) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    difference = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

    if (difference <= 0) {
      difference = "Check-out date must be after check-in date.";
    }
  }

  return (
    <>
      <label htmlFor="checkInDate">Check-in Date:</label>
      <input
        type="date"
        id="checkInDate"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
      />
      <p>Check-in: {checkInDate}</p>
      <label htmlFor="checkOutDate">Check-out Date:</label>
      <input
        type="date"
        id="checkOutDate"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
      />
      <p>Check-out: {checkOutDate}</p>

      <p>{difference}</p>

      <p>
        {selectedRoom && typeof difference === "number"
          ? `Price: $${selectedRoom.price * difference}`
          : null}
      </p>
    </>
  );
}

export default BookingForm;
