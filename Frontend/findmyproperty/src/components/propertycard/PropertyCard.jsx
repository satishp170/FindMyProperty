import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import './propertycard.css';

const PropertyCard = ({ property, openLogin }) => {
  const title = property.name || "Untitled";
  const address = property.address
    ? `${property.address.lineOne}, ${property.address.city}, ${property.address.state}`
    : "No address available";

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate(`/property/${property.id}`);
    } else {
      openLogin();
    }
  };

  return (
    <div className="property-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        src={property.image || "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"}
        alt={title}
      />
      <div className="property-info">
        <h3>{title}</h3>
        <p>{address}</p>
        <small>{property.beds || 3} BHK | {property.area || 1500} sqft</small>
        <strong>${property.price?.toLocaleString() || "N/A"}</strong>
      </div>
    </div>
  );
};

export default PropertyCard;