import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropertyGallery from '../../components/propertygallery/PropertyGallery';
import PropertyCard from '../../components/propertycard/PropertyCard';
import PropertyService from '../../service/PropertyService';
import SaveListService from '../../service/SaveListService';
import { useAuth } from '../../components/auth/useAuth';
import {
    BedIcon, BathIcon, SquareIcon, CalendarIcon,
    HomeIcon, ShareIcon, HeartIcon, MapPinIcon
} from 'lucide-react';
import './propertydetails.css';

export default function PropertyDetail() {
    const { id } = useParams();
    const { user } = useAuth();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isItemSave, setIsItemSave] = useState(false);

    useEffect(() => {
        const init = async () => {
            await fetchProperty();
            await checkIfSaved();
        };

        init();
    }, []);

    const fetchProperty = async () => {
        try {
            const result = await PropertyService.getProperty(id);
            setProperty(result);
        } catch (err) {
            console.error("Error fetching property:", err);
            setError("Property not found");
        } finally {
            setLoading(false);
        }
    };

    const checkIfSaved = async () => {
        try {
            if (!user || !user.uid) {
                console.warn("User not logged in — skipping save check.");
                return;
            }

            const isSaved = await SaveListService.isSave(user.uid, id);
            setIsItemSave(isSaved);
        } catch (err) {
            console.error("Error checking save status:", err);
        }
    };

    const handleSaveToggle = async () => {
        if (!user || !user.uid) {
            alert("Please log in to save properties.");
            return;
        }

        try {
            if (isItemSave) {
                const confirmRemove = window.confirm("Are you sure you want to remove this property from your saved list?");
                if (!confirmRemove) return;

                await SaveListService.removeItem(user.uid, id);
                setIsItemSave(false);
            } else {
                await SaveListService.saveItem(user.uid, id);
                setIsItemSave(true);
            }
        } catch (err) {
            console.error("Error toggling save state:", err);
            alert("Something went wrong while saving the property.");
        }
    };

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
                    <button onClick={handleSaveToggle}>
                        <HeartIcon
                            color={isItemSave ? "red" : "black"}
                            fill={isItemSave ? "red" : "none"}
                            strokeWidth={1.5}
                            style={{ marginRight: "4px" }}
                        />
                        {isItemSave ? "Saved" : "Save"}
                    </button>
                </div>
            </header>

            <PropertyGallery images={property.images || [
                '/property/img1.jpg',
                '/property/img2.jpg',
                '/property/img3.jpg',
                '/property/img4.jpg',
                '/property/img5.jpg'
            ]

            } />

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
