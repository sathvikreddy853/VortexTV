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

        // give me a function that gives list of movies based on movie id from the Movies table
        
        getMovies : async (movie_id) => 
        {
            try 
            {
                const [rows] = await pool.execute(
                    'SELECT * FROM Movies WHERE movie_id = ?',
                    [movie_id]
                );
                return rows[0];
            } 
            catch (error) 
            {
                console.error('Error finding movie by movie_id:', error);
                throw error;
            }
        },
        // getGenres : async (movie_id) => 
        // {
        //     try 
        //     {
        //         const [rows] = await pool.execute(
        //             'SELECT * FROM MovieGenres WHERE movie_id = ?',
        //             [movie_id]
        //         );
        //         return rows; // list of genres it is
        //     } 
        //     catch (error) 
        //     {
        //         console.error('Error finding movie by movie_id:', error);
        //         throw error;
        //     }
        // }


}

export default MovieAccess