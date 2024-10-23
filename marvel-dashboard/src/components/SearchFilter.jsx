import React from 'react';

const SearchFilter = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  const handleTypeChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: event.target.value,
    }));
  };

  const handleStateChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      state: event.target.value,
    }));
  };

  return (
    <div className="search-filter">
      {/* Text input for name, city, or state search */}
      <input
        type="text"
        placeholder="Search by name, city, or state..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Dropdown for Brewery Type */}
      <select onChange={handleTypeChange}>
        <option value="">All Types</option>
        <option value="micro">Micro</option>
        <option value="regional">Regional</option>
        <option value="brewpub">Brewpub</option>
        <option value="large">Large</option>
      </select>

      {/* Dropdown for State Filter */}
      <select onChange={handleStateChange}>
        <option value="">All States</option>
        <option value="Texas">Texas</option>
        <option value="California">California</option>
        <option value="New York">New York</option>
        <option value="Oregon">Oregon</option>
        <option value="oklahoma">oklahoma</option>

        {/* Add more states as needed */}
      </select>
    </div>
  );
};

export default SearchFilter;
