import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropertyService from '../../service/PropertyService';
import { Property } from '../../models/Property';
import { useAuth } from '../../components/auth/useAuth';
import './editproperty.css';

let propertyInstance = null;

const EditProperty = () => {
    const { user, loading: authLoading } = useAuth();
    const { pid } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            if (authLoading) return; // ⏳ wait for auth to load

            try {
                propertyInstance = await PropertyService.getProperty(pid);

                if (propertyInstance.sellerId !== user?.uid) {
                    alert("❌ You are not authorized to edit this property.");
                    return navigate(`/property/${pid}`);
                }
                setFormData(propertyInstance.toFormData());
            } catch (err) {
                console.error("Error fetching property:", err);
                alert("❌ Property not found");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [authLoading]);

    const handleChange = ({ target }) => {
        const { name, value, type, checked } = target;

        if (!formData) return;

        if (name in formData.address) {
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData) return;

        const requiredFields = [
            'name', 'category', 'description',
            'lineOne', 'lineTwo', 'city', 'state', 'zipCode'
        ];
        for (const field of requiredFields) {
            const value = field in formData.address ? formData.address[field] : formData[field];
            if (!value?.trim()) return alert(`❗ ${field} is required`);
        }

        const beds = parseInt(formData.beds);
        const area = parseFloat(formData.area);
        const price = parseFloat(formData.price);
        const discount = parseFloat(formData.discount);

        if (isNaN(beds) || beds < 0) return alert("❗ Beds must be a non-negative number");
        if (isNaN(area) || area < 0) return alert("❗ Area must be a non-negative number");
        if (isNaN(price) || price < 0) return alert("❗ Price must be a non-negative number");
        if (isNaN(discount) || discount < 0 || discount > 100) return alert("❗ Discount must be between 0 and 100");

        propertyInstance.name = formData.name;
        propertyInstance.category = formData.category;
        propertyInstance.beds = beds;
        propertyInstance.area = area;
        propertyInstance.price = price;
        propertyInstance.discount = discount;
        propertyInstance.description = formData.description;
        propertyInstance.buyable = formData.buyable;
        propertyInstance.rentable = formData.rentable;
        propertyInstance.address.lineOne = formData.address.lineOne;
        propertyInstance.address.lineTwo = formData.address.lineTwo;
        propertyInstance.address.city = formData.address.city;
        propertyInstance.address.state = formData.address.state;
        propertyInstance.address.zipCode = formData.address.zipCode;

        try {
            const result = await PropertyService.editProperty(pid, propertyInstance.toPayload());
            console.log("Edited successfully:", result);
            alert("✅ Property updated successfully!");
            navigate(`/property/${pid}`);
        } catch (err) {
            console.error("Failed to update:", err);
            alert(`❌ Failed to update property: ${err.response?.data?.message || err.message}`);
        }
    };

    if (loading || !formData) return <div className="loading">Loading property...</div>;

    return (
        <section className="add-property-section">
            <div className="add-property-container">
                <h2>Edit Property</h2>
                <form className="property-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <input
                            name="name"
                            placeholder="Property Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select Category --</option>
                            <option value="villa">Villa</option>
                            <option value="plot">Plot</option>
                            <option value="one_bhk">1 BHK</option>
                            <option value="two_bhk">2 BHK</option>
                            <option value="three_bhk">3 BHK</option>
                            <option value="four_bhk">4 BHK</option>
                            <option value="warehouse">Warehouse</option>
                        </select>
                        <input
                            name="beds"
                            type="number"
                            placeholder="Bedrooms"
                            value={formData.beds}
                            onChange={handleChange}
                        />
                        <input
                            name="area"
                            type="number"
                            placeholder="Area (sq.ft)"
                            value={formData.area}
                            onChange={handleChange}
                        />
                        <input
                            name="price"
                            type="number"
                            placeholder="Price (INR)"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="discount"
                            type="number"
                            placeholder="Discount (%)"
                            value={formData.discount}
                            onChange={handleChange}
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="buyable"
                                checked={formData.buyable}
                                onChange={handleChange}
                            />
                            Buyable
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="rentable"
                                checked={formData.rentable}
                                onChange={handleChange}
                            />
                            Rentable
                        </label>
                    </div>

                    <textarea
                        name="description"
                        placeholder="Property Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />

                    <h3>Address Details</h3>
                    <div className="form-grid">
                        <input
                            name="lineOne"
                            placeholder="Address Line 1"
                            value={formData.address.lineOne}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="lineTwo"
                            placeholder="Address Line 2"
                            value={formData.address.lineTwo}
                            onChange={handleChange}
                        />
                        <input
                            name="city"
                            placeholder="City"
                            value={formData.address.city}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="state"
                            placeholder="State"
                            value={formData.address.state}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="zipCode"
                            placeholder="Zip Code"
                            value={formData.address.zipCode}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="submit-btn" type="submit">Update Property</button>
                </form>
            </div>
        </section>
    );
};

export default EditProperty;