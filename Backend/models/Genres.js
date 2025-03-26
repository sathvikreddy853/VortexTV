import pool from "../config/db.js";


const Genres = {

    //fetch Genre name based on GenreId which is integer from Genres Table

    getGenreName : async (GenreId) => 
    {
        try 
        {
            console.log("GenreId recieved is :" , GenreId)
            const [rows] = await pool.execute(
                'SELECT name FROM Genres WHERE genre_id = ?',
                [GenreId]
            );
            console.log("resultant Genre for ",GenreId," is : ",rows[0].name)
            return rows[0]["name"];
        } 
        catch (error) 
        {
            console.error('Error finding Genre by GenreId:', error);
            throw error;
        }
    },

    // get all Genre rows associated with the movie_id from MovieGenres Table


    getMovieGenres: async (movie_id) => 
    {
        console.log("movieId: ",movie_id)
        try {
            if (!movie_id) 
            {
                throw new Error("Invalid movie_id");
            }
    
            const [rows] = await pool.execute(
                'SELECT * FROM MovieGenres WHERE movie_id = ?',
                [movie_id]
            );

            
            // rows is rows from MovieGenres table associated with movie_id
            if (rows.length === 0) 
            {
                return []; 
            }
    
            // Fetch genre names safely
            const genreArray = await Promise.all(
                rows.map(async (row) => 
                    {
                        try 
                        {
                            const genreName = await Genres.getGenreName(row.genre_id);
                            return genreName || "no genre"; 
                        } 
                        catch (err) 
                        {
                            console.error(`Error fetching genre for genre_id ${row.genre_id}:`, err);
                            return ""; 
                        }
                    })
            );
    
            return genreArray;
        } 
        catch (error) 
        {
            console.error("Error finding Genre by movie_id:", error.message);
            throw new Error("Failed to retrieve movie genres");
        }
    }

}

export default Genres;