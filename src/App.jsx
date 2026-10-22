import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Rooms from "./components/Rooms";
import BookingForm from "./components/BookingForm";
import { useState } from "react";

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <>
      <Navbar />
      <Hero />
      <Rooms selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
      <BookingForm selectedRoom={selectedRoom} />
    </>
  );
}

export default App;
