import React, { useEffect, useState } from 'react';
import MovieCard from "./moviecard" // Assuming you have this component
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Watchlist = () => {
    const [movies, setMovies] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const user = JSON.parse(localStorage.getItem("user")) || {};

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await fetch("http://localhost:3000/watchlist/list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ user_id: user.user_id }),
                });
                const data = await response.json();
                setMovies(data.watchlist);
            } catch (error) {
                console.error("Error fetching watchlist:", error);
            }
        };
        fetchWatchlist();
    }, []);

    const handleRemove = async (movie_id) => {
        try {
            
            await fetch("http://localhost:3000/watchlist/remove", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ user_id: user.user_id, movie_id })
            });

            setMovies(movies.filter(movie => movie.movie_id !== movie_id)); // Remove from UI
            setSnackbarMessage("Movie removed from watchlist!");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error removing movie from watchlist:", error);
        }
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
            
            <div className="overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 p-2 grid grid-cols-3 gap-4">
                {movies.map((movie, index) => (
                    <div key={index} className="relative">
                        <MovieCard movieInfo={movie} link={movie.source_link} />
                        <IconButton className="absolute top-2 right-2 bg-gray-800 text-white rounded-full" onClick={() => handleRemove(movie.movie_id)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
    
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </div>
    );
    
};

export default Watchlist;
