import pool from "../config/db.js";

const MovieRating = {
    // 1. Fetch rating for a specific movie by a user
    getUserRatingForMovie: async (user_id, movie_id) => 
    {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM movie_ratings WHERE user_id = ? AND movie_id = ?',
                [user_id, movie_id]
            );
            return rows[0] || null;
        } catch (error) {
            console.error('Error fetching user rating for movie:', error);
            throw error;
        }
    },

    // 2. Fetch all ratings given by a user (rating Row)
    getAllUserRatings: async (user_id) => {
        try {
            const [rows] = await pool.execute(
                `SELECT mr.id, mr.movie_id, mr.user_id, m.title, mr.rating, mr.review, mr.rated_at FROM movie_ratings mr INNER JOIN Movies m ON mr.movie_id = m.movie_id WHERE mr.user_id = ?`,
                [user_id]
            );
            return rows;
        } catch (error) {
            console.error('Error fetching all ratings for user:', error);
            throw error;
        }
    },
    
    // 3. Add a new rating
    addRating: async (user_id, movie_id, rating, review) => {
        try {
            const [existing] = await pool.execute(
                'SELECT * FROM movie_ratings WHERE user_id = ? AND movie_id = ?',
                [user_id, movie_id]
            );

            if (existing.length > 0) {
                throw new Error('User has already rated this movie. Use updateRating instead.');
            }

            const [result] = await pool.execute(
                'INSERT INTO movie_ratings (user_id, movie_id, rating, review) VALUES (?, ?, ?, ?)',
                [user_id, movie_id, rating, review]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error adding rating:', error);
            throw error;
        }
    },

    // 4. Update an existing rating
    updateRating: async (user_id, movie_id, rating, review) => {
        try {
            const [result] = await pool.execute(
                'UPDATE movie_ratings SET rating = ?, review = ? WHERE user_id = ? AND movie_id = ?',
                [rating, review, user_id, movie_id]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating rating:', error);
            throw error;
        }
    },

    // 5. Delete a rating (optional)
    deleteRating: async (user_id, movie_id) => {
        try {
            const [result] = await pool.execute(
                'DELETE FROM movie_ratings WHERE user_id = ? AND movie_id = ?',
                [user_id, movie_id]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting rating:', error);
            throw error;
        }
    },

    // 6. Check if a user has already rated a specific movie
    hasUserRatedMovie: async (user_id, movie_id) => {
        try {
            const [rows] = await pool.execute(
                'SELECT 1 FROM movie_ratings WHERE user_id = ? AND movie_id = ? LIMIT 1',
                [user_id, movie_id]
            );
            return rows.length > 0;
        } catch (error) {
            console.error('Error checking if user has rated movie:', error);
            throw error;
        }
    }
};

export default MovieRating;
