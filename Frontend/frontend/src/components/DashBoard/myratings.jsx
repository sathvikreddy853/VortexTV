import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";

import {
    AppBar, Toolbar, IconButton, Typography, Button, Card, CardContent,
    TextField, Rating, Container, Grid, Fade, Box
} from "@mui/material";
import { ArrowBack, Edit, Delete, Star } from "@mui/icons-material";
import { format } from "date-fns";

const MyReviews = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let userId = user?.user_id;
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [updatedReview, setUpdatedReview] = useState("");
    const [updatedRating, setUpdatedRating] = useState(0);
    const [navHistory, setNavHistory] = useState([]);
    const navigate= useNavigate()


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/rating/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [userId]);

    const handleBack = () => {

        navigate(-1)
    };

    const handleDelete = async (movieId) => {
        try {
            const response = await fetch(`http://localhost:3000/rating/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ user_id: userId, movie_id: movieId }),
            });
            if (response.ok) {
                setReviews(reviews.filter((review) => review.movie_id !== movieId));
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const handleEdit = (review) => {
        setEditingReview(review.movie_id);
        setUpdatedReview(review.review);
        setUpdatedRating(review.rating);
    };

    const handleSave = async (movieId) => {
        try {
            const response = await fetch(`http://localhost:3000/rating/${userId}/${movieId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ rating: updatedRating, review: updatedReview }),
            });
            if (response.ok) {
                setReviews(reviews.map((r) => (r.movie_id === movieId ? { ...r, review: updatedReview, rating: updatedRating } : r)));
                setEditingReview(null);
            }
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#f0f2f5" }}>
            <AppBar position="sticky" sx={{ bgcolor: "#1976D2", boxShadow: 3 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleBack}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>
                        My Reviews
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ flexGrow: 1, overflowY: "auto", padding: "20px" }}>
                {reviews.length === 0 ? (
                    <Typography color="textSecondary" align="center" sx={{ mt: 5, fontSize: "18px", fontStyle: "italic" }}>
                        No reviews yet.
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {reviews.map((review) => (
                            <Fade in key={review.movie_id} timeout={500}>
                                <Grid item xs={12} sm={6}>
                                    <Card variant="outlined" sx={{
                                        borderRadius: "12px",
                                        padding: "15px",
                                        transition: "transform 0.3s ease-in-out",
                                        boxShadow: 2,
                                        '&:hover': { transform: "scale(1.03)", boxShadow: 4 }
                                    }}>
                                        <CardContent>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{review.title}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {format(new Date(review.rated_at), "MMMM dd, yyyy")}
                                                </Typography>
                                            </Box>

                                            {editingReview === review.movie_id ? (
                                                <Box sx={{ mt: 2 }}>
                                                    <Rating
                                                        name="updated-rating"
                                                        value={updatedRating}
                                                        onChange={(event, newValue) => setUpdatedRating(newValue)}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        value={updatedReview}
                                                        onChange={(e) => setUpdatedReview(e.target.value)}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{ mt: 1 }}
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        sx={{ mt: 1 }}
                                                        onClick={() => handleSave(review.movie_id)}
                                                    >
                                                        Save
                                                    </Button>
                                                </Box>
                                            ) : (
                                                <>
                                                    <Box sx={{ display: "flex", gap: "5px", mt: 1 }}>
                                                        {[...Array(Math.round(review.rating))].map((_, index) => (
                                                            <Star key={index} color="primary" />
                                                        ))}
                                                    </Box>
                                                    <Typography variant="body1" sx={{ mt: 1, color: "#555" }}>
                                                        {review.review}
                                                    </Typography>
                                                </>
                                            )}

                                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px", mt: 2 }}>
                                                <IconButton color="primary" onClick={() => handleEdit(review)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDelete(review.movie_id)}>
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Fade>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default MyReviews;
