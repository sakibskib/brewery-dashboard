import React from 'react';
import { Link } from 'react-router-dom';

const BreweryList = ({ data }) => {
  return (
    <div className="brewery-list">
      <h2>Breweries</h2>
      <ul>
        {data.map((brewery) => (
          <li key={brewery.id}>
            <Link to={`/brewery/${brewery.id}`}>
              <strong>{brewery.name}</strong> - {brewery.city}, {brewery.state}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreweryList;
