import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import PropertyCard from '../../components/propertycard/PropertyCard';
import propertyData from './../../data/Property';
import './propertylist.css';
import axios from 'axios';
import PropertyService from '../../service/PropertyService';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //   if (loading) return <p>Loading properties...</p>;
  //   if (error) return <p>{error}</p>

  useEffect(() => {
    fetchdata();
  }, [])

  const fetchdata = () => {
    PropertyService.getAllProperties()
      .then((result) => {
        setProperties(result); // ✅ NOT result.data, since the service returns Property instances
        setLoading(false);
      })
      .catch((err) => {
        console.log("error occurred", err);
        setError("Failed to load properties");
        setLoading(false);
      });
  };



  return (
    <div className="property-list-page">
      <h2 className="page-title">All Available Properties</h2>
      <div className="property-grid">
        {properties.map(p => (
          <Link key={p.id} to={`/property/${p.id}`}>
            <PropertyCard property={p} />
          </Link>
        ))}

      </div>
    </div>
  );
};

export default PropertyList;
