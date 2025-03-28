import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import MovieCard from "./moviecard";
import './genre.css'; // Import custom CSS file

const GenreFilter = () => {
    const navigate = useNavigate();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    const genres = ["Action", "Comedy", "Drama", "Horror", "Science-fiction", "Thriller", "Romance", "Fantasy"];

    const handleTagClick = (genre) => {
        setSelectedGenres((prev = []) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    const fetchFilteredData = useCallback(
        debounce(async (genres) => {
            try {
                const response = await fetch("http://localhost:3000/movieaccess/getmoviesbygenres", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ genreList: genres }),
                });

                const data = await response.json();

                if (data.success) {
                    setAllMovies(data.movies);
                } else {
                    setAllMovies([]);
                }
            } catch (error) {
                setAllMovies([]);
            }
        }, 1000),
        []
    );

    useEffect(() => {
        fetchFilteredData(selectedGenres);
    }, [selectedGenres]);

    return (
        <motion.div className="genre-filter-container">
            <motion.button
                onClick={() => navigate(-1)}
                className="back-button"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
            </motion.button>

            <motion.div className="genre-tags">
                {genres.map((genre) => (
                    <motion.span
                        key={genre}
                        className={`genre-tag ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                        onClick={() => handleTagClick(genre)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        #{genre}
                    </motion.span>
                ))}
            </motion.div>

            {allMovies.length > 0 ? (
                <motion.div className="movie-grid">
                    {allMovies.map((movie) => (
                        <motion.div
                            key={movie.movie_id}
                            className="movie-card-wrapper"
                            whileHover={{ scale: 1.05 }}
                        >
                            <MovieCard link={movie.source_link} movieInfo={movie} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.p className="no-movies-message">
                    No movies available for the selected genres.
                </motion.p>
            )}
        </motion.div>
    );
};

export default GenreFilter;
