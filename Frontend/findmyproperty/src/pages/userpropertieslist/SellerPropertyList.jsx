import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SellerPropertyCard from '../../components/propertycard/SellerPropertyCard';
import './sellerpropertylist.css';

const SellerPropertyList = () => {
    const location = useLocation();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const listings = location.state?.listings || [];
        setProperties(listings);
        setLoading(false);
    }, [location.state]);

    if (loading) return <p>Loading saved properties...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="property-list-page">
            <h2 className="page-title">Your Propety List</h2>
            <div className="property-grid">
                {properties.length > 0 ? (
                    properties.map(p => (
                        <SellerPropertyCard key={p.id} property={p} />
                    ))
                ) : (
                    <p>No saved properties found.</p>
                )}
            </div>
        </div>
    ); 
};

export default SellerPropertyList;