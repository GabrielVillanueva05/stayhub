import { useState } from "react";
import "./BookingForm.css";

function BookingForm({ selectedRoom }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  let difference = null;

  if (checkInDate && checkOutDate) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    difference = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

    if (difference <= 0) {
      difference = "Check-out date must be after check-in date.";
    }
  }

  const handleReservation = async () => {
    if (
      !selectedRoom ||
      !checkInDate ||
      !checkOutDate ||
      typeof difference !== "number" ||
      difference <= 0
    ) {
      alert("Please select a room and valid dates.");
      return;
    }

    const reservation = {
      roomId: selectedRoom.id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: difference,
      totalPrice: selectedRoom.price * difference,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/.netlify/functions/create-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Reservation failed.");
      }

      if (!data.reservation) {
        throw new Error(
          "Backend is connected, but the reservation was not saved yet.",
        );
      }

      alert("Reservation saved successfully!");

      setCheckInDate("");
      setCheckOutDate("");
    } catch (error) {
      console.error("Reservation error:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {selectedRoom && typeof difference === "number" && difference > 0
              ? `Total: $${selectedRoom.price * difference}`
              : "Select a room and valid dates"}
          </p>

          <button onClick={handleReservation} disabled={isSubmitting}>
            {isSubmitting ? "Reserving..." : "Reserve Room"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default BookingForm;
