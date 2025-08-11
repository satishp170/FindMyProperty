import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropertyGallery from '../../components/propertygallery/PropertyGallery';
import PropertyCard from '../../components/propertycard/PropertyCard';
import PropertyService from '../../service/PropertyService';
import {
  BedIcon, BathIcon, SquareIcon, CalendarIcon,
  HomeIcon, ShareIcon, HeartIcon, MapPinIcon
} from 'lucide-react';
import './propertydetails.css';

export default function PropertyDetail() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const result = await PropertyService.getProperty(id);
        setProperty(result);
      } catch (err) {
        setError("Property not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, []); // fetch once on mount

  if (loading) return <p>Loading property...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>No property found.</p>;

  const fullAddress = `${property?.address?.lineOne || ''}, ${property?.address?.lineTwo || ''}, ${property?.address?.city || ''}, ${property?.address?.state || ''} ${property?.address?.zipCode || ''}`;
  // const similar = propertiesData.filter(p => p.id !== property.id).slice(0, 3);
  
  return (
    <main className="property-detail">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/properties">Properties</Link> / <span>{property.name}</span>
      </nav>

      <header className="detail-header">
        <div className="header-title">
          <h1>{property.name}</h1>
          <p><MapPinIcon /> {fullAddress}</p>
        </div>
        <div className="header-actions">
          <button><ShareIcon /> Share</button>
          <button><HeartIcon /> Save</button>
        </div>
      </header>

      <PropertyGallery images={property.images || ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']} />

      <div className="detail-grid">
        <div className="left-col">
          <div className="card overview-card">
            <h2>₹{property.price?.toLocaleString()}</h2>
            <div className="stats">
              <div><BedIcon className="icon" /> {property.beds} Beds</div>
              <div><BathIcon className="icon" /> {property.baths} Baths</div>
              <div><SquareIcon className="icon" /> {property.area} sqft</div>
            </div>
            <div className="meta">
              {property.yearBuilt && (
                <div><CalendarIcon className="icon" /> {property.yearBuilt}</div>
              )}
              {property.category && (
                <div><HomeIcon className="icon" /> {property.category}</div>
              )}
            </div>
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          <div className="card map-card">
            <h3>Location</h3>
            <iframe
              title="property-map"
              width="100%"
              height="240"
              style={{ border: 0, borderRadius: 8 }}
              src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
              loading="lazy"
            />
          </div>
        </div>

        <aside className="right-col">
          <div className="card tour-card">
            <h3>Schedule a Tour</h3>
            <input type="date" />
            <select>
              <option>Select time</option>
            </select>
            <button>Schedule</button>
          </div>
        </aside>
      </div>

      {/* {similar.length > 0 && (
        <section className="similar">
          <h3>Similar Properties</h3>
          <div className="similar-grid">
            {similar.map(p => (
              <Link key={p.id} to={`/property/${p.id}`}>
                <PropertyCard property={p} />
              </Link>
            ))}
          </div>
        </section>
      )} */}

    </main>
  );
}
