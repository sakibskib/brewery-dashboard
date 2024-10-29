import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import BreweryDetail from './components/BreweryDetail';

const API_URL = 'https://api.openbrewerydb.org/v1/breweries';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomBrewery, setRandomBrewery] = useState(null);
  const [filters, setFilters] = useState({ type: '', state: '' });

  // Fetch all breweries
  useEffect(() => {
    async function fetchBreweries() {
      try {
        const response = await axios.get(`${API_URL}?per_page=50`);
        setBreweries(response.data);
        setFilteredBreweries(response.data);
      } catch (error) {
        console.error("Error fetching breweries:", error);
      }
    }
    fetchBreweries();
  }, []);

  // Fetch a random brewery
  const fetchRandomBrewery = async () => {
    try {
      const response = await axios.get(`${API_URL}/random`);
      setRandomBrewery(response.data[0]); 
    } catch (error) {
      console.error("Error fetching random brewery:", error);
    }
  };

  // Filter breweries based on search term and filters
  useEffect(() => {
    if (breweries.length > 0) {
      const filtered = breweries.filter((brewery) => {
        const matchesSearch = brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              brewery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              brewery.state.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filters.type ? brewery.brewery_type === filters.type : true;
        const matchesState = filters.state ? brewery.state === filters.state : true;

        return matchesSearch && matchesType && matchesState;
      });
      setFilteredBreweries(filtered);
    }
  }, [searchTerm, breweries, filters]);

  return (
    <Router>
      <Routes>
        {/* Dashboard Route */}
        <Route 
          path="/" 
          element={
            <Dashboard 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              filters={filters} 
              setFilters={setFilters} 
              randomBrewery={randomBrewery} 
              fetchRandomBrewery={fetchRandomBrewery} 
              filteredBreweries={filteredBreweries} 
            />
          } 
        />

        {/* Detail Route for individual brewery */}
        <Route path="/brewery/:id" element={<BreweryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
