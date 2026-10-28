import "./Hero.css";

function Hero() {
  return (
    <div id="home" className="hero">
      <h2>Find Your Perfect Stay</h2>

      {/* Edit this message later in your own words */}
      <p>
        Welcome to Stay Hub, your ultimate destination for finding the perfect
        place to stay. Whether you're looking for a cozy apartment, a luxurious
        hotel, or a charming bed and breakfast, we've got you covered.
      </p>

      <a href="#rooms" className="exploreBtn">
        Explore Rooms
      </a>
    </div>
  );
}

export default Hero;
