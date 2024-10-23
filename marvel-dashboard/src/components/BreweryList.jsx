import React from 'react';

const BreweryList = ({ data }) => {
  return (
    <div className="brewery-list">
      <h2>Breweries</h2>
      <ul>
        {data.map((brewery) => (
          <li key={brewery.id}>
            <strong>{brewery.name}</strong> - {brewery.city}, {brewery.state}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreweryList;
