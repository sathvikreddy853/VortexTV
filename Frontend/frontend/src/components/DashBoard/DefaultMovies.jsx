// Recommendations.jsx
import React, { useState, useEffect } from 'react';
import './CSS/Recommendations.css';
import RecommendationCard from './smallcomponents/recommendationcard';

const fakeMovies = [
  // ... (Your fakeMovies array remains the same)
];

const Recommendations = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading as true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/movieaccess/getrecommendations',
          {
            method: 'GET',
            headers:{
              "content-type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        if (!response.ok) 
        {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setMovies(data.recommendedMovies);
        setLoading(false); // Set loading to false after successful fetch

      } 
      catch (err) {
        setError(err);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchMovies();
  }, []);


  if (loading) {
    return (
      <div className="recommendations-container">
        <div className="loading">Loading recommendations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendations-container">
        <div className="error">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <h2 className="recommendations-title">Recommended Movies</h2>
      <div className="movies-grid">
        {
          movies.length>0 ?movies.map
        (
            (movie) =>  (
            <RecommendationCard key={movie.movie_id} movieInfo={movie} link={movie.source_link} />
          )  
        ):
        (
          <div className="no-movies">No movies found.</div>
        )
      }
      </div>
    </div>
  );
};

export default Recommendations;