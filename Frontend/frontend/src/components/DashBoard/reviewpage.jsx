import React, { useEffect, useState } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import { Button, CircularProgress, Typography } from '@mui/material';

function ReviewPage() {
    const {movie_id}=useParams()
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("http://localhost:3000/rating/get-reviews", {
                    method: "POST",
                    headers: { "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ movieId: movie_id }),
                });

                const data = await response.json();
                if (response.ok) {
                    setReviews(data);
                } else {
                    setError(data.error || "Failed to load reviews.");
                }
            } catch (err) {
                setError("Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [movie_id]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <Button variant="contained" className="mb-4 bg-blue-500 hover:bg-blue-400" onClick={() => navigate(-1)}>
                ⬅ Back
            </Button>

            <Typography variant="h5" className="mb-4 font-bold text-gray-200">User Reviews</Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography className="text-red-500">{error}</Typography>
            ) : reviews.length === 0 ? (
                <Typography className="text-gray-400">No reviews yet.</Typography>
            ) : (
                <div className="w-full max-w-3xl h-[70vh] overflow-y-auto bg-gray-800 p-4 rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
                    {reviews.map((review, index) => (
                        <div key={index} className="p-4 mb-3 bg-gray-700 rounded-lg shadow">
                            <Typography variant='subtitle1' className="font-semibold text-gray-300">{review.name}</Typography>
                            <Typography variant="subtitle1" className="font-semibold text-gray-300">{review.username}</Typography>
                            <Typography className="text-yellow-400">⭐ {review.rating}/10</Typography>
                            <Typography className="text-gray-300 break-words">{review.review || "No review provided."}</Typography>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ReviewPage
