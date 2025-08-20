import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import './sellerpropertycard.css';

const SellerPropertyCard = ({ property, openLogin, onEdit, onDelete }) => {
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

    const handleEdit = (e) => {
        e.stopPropagation();
        if (user) {
            navigate(`/property/edit/${property.id}`);
        } else {
            openLogin();
        }
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete?.(property);
    };



    return (
        <div className="property-card" onClick={handleClick}>
            <img
                src={property.image || "/property/propertyIcon.jpg"}
                alt={title}
            />
            <div className="property-info">
                <h3>{title}</h3>
                {/* <p>{address}</p> */}
                {/* <small>{property.beds || 3} BHK | {property.area || 1500} sqft</small> */}
                <strong>${property.price?.toLocaleString() || "N/A"}</strong>
            </div>
            <div className="property-actions">
                <button className="edit-btn" onClick={handleEdit}>Edit</button>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default SellerPropertyCard;