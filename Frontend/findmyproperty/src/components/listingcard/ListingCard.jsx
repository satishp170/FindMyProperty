
import './listingcard.css';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  console.log("ss user: ")

  return (
    <div className="listing-card">
      <Link to={`/property/${listing.id}`}>
        <h4>{listing.name}</h4>
      </Link>
    </div>
  );
};

export default ListingCard;
