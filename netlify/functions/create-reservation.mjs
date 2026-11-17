import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// Demo inventory: one bookable room per ID.
const roomPrices = {
  1: 189,
  2: 169,
  3: 129,
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export default async function handler(request) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  try {
    const { roomId, checkIn, checkOut } = await request.json();

    const price = roomPrices[roomId];

    const validDate = (value) =>
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      !Number.isNaN(Date.parse(value)) &&
      new Date(value).toISOString().slice(0, 10) === value;

    if (!price || !validDate(checkIn) || !validDate(checkOut)) {
      return json({ error: "Invalid reservation details." }, 400);
    }

    const nights = (Date.parse(checkOut) - Date.parse(checkIn)) / 86400000;

    const today = new Date().toISOString().slice(0, 10);

    if (checkIn < today || nights <= 0 || nights > 30) {
      return json(
        { error: "Please select valid future dates (up to 30 nights)." },
        400,
      );
    }

    const { data, error } = await supabase
      .from("reservations")
      .insert({
        room_id: Number(roomId),
        check_in: checkIn,
        check_out: checkOut,
        nights,
        total_price: price * nights,
      })
      .select("id, room_id, check_in, check_out, nights, total_price")
      .single();

    if (error) {
      console.error("Supabase error:", error);

      if (error.code === "23P01") {
        return json({ error: "Room is already booked for those dates." }, 409);
      }

      return json({ error: "Could not save reservation." }, 500);
    }

    return json({ reservation: data }, 201);
  } catch (error) {
    console.error("Reservation function error:", error);
    return json({ error: "Unable to process reservation." }, 400);
  }
}
