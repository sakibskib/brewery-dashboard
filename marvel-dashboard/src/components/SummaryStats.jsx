import React from 'react';

const SummaryStats = ({ data }) => {
  const totalBreweries = data.length;

  // Find the state with the most breweries (optional logic)
  const stateCounts = data.reduce((acc, brewery) => {
    acc[brewery.state] = (acc[brewery.state] || 0) + 1;
    return acc;
  }, {});

  const stateWithMostBreweries = Object.keys(stateCounts).reduce((a, b) =>
    stateCounts[a] > stateCounts[b] ? a : b
  );

  return (
    <div className="summary-stats">
      <h2>Summary Statistics</h2>
      <p>Total Breweries: {totalBreweries}</p>
      <p>State with Most Breweries: {stateWithMostBreweries}</p>
    </div>
  );
};

export default SummaryStats;
