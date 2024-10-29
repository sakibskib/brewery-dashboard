import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = 'https://api.openbrewerydb.org/v1/breweries';

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    async function fetchBrewery() {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setBrewery(response.data);
      } catch (error) {
        console.error("Error fetching brewery details:", error);
      }
    }
    fetchBrewery();
  }, [id]);

  if (!brewery) return <p>Loading...</p>;

  return (
    <div className="brewery-detail">
      <h2>{brewery.name}</h2>
      <p>Type: {brewery.brewery_type}</p>
      <p>Location: {brewery.city}, {brewery.state}</p>
      <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
    </div>
  );
};

export default BreweryDetail;
