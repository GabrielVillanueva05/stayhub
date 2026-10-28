import { useState } from "react";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherCity, setWeatherCity] = useState("");

  const searchCity = async () => {
    if (!city.trim()) {
      setError("Please enter a city.");
      setTemp(null);
      return;
    }

    setError("");
    setTemp(null);
    setLoading(true);
    setWeatherCity("");

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch city");
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setError("City not found");
        return;
      }

      const latitude = data.results[0].latitude;
      const longitude = data.results[0].longitude;

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`,
      );

      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather");
      }

      const weatherData = await weatherResponse.json();

      const weatherTemp = weatherData.current.temperature_2m;

      setTemp(weatherTemp);
      setWeatherCity(data.results[0].name);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="weather">
      <h2>Explore Your Destination</h2>

      <div className="weather-search">
        <input
          type="text"
          placeholder="Enter a city (e.g. Miami)"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button onClick={searchCity} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="weather-result">
        {!loading && !error && (
          <p>
            {temp !== null
              ? `${weatherCity}: ${temp}°F`
              : "Search for a city to see it's temperature"}
          </p>
        )}
        {error && <p className="weather-error">{error}</p>}
        {loading && <p className="weather-loading">Searching...</p>}
      </div>
    </section>
  );
}

export default Weather;
