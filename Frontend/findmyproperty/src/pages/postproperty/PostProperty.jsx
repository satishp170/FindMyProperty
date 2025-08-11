import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyService from '../../service/PropertyService';
import './postproperty.css';

const PostProperty = () => {
  const { sid } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    beds: '',
    area: '',
    price: '',
    discount: '',
    buyable: false,
    rentable: false,
    description: '',
    address: {
      lineOne: '',
      lineTwo: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  // const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const updatedImages = [...images, ...files];

  //   setImages(updatedImages);

  //   files.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviews((prev) => [...prev, reader.result]);
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  // const removeImage = (index) => {
  //   setPreviews(previews.filter((_, i) => i !== index));
  //   setImages(images.filter((_, i) => i !== index));
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!formData.name.trim()) return alert("❗ Property name is required");
    if (!formData.category) return alert("❗ Category is required");
    if (!formData.address.lineOne.trim()) return alert("❗ Address Line 1 is required");
    if (!formData.address.lineTwo.trim()) return alert("❗ Address Line 2 is required");
    if (!formData.address.city.trim()) return alert("❗ City is required");
    if (!formData.address.state.trim()) return alert("❗ State is required");
    if (!formData.address.zipCode.trim()) return alert("❗ Zip Code is required");
    if (!formData.description.trim()) return alert("❗ Description is required");

    const beds = parseInt(formData.beds);
    const area = parseFloat(formData.area);
    const price = parseFloat(formData.price);
    const discount = parseFloat(formData.discount);

    if (isNaN(beds) || beds < 0) return alert("❗ Beds must be a non-negative number");
    if (isNaN(area) || area < 0) return alert("❗ Area must be a non-negative number");
    if (isNaN(price) || price < 0) return alert("❗ Price must be a non-negative number");
    if (isNaN(discount) || discount < 0 || discount > 100) return alert("❗ Discount must be between 0 and 100");

    const payload = {
      name: formData.name,
      sellerId: parseInt(sid),
      category: formData.category.toUpperCase(),
      address: {
        lineOne: formData.address.lineOne,
        lineTwo: formData.address.lineTwo,
        city: formData.address.city,
        state: formData.address.state,
        zipCode: formData.address.zipCode
      },
      beds,
      area,
      price,
      discount,
      description: formData.description,
      buyable: formData.buyable,
      rentable: formData.rentable
    };

    console.log(payload.address.zipCode)

    try {
      const result = await PropertyService.postProperty(payload);
      console.log("Posted successfully:", result);
      alert("✅ Property posted successfully!");
      // Optionally reset form here
    } catch (err) {
      console.error("Failed to post:", err);
      alert(`❌ Failed to post property: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <section className="add-property-section">
      <div className="add-property-container">
        <h2>Add New Property</h2>
        <form className="property-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input name="name" placeholder="Property Name" value={formData.name} onChange={handleChange} required />
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
              <option value="one_bhk">1 BHK</option>
              <option value="two_bhk">2 BHK</option>
              <option value="three_bhk">3 BHK</option>
              <option value="four_bhk">4 BHK</option>
              <option value="warehouse">Warehouse</option>
            </select>
            <input name="beds" type="number" placeholder="Bedrooms" value={formData.beds} onChange={handleChange} />
            <input name="area" type="number" placeholder="Area (sq.ft)" value={formData.area} onChange={handleChange} />
            <input name="price" type="number" placeholder="Price (INR)" value={formData.price} onChange={handleChange} required />
            <input name="discount" type="number" placeholder="Discount (%)" value={formData.discount} onChange={handleChange} />
            <label>
              <input type="checkbox" name="buyable" checked={formData.buyable} onChange={handleChange} />
              Buyable
            </label>
            <label>
              <input type="checkbox" name="rentable" checked={formData.rentable} onChange={handleChange} />
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
            <input name="lineOne" placeholder="Address Line 1" value={formData.address.lineOne} onChange={handleChange} required />
            <input name="lineTwo" placeholder="Address Line 2" value={formData.address.lineTwo} onChange={handleChange} />
            <input name="city" placeholder="City" value={formData.address.city} onChange={handleChange} required />
            <input name="state" placeholder="State" value={formData.address.state} onChange={handleChange} required />
            <input name="zipCode" placeholder="Zip Code" value={formData.address.zipCode} onChange={handleChange} required />
          </div>

          {/* <label className="file-label">Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} /> */}

          {/* {previews.length > 0 && (
            <div className="image-grid">
              {previews.map((img, i) => (
                <div key={i} className="img-box">
                  <img src={img} alt={`preview-${i}`} />
                  <button type="button" onClick={() => removeImage(i)}>✖</button>
                </div>
              ))}
            </div>
          )} */}

          <button className="submit-btn" type="submit">Submit Property</button>
        </form>
      </div>
    </section>
  );
};

export default PostProperty;