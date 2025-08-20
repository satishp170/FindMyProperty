import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropertyCard from '../../components/propertycard/PropertyCard';
import './usersavelist.css';

const UserSaveList = () => {
    const location = useLocation();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const liked = location.state?.liked || [];
        setProperties(liked);
        setLoading(false);
    }, [location.state]);

    if (loading) return <p>Loading saved properties...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="property-list-page">
            <h2 className="page-title">Your Save List</h2>
            <div className="property-grid">
                {properties.length > 0 ? (
                    properties.map(p => (
                        <Link key={p.id} to={`/property/${p.id}`}>
                            <PropertyCard property={p} />
                        </Link>
                    ))
                ) : (
                    <p>No saved properties found.</p>
                )}
            </div>
        </div>
    ); 
};

export default UserSaveList;