import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyCard from '../../components/propertycard/PropertyCard';
import './categorypage.css';
import PropertyService from '../../service/PropertyService'; // ✅ no destructuring

const CategoryPage = () => {
    const { type } = useParams();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const result = await PropertyService.getPropertiesByCategory(type.toUpperCase());
                setProperties(result);
            } catch (err) {
                console.error("Error fetching category properties:", err);
                setError("Failed to load properties.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [type]);

    return (
        <div className="category-page">
            <h2 className="category-header">
                {type.charAt(0).toUpperCase() + type.slice(1)} Properties
            </h2>

            {loading ? (
                <p className="loading">Loading properties...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : properties.length === 0 ? (
                <p className="no-result">No properties found in this category.</p>
            ) : (
                <div className="property-grid">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;