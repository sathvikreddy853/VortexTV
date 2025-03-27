import pool from "../config/db.js";

const User_Likes = {

        // addlike is used to update status of like/dislike
        changeLikeStatus: async (user_id, movie_id, likestatus) => {
            try {
                // Check if entry already exists
                const [existing] = await pool.execute(
                    "SELECT * FROM User_Likes WHERE user_id = ? AND movie_id = ?",
                    [user_id, movie_id]
                );
        
                if (existing.length > 0) {
                    if (likestatus === 1) {
                        // If likestatus is 1, remove the reaction
                        const [result] = await pool.execute(
                            "DELETE FROM User_Likes WHERE user_id = ? AND movie_id = ?",
                            [user_id, movie_id]
                        );
                        return { success: true, message: "Like/Dislike removed", deletedRow: result };
                    } else {
                        // Update with new likestatus
                        const [result] = await pool.execute(
                            "UPDATE User_Likes SET likestatus = ? WHERE user_id = ? AND movie_id = ?",
                            [likestatus, user_id, movie_id]
                        );
                        return { success: true, message: "Like/Dislike updated", updatedRow: result };
                    }
                }
        
                // If not present and likestatus is -1 (dislike) or 0 (neutral), insert new record
                const [result] = await pool.execute(
                    "INSERT INTO User_Likes (user_id, movie_id, likestatus) VALUES (?, ?, ?)",
                    [user_id, movie_id, likestatus]
                );
        
                return { success: true, message: "Like/Dislike added", insertedRow: result };
            } catch (error) {
                console.error("Error adding like/dislike:", error);
                throw error;
            }
        },
        

    

    // it only returns movie_ids

    //later updat eit as suuch: basically instead of id's it gives movies directly
    fetchUser_Likes: async (user_id) => {
        try {
            const [rows] = await pool.execute(
                "SELECT movie_id FROM User_Likes WHERE user_id = ? AND likestatus = 2",
                [user_id]
            );
    
            return { success: true, likedMovies: rows.map(row => row.movie_id) };
        } 
        catch (error) {
            console.error("Error fetching user likes:", error);
            throw error;
        }
    },
    


    fetchLikeCount: async (movie_id) => {
        try {
            const [rows] = await pool.execute(
                "SELECT COUNT(*) AS like_count FROM User_Likes WHERE movie_id = ?",
                [movie_id]
            );

            return rows[0]?.like_count || 0;
        } 
        catch (error) {
            console.error("Error fetching like count:", error);
            throw error;
        }
    },

    //returns complete row
    fetchLikestatus: async (user_id, movie_id) => {
        try {
            const [rows] = await pool.execute(
                "SELECT * FROM User_Likes WHERE user_id = ? AND movie_id = ?",
                [user_id, movie_id]
            );
    
            return rows.length > 0 ? rows[0].likestatus : 1;
        } 
        catch (error) {
            console.error("Error fetching like status:", error);
            throw error;
        }
    }
    
};

export default User_Likes;
