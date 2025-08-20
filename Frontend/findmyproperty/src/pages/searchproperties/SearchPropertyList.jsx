import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import PropertyCard from '../../components/propertycard/PropertyCard';
import propertyData from '../../data/Property';
import './searchpropertylist.css';
import axios from 'axios';
import PropertyService from '../../service/PropertyService';

const SearchPropertyList = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);

    const loc = params.get('loc');
    const type = params.get('type')?.toUpperCase();
    const mxp = params.get('mxp');
    const mxar = params.get('mxar');

    console.log("sss" + loc + type + mxp + mxar)

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    //   if (loading) return <p>Loading properties...</p>;
    //   if (error) return <p>{error}</p>

    useEffect(() => {
        fetchdata();
    }, [])

    const fetchdata = async () => {
        try {
            setLoading(true);
            const data = await PropertyService.getSearchProperties(loc, type, mxp, mxar);
            setProperties(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch search properties:", err);
            setError("Failed to load properties. Please try again later.");
            setLoading(false);
        }
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

export default SearchPropertyList;
