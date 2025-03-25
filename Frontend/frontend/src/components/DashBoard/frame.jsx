import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slider, TextField, Snackbar } from '@mui/material';

const YouTubeEmbed = () => {
    const [videoLink, setVideoLink] = useState(null);
    const [PresentMovie, setPresentMovie] = useState(null);
    
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [message, setMessage] = useState(""); 
    
    const [openRating, setOpenRating] = useState(false);
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
            } 
            catch (error) 
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


        /******************************************************************************************************* */
    const handleAddToWatchlist = async () => {
        const user = localStorage.getItem("user") || "No name"
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

            // console.log(data);
            setOpenSnackbar(true);

            if(response.ok)
            {
                setMessage(`Movie ${PresentMovie.title} added to watchlist!`);

            }
            else
            {
                console.log("from backend: ",data.message)
                setMessage(`Movie is not added to watchList!`);
            }
    
        } 
        catch (error) 
        {
            console.error("Error adding movie to watchlist:", error);
        }
    };
    

    const handleSubmitRating = () => 
    {
        setMessage(`You rated this movie ${rating}/10!`);
        setOpenSnackbar(true);
        setOpenRating(false);
    };

    const handleSubmitReview = () => 
    {
        setMessage("Review submitted successfully!");
        setOpenSnackbar(true);
        setReview("");
    };
    /****************************************************************************** */
    const handleCloseSnackbar = () => 
    {
        setOpenSnackbar(false);
    };

    const videoId = videoLink ? getVideoId(videoLink) : null;
    if (!videoId) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                <p className="text-2xl font-semibold">Invalid YouTube link or access denied.</p>
            </div>
        );
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            {/* Movie Player Card */}
            <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <iframe
                    width="100%"
                    height="450"
                    src={embedUrl}
                    title="YouTube video player"
                    className="rounded-t-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>

                {/* Expandable Description */}
                <div className="p-4">
                    <p className="text-gray-400">
                        {expanded
                            ? `The Movie Name is ${PresentMovie.title} This Movie is released in the year ${PresentMovie?.release_year}, and runs for ${PresentMovie?.duration} Minutes, and is rated ${PresentMovie?.rating} on IMDB`
                            : "This is a short description..."}
                        <span
                            className="text-blue-400 cursor-pointer ml-2"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? "Show less" : "Read more"}
                        </span>
                    </p>
                </div>

                {/* Buttons */}
                <div className="p-6 flex gap-3 justify-center space-x-4">
                    <Button
                        variant="contained"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md"
                        onClick={handleAddToWatchlist}
                    >
                        + Watchlist
                    </Button>
                    
                    



                    <Button
                        variant="contained"
                        className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-2 rounded-lg shadow-md"
                        onClick={() => setOpenRating(true)}
                    >
                        ⭐ Rate
                    </Button>
                </div>
            </div>

            {/* Rating Popup */}
            <Dialog open={openRating} onClose={() => setOpenRating(false)}>
                <DialogTitle className="text-gray-900 font-bold text-lg">⭐ Rate the Movie</DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenRating(false)} className="text-gray-500">Cancel</Button>
                    <Button onClick={handleSubmitRating} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">Submit</Button>
                </DialogActions>
            </Dialog>

            {/* Review Box */}
            <div className="mt-6 w-full max-w-2xl">
                <TextField
                    label="Write a short review (Max 10 words)"
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    value={review}
                    onChange={(e) => {
                        const words = e.target.value.split(/\s+/).filter(word => word.length > 0);
                        if (words.length <= 10) {
                            setReview(e.target.value);
                        }
                    }}
                    className="bg-gray-700 text-white rounded-lg"
                    InputLabelProps={{ style: { color: 'white' } }}
                />
                
                <Button
                    onClick={handleSubmitReview}
                    className="mt-4 bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                    Submit Review
                </Button>
            </div>

            {/* Snackbar for success messages */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={message}
            />
        </div>
    );
};

export default YouTubeEmbed;