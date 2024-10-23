import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Custom styles
import BreweryList from './components/BreweryList';
import SummaryStats from './components/SummaryStats';
import SearchFilter from './components/SearchFilter';

const API_URL = 'https://api.openbrewerydb.org/v1/breweries';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomBrewery, setRandomBrewery] = useState(null);
  const [filters, setFilters] = useState({ type: '', state: '' });

  useEffect(() => {
    async function fetchBreweries() {
      try {
        const response = await axios.get(`${API_URL}?per_page=50`);
        console.log(response.data);  // Debugging: Check API response
        setBreweries(response.data);
        setFilteredBreweries(response.data);
      } catch (error) {
        console.error("Error fetching breweries:", error);
      }
    }
    fetchBreweries();
  }, []);

  const fetchRandomBrewery = async () => {
    try {
      const response = await axios.get(`${API_URL}/random`);
      setRandomBrewery(response.data[0]); // Random brewery is returned in an array
    } catch (error) {
      console.error("Error fetching random brewery:", error);
    }
  };

  useEffect(() => {
    if (breweries.length > 0) {
      const filtered = breweries.filter((brewery) => {
        // Search by name, city, or state
        const matchesSearch = brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              brewery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              brewery.state.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by brewery type
        const matchesType = filters.type ? brewery.brewery_type === filters.type : true;

        // Filter by state
        const matchesState = filters.state ? brewery.state === filters.state : true;

        return matchesSearch && matchesType && matchesState;
      });
      setFilteredBreweries(filtered);
    }
  }, [searchTerm, breweries, filters]);

  return (
    <div className="container">
      <h1>Brewery Dashboard</h1>
      <SearchFilter 
      className="search-filter"
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

export default App;
