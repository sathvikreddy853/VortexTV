import pool from "../config/db.js";

const Popularity = {
    // Fetch like count based on movie_id
    fetchLikeCount: async (movie_id) => 
    {
        try {
            console.log("Movie ID received (from fetchLikeCount):", movie_id);

            const [rows] = await pool.execute(
                'SELECT like_count FROM Popularity WHERE movie_id = ?',
                [movie_id]
            );

            if (rows.length === 0) 
            {
                console.log(`No data found for movie_id: ${movie_id}`);
                return 0; // Default to 0 if not found
            }

            console.log("Like count for", movie_id, "is:", rows[0].like_count);

            return rows[0].like_count;
        } 
        catch (error) {
            console.error(`Error fetching like count for movie_id ${movie_id}:`, error);
            throw new Error("Failed to retrieve like count");
        }
    },

    // Fetch dislike count based on movie_id
    fetchDislikeCount: async (movie_id) => 
    {
        try {
            console.log("Movie ID received (from fetchDislikeCount):", movie_id);

            const [rows] = await pool.execute(
                'SELECT dislike_count FROM Popularity WHERE movie_id = ?',
                [movie_id]
            );

            if (rows.length === 0)
            {
                console.log(`No data found for movie_id: ${movie_id}`);
                return 0; // Default to 0 if not found
            }

            console.log("Dislike count for", movie_id, "is:", rows[0].dislike_count);
            return rows[0].dislike_count;
        } 
        catch (error) 
        {
            console.error(`Error fetching dislike count for movie_id ${movie_id}:`, error);
            throw new Error("Failed to retrieve dislike count");
        }
    },

    fetchRow :async (movie_id) => 
    {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM Popularity WHERE movie_id = ?',
                [movie_id]
            );

            if (rows.length === 0)
                {
                    console.log(`No data found for movie_id: ${movie_id}`);
                    return 0; // Default to 0 if not found
                }
            return rows[0];



        } 
        catch (error) 
        {
            console.error('Error fetching row:', error);
            throw error;
        }
    },

    
  

    //returns object with key's success and again the updateRow
    changeLikeDislike : async (movie_id, changeLike, changeDislike) => {
        try {
            const [updateResult] = await pool.execute(
                'UPDATE Popularity SET like_count = like_count + ?, dislike_count = dislike_count + ? WHERE movie_id = ?',
                [changeLike, changeDislike, movie_id]
            );
    
            if (updateResult.affectedRows === 0) 
            {
                return { success: false, message: "No rows updated. Movie ID may not exist." };
            }
    
            const [updatedRow] = await pool.execute(
                'SELECT * FROM Popularity WHERE movie_id = ?',
                [movie_id]
            );
    
            return { success: true, updatedRow: updatedRow[0] };
        } 
        catch (error) {
            console.error('Error updating like/dislike counts:', error);
            throw error;
        }
    }
    
    
};

export default Popularity;
