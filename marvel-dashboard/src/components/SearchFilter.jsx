import React from 'react';

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search for a brewery..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
