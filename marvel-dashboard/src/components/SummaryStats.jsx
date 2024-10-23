import React from 'react';

const SummaryStats = ({ data }) => {
  const totalBreweries = data.length;

  // Find the state with the most breweries
  const stateCounts = data.reduce((acc, brewery) => {
    acc[brewery.state] = (acc[brewery.state] || 0) + 1;
    return acc;
  }, {});

  const stateWithMostBreweries = Object.keys(stateCounts).reduce((a, b) =>
    stateCounts[a] > stateCounts[b] ? a : b
  );

  // Find the most common brewery type
  const typeCounts = data.reduce((acc, brewery) => {
    acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
    return acc;
  }, {});

  const mostCommonBreweryType = Object.keys(typeCounts).reduce((a, b) =>
    typeCounts[a] > typeCounts[b] ? a : b
  );

  return (
    <div className="summary-stats">
      <h2>Summary Statistics</h2>
      <p>Total Breweries: {totalBreweries}</p>
      <p>State with Most Breweries: {stateWithMostBreweries}</p>
      <p>Most Common Brewery Type: {mostCommonBreweryType}</p>
    </div>
  );
};

export default SummaryStats;
