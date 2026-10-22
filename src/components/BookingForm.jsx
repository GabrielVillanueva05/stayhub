import { useState } from "react";
import "./BookingForm.css";

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
    <section className="booking-form">
      <h2>Complete Your Stay</h2>

      <div className="booking-content">
        <div className="booking-dates">
          <label htmlFor="checkInDate">Check-in Date:</label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />

          <label htmlFor="checkOutDate">Check-out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>

        <div className="booking-summary">
          <h3>Booking Summary</h3>

          <p>Room: {selectedRoom ? selectedRoom.name : "None selected"}</p>

          <p>Nights: {typeof difference === "number" ? difference : "-"}</p>

          {typeof difference === "string" && (
            <p className="booking-error">{difference}</p>
          )}

          <p className="booking-total">
            {selectedRoom && typeof difference === "number"
              ? `Total: $${selectedRoom.price * difference}`
              : "Select a room and valid dates"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default BookingForm;
