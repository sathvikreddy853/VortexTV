import pool from "../config/db.js";

const Watchlist = {
    // Add a movie to the Watchlist
    addMovie: async (userId, movieId) => 
    {
        try {
            const [existing] = await pool.execute(
                'SELECT Watchlist_id FROM Watchlist WHERE user_id = ? AND movie_id = ?',
                [userId, movieId]
            );
            
            if (existing.length > 0) 
            {
                // Update timestamp if movie is already in Watchlist
                await pool.execute(
                    'UPDATE Watchlist SET added_at = CURRENT_TIMESTAMP WHERE user_id = ? AND movie_id = ?',
                    [userId, movieId]
                );
                return { message: "Updated timestamp", Watchlist_id: existing[0].Watchlist_id };
            } 
            else 
            {
                // Insert new entry if it doesn’t exist
                const [result] = await pool.execute(
                    'INSERT INTO Watchlist (user_id, movie_id) VALUES (?, ?)',
                    [userId, movieId]
                );
                return { message: "Movie added to Watchlist", Watchlist_id: result.insertId };
            }
        } 
        catch (error) 
        {
            console.error('Error adding movie to Watchlist:', error);
            throw error;
        }
    },
    

    // Remove a movie from the Watchlist
    removeMovie: async (userId, movieId) => 
    {
        try {
            const [result] = await pool.execute(
                'DELETE FROM Watchlist WHERE user_id = ? AND movie_id = ?',
                [userId, movieId]
            );
            return result;
        } catch (error) {
            console.error('Error removing movie from Watchlist:', error);
            throw error;
        }
    },

    // Get all movies in a user's Watchlist
    getUserWatchlist: async (userId) => 
    {
        try 
        {
            const [rows] = await pool.execute(
                'SELECT * FROM Watchlist WHERE user_id = ?',
                [userId]
            );
            return rows; // returns array of rows from watchlist table 
        } 
        catch (error) 
        {
            console.error('Error fetching Watchlist:', error);
            throw error;
        }
    }
};

export default Watchlist;
