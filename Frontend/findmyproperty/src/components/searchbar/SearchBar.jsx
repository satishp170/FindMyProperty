import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import './Searchbar.css';

const SearchBar = ({ openLogin }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [filters, setFilters] = useState({
    location: '',
    type: '',
    priceRange: '',
    area: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const validate = () => {
    const newErrors = {};
    if (!filters.location.trim()) newErrors.location = true;
    if (!filters.type.trim()) newErrors.type = true;
    if (!filters.priceRange || Number(filters.priceRange) <= 0) newErrors.priceRange = true;
    if (!filters.area || Number(filters.area) <= 0) newErrors.area = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (!user) {
      openLogin();
      return;
    }

    if (!validate()) return;

    const query = new URLSearchParams({
      loc: filters.location,
      type: filters.type,
      mxp: filters.priceRange,
      mxar: filters.area
    }).toString();

    navigate(`/searchproperties?${query}`);
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <input
          type="text"
          name="location"
          placeholder="Enter location (city)"
          value={filters.location}
          onChange={handleChange}
          className={errors.location ? 'error' : ''}
        />

        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className={errors.type ? 'error' : ''}
        >
          <option value="" disabled>Property type</option>
          <option value="villa">Villa</option>
          <option value="plot">Plot</option>
          <option value="one_bhk">1 BHK</option>
          <option value="two_bhk">2 BHK</option>
          <option value="three_bhk">3 BHK</option>
          <option value="four_bhk">4 BHK</option>
          <option value="warehouse">Warehouse</option>
        </select>

        <input
          type="number"
          name="priceRange"
          placeholder="Price range (max Price)"
          value={filters.priceRange}
          onChange={handleChange}
          className={errors.priceRange ? 'error' : ''}
        />

        <input
          type="number"
          name="area"
          placeholder="Max Area (sqft)"
          value={filters.area}
          onChange={handleChange}
          className={errors.area ? 'error' : ''}
        />

        <button onClick={handleSearch}>Search</button>
      </div>
    </section>
  );
};

export default SearchBar;