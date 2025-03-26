import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slider, TextField, Snackbar } from '@mui/material';
import GenresTag from "./smallcomponents/genreTag";

const YouTubeEmbed = () => {
    const [videoLink, setVideoLink] = useState(null);
    const [PresentMovie, setPresentMovie] = useState(null);
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [message, setMessage] = useState("");
    const [openRatingReview, setOpenRatingReview] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const storedLink = sessionStorage.getItem("videoLink");
        const movieObject = sessionStorage.getItem("thisMovie");

        if (storedLink) setVideoLink(storedLink);
        if (movieObject) 
        {
            try 
            {
                setPresentMovie(JSON.parse(movieObject));
            } catch (error) 
            {
                console.error("Error parsing movie object from session storage", error);
            }
        }
    }, []);

    const getVideoId = (url) => 
    {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const handleAddToWatchlist = async () => 
    {
        const user = localStorage.getItem("user") || "No name";
        const user_id = JSON.parse(user).user_id;
        const movie_id = PresentMovie.movie_id;

        try {
            const response = await fetch("http://localhost:3000/watchlist/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ user_id, movie_id }),
            });

            const data = await response.json();
            setOpenSnackbar(true);
            setMessage(response.ok ? `Movie ${PresentMovie.title} added to watchlist!` : "Movie is not added to watchlist!");
        } catch (error) {
            console.error("Error adding movie to watchlist:", error);
        }
    };

    const handleSubmitRatingReview = () => {
        setMessage(`You rated ${rating}/10! Review: "${review}"`);
        setOpenSnackbar(true);
        setOpenRatingReview(false);
        setReview(""); // Reset review after submission
    };

    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const videoId = videoLink ? getVideoId(videoLink) : null;
    
    if (!videoId) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                <p className="text-2xl font-semibold">Invalid YouTube link or access denied.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <iframe
                    width="100%"
                    height="450"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    className="rounded-t-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>

                <div className="p-4">
                    <p className="text-gray-400">
                        {expanded ? `The Movie Name is ${PresentMovie.title}. Released in ${PresentMovie?.release_year}, runs for ${PresentMovie?.duration} minutes, rated ${PresentMovie?.rating} on IMDB. Language is ${PresentMovie?.language}.` : "This is a short description..."}
                        <span className="text-blue-400 cursor-pointer ml-2" onClick={() => setExpanded(!expanded)}>
                            {expanded ? "Show less" : "Read more"}
                        </span>
                    </p>
                    {expanded && PresentMovie?.genreArray && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {PresentMovie.genreArray.map((genre, index) => (
                                <GenresTag key={index} genreIndex={index} genreName={genre} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 flex gap-3 justify-center">
                    <Button variant="contained" className="bg-indigo-600 hover:bg-indigo-500 text-white" onClick={handleAddToWatchlist}>
                        + Watchlist
                    </Button>
                    <Button variant="contained" className="bg-yellow-500 hover:bg-yellow-400 text-white" onClick={() => setOpenRatingReview(true)}>
                        ⭐ Rate & Review
                    </Button>
                </div>
            </div>

            {/* Rating & Review Dialog */}
            <Dialog open={openRatingReview} onClose={() => setOpenRatingReview(false)} className="backdrop-blur-md">
                <DialogTitle className="text-gray-900 font-bold text-lg">⭐ Rate & Review</DialogTitle>
                <DialogContent>
                    {/* Rating Slider */}
                    <Slider 
                        value={rating} 
                        onChange={(e, newValue) => setRating(newValue)} 
                        min={0} 
                        max={10} 
                        step={1} 
                        marks 
                        valueLabelDisplay="auto" 
                        className="w-full text-indigo-600"
                    />

                    {/* Review Text Field */}
                    <TextField 
    label="Write a Review (Max 10 words)" 
    variant="outlined" 
    fullWidth 
    multiline 
    rows={3} 
    value={review} 
    onChange={(e) => {
        const words = e.target.value.trim().split(/\s+/);
        if (words.length <= 10) setReview(e.target.value);
    }} 
    sx={{
        backgroundColor: "#f7f7f7",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
            color: "#333", 
            "& fieldset": { borderColor: "#ddd" }, 
            "&:hover fieldset": { borderColor: "#ccc" }, 
            "&.Mui-focused fieldset": { borderColor: "#aaa" } 
        },
        "& .MuiInputLabel-root": {
            color: "#666",
            "&.Mui-focused": { color: "#333" } 
        },
        "& .MuiInputBase-input": {
            padding: "10px", 
            borderRadius: "8px", 
        },
        "& .MuiInputBase-input::placeholder": {
            color: "#999", 
            opacity: 1,
        }
    }}
/>


                </DialogContent>
                
                <DialogActions>
                    <Button onClick={() => setOpenRatingReview(false)} className="text-gray-500">Cancel</Button>
                    <Button 
                        onClick={handleSubmitRatingReview} 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                        ✅ Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Messages */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} message={message} />
        </div>
    );
};

export default YouTubeEmbed;
