import './property.css';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../propertycard/PropertyCard';
import properties from '../../data/Property';

const Property = ({ openLogin }) => {
  const featured = properties.slice(0, 6);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewAll = () => {
    if (user) {
      navigate("/properties");
    } else {
      openLogin();
    }
  };

  return (
    <section className="property-section">
      <h2 className="section-title">Featured Properties</h2>
      <div className="property-grid">
        {featured.map((property) => (
          <PropertyCard key={property.id} property={property} openLogin={openLogin} />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn" onClick={handleViewAll}>View All Properties</button>
      </div>
    </section>
  );
};

export default Property;