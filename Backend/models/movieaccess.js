import pool from "../config/db.js";


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
        }
        

}

export default MovieAccess