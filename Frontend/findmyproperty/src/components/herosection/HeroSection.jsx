import './herosection.css';
import heroImage from '../../assets/hero.jpg';
import SearchBar from '../searchbar/SearchBar';

const HeroSection = ({ openLogin }) => {
  return (
    <header
      className="parallax-hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Find Your Dream Home</h1>
          <p>Browse premium properties across India</p>
        </div>

        <SearchBar openLogin={openLogin} />
      </div>
    </header>
  );
};

export default HeroSection;