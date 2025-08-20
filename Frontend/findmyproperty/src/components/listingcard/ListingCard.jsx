import './listingcard.css';

const ListingCard = ({ property }) => {
  if (!property) return null;

  const { name, location, price, imageUrl } = property;

  return (
    <div className="listing-card">
      <img
        src={imageUrl || "/property/propertyIcon.jpg"}
        alt={name || 'Property Image'}
        className="listing-image"
      />
      <div className="listing-details">
        <h4>{name || 'Untitled Property'}</h4>
        <p className="listing-price">₹{price?.toLocaleString() || 'N/A'}</p>
      </div>
    </div>
  );
};

export default ListingCard;