import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slider, TextField, Snackbar, Typography } from '@mui/material';
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
    const [likeStatus, setLikeStatus] = useState(-1); // -1: unknown, 1: neutral, 2: liked, 3: disliked

    const navigate = useNavigate()

    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let userId = user?.user_id;
    let movieId = PresentMovie?.movie_id


    
    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await fetch("/like/fetchlikestatus", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" 
                        , "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ user_id: userId, movie_id: movieId })
                });

                const data = await response.json();
                if (data.likeStatus) 
                {
                    setLikeStatus(data.likeStatus);
                } else 
                {
                    setLikeStatus(1); // Neutral if no record found
                }
            } catch (error) {
                console.error("Error fetching like status:", error);
            }
        };

        fetchLikeStatus();
    }, [userId, movieId]);











    useEffect(() => {
        const storedLink = sessionStorage.getItem("videoLink");
        const movieObject = sessionStorage.getItem("thisMovie");
    
        if (storedLink) setVideoLink(storedLink);
        if (movieObject) {
            try {
                const movieData = JSON.parse(movieObject);
                setPresentMovie(movieData);
            } catch (error) {
                console.error("Error parsing movie object", error);
            }
        }
    }, []);
    
   
        
    const onClickLikeHandler = async () => {
        let newStatus = 1// Toggle between liked and neutral

        if(likeStatus===1)
        {
            newStatus=2
            // here increase like count in popularity
        }
        else if(likeStatus===2)
        {
            newStatus=1
            //here decrease liek count in popularity
        }
        else if(likeStatus===3)
        {
            newStatus=2
            // here increase like count in popularity and decrease dislike count
        }


        try 
        {
            await fetch("/changelikestatus", 
                {
                method: "POST",
                headers: { "Content-Type": "application/json"
                    , "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ user_id: userId, movie_id: movieId, likestatus: newStatus })
            });
            setLikeStatus(newStatus);
        } catch (error) {
            console.error("Error updating like status:", error);
        }
    };

    // Handler for Dislike button
    const onClickDislikeHandler = async () => {
        let newStatus = 1
        // Toggle between disliked and neutral

        if(likeStatus===1)
        {
            newStatus=3
            // here increase dislike count in popularity
        }
        else if(likeStatus===2)
        {
            newStatus=1
            //here decrease like count in popularity
            //here increase like count in popularity
        }
        else if(likeStatus===3)
        {
            newStatus=1
            // here decrease dislike count in popularity also
        }

        try {
            await fetch("/changelikestatus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId, movie_id: movieId, likestatus: newStatus })
            });
            setLikeStatus(newStatus);
        } catch (error) {
            console.error("Error updating dislike status:", error);
        }
    };






































    
    const getVideoId = (url) => {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);
        return match?.[2]?.length === 11 ? match[2] : null;
    };
    
    const handleAddToWatchlist = async () => {
    const movie_id = PresentMovie?.movie_id;
        try {
            const response = await fetch("http://localhost:3000/watchlist/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ user_id, movie_id }),
            });

            const data = await response.json();
            setOpenSnackbar(true);
            setMessage(response.ok ? `Movie ${PresentMovie?.title} added to watchlist!` : "Movie not added!");
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };

    const handleSubmitRatingReview = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            setMessage("User not logged in!");
            setOpenSnackbar(true);
            return;
        }

        const { user_id } = JSON.parse(user);
        const movie_id = PresentMovie?.movie_id;
        if (!movie_id) {
            setMessage("Invalid movie data!");
            setOpenSnackbar(true);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/rating/addrating", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ user_id, movie_id, rating, review }),
            });

            const data = await response.json();
            setMessage(response.ok ? `You rated ${rating}/10! Review: "${review}"` : data.message || "Failed to submit rating.");

           // Refresh reviews after submitting
        } catch (error) 
        {
            console.error("Error submitting rating & review:", error);
            setMessage("An error occurred.");
        }

        setOpenSnackbar(true);
        setOpenRatingReview(false);
        setReview("");
    };

    const handelviewReviews= async () => {
        const movie_id = PresentMovie?.movie_id;
        if (!movie_id) {
            setMessage("Invalid movie data!");
            setOpenSnackbar(true);
            return;
        }

            navigate(`/dashboard/moviereviews/${movie_id}`);
}

    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const videoId = videoLink ? getVideoId(videoLink) : null;

    if (!videoId) 
    {
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
                        {expanded ? `The Movie Name is ${PresentMovie?.title}. Released in ${PresentMovie?.release_year}, runs for ${PresentMovie?.duration} minutes, rated ${PresentMovie?.rating} on IMDB.` : "This is a short description..."}
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

                    <Button variant="contained" className="bg-red-600 hover:bg-red-500 text-white" onClick={handelviewReviews}>
                        Reviews
                    </Button>
                </div>


                                {/* Like & Dislike Section */}
                <div className="flex justify-center items-center gap-6 p-4">
                    <Button
                        variant="contained"
                        className="bg-green-500 hover:bg-green-400 text-white rounded-lg transition duration-200"
                        onClick={onClickLikeHandler} // Empty handler
                    >
                        👍 Like
                    </Button>
                    <Button
                        variant="contained"
                        className="bg-red-500 hover:bg-red-400 text-white rounded-lg transition duration-200"
                        onClick={() => {onClickDislikeHandler}} // Empty handler
                    >
                        👎 Dislike
                    </Button>
                </div>



                {/* Display Reviews  like dont fix size what ever may be size all should fix like there should be a scroll bar
                its not mandatory u place it here place it any where u want but on screen it should look nice and scroling should be there for overflow for reveiw section wherever it is*/}

            </div>

            {/* Rating & Review Dialog */}
            <Dialog open={openRatingReview} onClose={() => setOpenRatingReview(false)}>
                <DialogTitle>⭐ Rate & Review</DialogTitle>
                <DialogContent>
                    <Slider
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        min={0}
                        max={10}
                        step={1}
                        marks
                        valueLabelDisplay="auto"
                    />
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenRatingReview(false)}>Cancel</Button>
                    <Button onClick={handleSubmitRatingReview} className="bg-indigo-600 hover:bg-indigo-700 text-white">
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
