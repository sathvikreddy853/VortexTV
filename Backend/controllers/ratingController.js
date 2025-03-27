import MovieRating from "../models/rating.js";

const RatingController = {
    // 1. Add a new rating
    addRating: async (req, res) => {
        const { user_id, movie_id, rating, review } = req.body;

        try {
            // Check if the user has already rated the movie
            const existingRating = await MovieRating.getUserRatingForMovie(user_id, movie_id);

            if (existingRating) {
                // If rating exists, update it
                const updated = await MovieRating.updateRating(user_id, movie_id, rating, review);
                if (updated) {
                    return res.status(200).json({ message: "Rating updated successfully" });
                } else {
                    return res.status(400).json({ message: "Failed to update rating" });
                }
            } else {
                // If no rating exists, add a new one
                const success = await MovieRating.addRating(user_id, movie_id, rating, review);
                if (success) {
                    return res.status(201).json({ message: "Rating added successfully" });
                } else {
                    return res.status(400).json({ message: "Failed to add rating" });
                }
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 2. Delete a rating based on user_id and movie_id
    deleteRating: async (req, res) => {
        const { user_id, movie_id } = req.body;
        try {
            const success = await MovieRating.deleteRating(user_id, movie_id);
            if (success) {
                res.status(200).json({ message: "Rating deleted successfully" });
            } else {
                res.status(404).json({ message: "Rating not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 3. Show all ratings given by a specific user
    getAllUserRatings: async (req, res) => {
        console.log("entered this controller")
        const { user_id } = req.params;
        try {
            const ratings = await MovieRating.getAllUserRatings(user_id);
            res.status(200).json(ratings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 4. Update a rating for a user
    updateRating: async (req, res) => {
        const { user_id, movie_id } = req.params;
        const { rating, review } = req.body;
        try {
            console.log("from updtaerating ,params are :", user_id, movie_id, rating, review);
            const success = await MovieRating.updateRating(user_id, movie_id, rating, review);
            if (success) {
                res.status(200).json({ message: "Rating updated successfully" });
            } else {
                res.status(404).json({ message: "Rating not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },



    // 5. Get a user's rating for a specific movie
    getUserRatingForMovie: async (req, res) => {
        const { user_id, movie_id } = req.params;
        try {
            const rating = await MovieRating.getUserRatingForMovie(user_id, movie_id);
            if (rating) {
                res.status(200).json(rating);
            } else {
                res.status(404).json({ message: "Rating not found for this user and movie" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //dont confuse above function is diffeeent
    getReviews: async (req, res) => {
        try {
            const { movieId } = req.body;
            if (!movieId) 
            {
                return res.status(400).json({ error: "movieId is required in the body" });
            }
            const reviews = await MovieRating.getReviewsByMovieId(movieId);
            res.status(200).json(reviews);
        } 
        catch (error) 
        {
            res.status(500).json({ error: "Internal server error" });
        }
    }

}




export default RatingController;
