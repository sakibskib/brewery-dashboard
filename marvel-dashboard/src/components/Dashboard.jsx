import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import SearchFilter from './SearchFilter';
import SummaryStats from './SummaryStats';
import BreweryList from './BreweryList';

function Dashboard({ 
  searchTerm, 
  setSearchTerm, 
  filters, 
  setFilters, 
  randomBrewery, 
  fetchRandomBrewery, 
  filteredBreweries 
}) {
  // Prepare data for the Bar Chart
  const breweryTypeCounts = filteredBreweries.reduce((acc, brewery) => {
    acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(breweryTypeCounts).map(([type, count]) => ({
    type,
    count,
  }));

  return (
    <div className="container">
      <h1>Brewery Dashboard</h1>
      <SearchFilter 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filters={filters} 
        setFilters={setFilters} 
      />
      <button onClick={fetchRandomBrewery}>Get Random Brewery</button>

      {randomBrewery && (
        <div className="random-brewery">
          <h2>Random Brewery</h2>
          <p>{randomBrewery.name} - {randomBrewery.city}, {randomBrewery.state}</p>
        </div>
      )}

      {/* Brewery Type Distribution Chart */}
      <h3>Brewery Type Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="type" title="Brewery Type" />
          <YAxis title="Count" />
          <Tooltip />
          <Bar dataKey="count" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>

      {filteredBreweries.length > 0 ? (
        <>
          <SummaryStats data={filteredBreweries} />
          <BreweryList data={filteredBreweries} />
        </>
      ) : (
        <p>No breweries available to display.</p>
      )}
    </div>
  );
}

export default Dashboard;
