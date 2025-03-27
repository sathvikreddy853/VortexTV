import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";

const MyReviews = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let userId = user.user_id
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                console.log("In component reviews")
                const response = await fetch(
                    `http://localhost:3000/rating/${userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [userId]);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-3">My Reviews</h2>
            <div className="border rounded p-3 shadow-sm bg-white" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {reviews.length === 0 ? (
                    <p className="text-muted text-center">No reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        <Card key={review.id} variant="outlined" className="mb-3">
                            <CardContent>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Typography variant="h6">{review.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {format(new Date(review.rated_at), "MMMM dd, yyyy")}
                                    </Typography>
                                </div>
                                <div className="d-flex gap-1 mt-2">
                                    {[...Array(review.rating)].map((_, index) => (
                                        <span key={index} className="text-warning">★</span>
                                    ))}
                                </div>


                                {review.review && (
                                    <Typography variant="body1" className="mt-2">
                                        {review.review}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );

};

export default MyReviews;
