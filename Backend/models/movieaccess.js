import pool from "../config/db.js";
import Genres from "./Genres.js";

const MovieAccess = {

    // get movie based on useres present plan
    // go to movie tables based on given movie id and goes to Movie accesstable and acces plan according to that movie
    // now based on that movie access plan we get access to that movie eg: if his planId is "Plan_1" than all users with their planId as Plan_xwhere x>=1 can access  that movie
    
    //based on movie id returns (plan_id row) associated with it from Movie_Access
    getMovieAccess: async (movie_id) => 
        {
            // movie id is a varchar like MOV1
            try 
            {
                const [rows] = await pool.execute(
                    'SELECT * FROM Movie_Access WHERE movie_id = ?',
                    [movie_id]
                );
                return rows;
            } 
            catch (error) 
            {
                console.error('Error finding movie access by movie_id:', error);
                throw error;
            }
        },

        // function that gives list of movies based on movie id from the Movies table
        
        getMovies: async (movie_id) => 
        {
            console.log("movie_id from getMovies in movieaccessmodel is ",movie_id)
            try {
                
                if (!movie_id ) 
                {
                    throw new Error("Invalid movie_id is given");
                }
        
                const [rows] = await pool.execute(
                    'SELECT * FROM Movies WHERE movie_id = ?',
                    [movie_id]
                );
        
                if (rows.length === 0) 
                {
                    throw new Error("Movie not found");
                }
        
                return rows[0]; 
            } 
            catch (error) 
            {
                console.error('Error finding movie by movie_id:', error.message);
                throw new Error("Failed to retrieve movie details");
            }
        },


        getRecommendedMovies: async ()=>
        {
            try
            {   
                const [rows]=await pool.execute
                (
                    `SELECT top_picks.movie_id, m.title, m.release_year,m.duration,m.rating,m.source_link FROM top_picks INNER JOIN Movies m ON top_picks.movie_id=m.movie_id`
                )

                
                await Promise.all
                (
                    rows.map
                    (
                        async (row) => 
                        {
                            row["genreArray"] = await Genres.getMovieGenresStrings(row.movie_id);
                            console.log(row)
                        }
                    )
                );

                return rows
                
            }
            catch (error)
            {

            }
        },


        addToWatchHistory: async (user_id, movie_id) => {
            try {
                const [existing] = await pool.execute(
                    `SELECT * FROM Watch_History WHERE user_id = ? AND movie_id = ?`,
                    [user_id, movie_id]
                );
        
                if (existing.length > 0) {
                    const [result] = await pool.execute(
                        `UPDATE Watch_History SET watched_on = CURRENT_TIMESTAMP WHERE user_id = ? AND movie_id = ?`,
                        [user_id, movie_id]
                    );
        
                    if (result.affectedRows > 0) {
                        // Fetch the updated row explicitly
                        const [updatedRow] = await pool.execute(
                            `SELECT * FROM Watch_History WHERE user_id = ? AND movie_id = ?`,
                            [user_id, movie_id]
                        );
                        return updatedRow[0];  // Return the updated row
                    } else {
                        throw new Error("Failed to update watch history");
                    }
                } 
                else 
                {
                    const [result] = await pool.execute(
                        `INSERT INTO Watch_History (user_id, movie_id, watched_on) VALUES (?, ?, CURRENT_TIMESTAMP)`,
                        [user_id, movie_id]
                    );
        
                    if (result.affectedRows > 0) {
                        // Fetch the newly inserted row
                        const [insertedRow] = await pool.execute(
                            `SELECT * FROM Watch_History WHERE user_id = ? AND movie_id = ?`, // Assuming there's an 'id' column
                            [user_id,movie_id]
                        );
                        return insertedRow[0];
                    } else {
                        throw new Error("Failed to add to watch history");
                    }
                }
            } catch (error) {
                console.error("Error adding to watch history:", error);
                throw error;
            }
        },
        
        fetchWatchHistory: async (user_id)=>{
            try
            {
                const [rows] = await pool.execute
                (
                    `SELECT * FROM Watch_History Inner Join Movies ON Watch_History.movie_id=Movies.movie_id WHERE user_id = ?`,
                    [user_id]
                )
                return rows;
            }
            catch (error)
            {
                console.error('Error fetching watch history:', error);
                throw error;
            }
        }


        

}

export default MovieAccess