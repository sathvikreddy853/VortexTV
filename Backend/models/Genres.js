import pool from "../config/db.js";


const Genres = {

    //fetch Genre name based on GenreId which is integer from Genres Table

    getGenreName : async (GenreId) => 
    {
        try 
        {
            console.log("GenreId recieved is (from getGenreName):" , GenreId)
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
    },



    getMovieGenresStrings: async (movie_id) => {
        console.log("movieId: ", movie_id);
        try {
            if (!movie_id) {
                throw new Error("Invalid movie_id");
            }

            const [rows] = await pool.execute(
                "SELECT genre_id FROM MovieGenres WHERE movie_id = ?",
                [movie_id]
            );

            if (rows.length === 0) {
                return [];
            }

            // Fetch genre names and remove duplicates
            const genreSet = new Set();

            for (const row of rows) 
            {
                try
                {
                    const genreName = await Genres.getGenreName(row.genre_id);
                    if (genreName) genreSet.add(genreName);
                } 
                catch (err) 
                {
                    console.error(`Error fetching genre for genre_id ${row.genre_id}:`, err);
                }
            }

            return Array.from(genreSet);
        } catch (error) {
            console.error("Error finding Genre by movie_id:", error.message);
            throw new Error("Failed to retrieve movie genres");
        }
    },

    getMoviesByGenres: async (genreNames) => {
        try {
            console.log("Entered this function");

            if (!genreNames || genreNames.length === 0) {
                return [];
            }

            console.log("Genres received:", genreNames);

            if (typeof genreNames === "string") {
                genreNames = genreNames.split(",");
            }

            // Step 1: Get Genre IDs
            const placeholders = genreNames.map(() => "?").join(",");
            const [genreRows] = await pool.execute(
                `SELECT genre_id FROM Genres WHERE name IN (${placeholders})`,
                genreNames
            );

            console.log("Genre IDs:", genreRows);
            const genreIds = genreRows.map((row) => row.genre_id);

            if (genreIds.length === 0) {
                return [];
            }

            console.log("Mapped Genre IDs:", genreIds);

            // Step 2: Fetch Movies with Partial Matching
            const genrePlaceholders = genreIds.map(() => "?").join(",");
            const [movies] = await pool.execute(
                `
                SELECT DISTINCT m.movie_id, m.title, m.release_year, m.duration, m.rating, m.source_link,
                       (0.8 * COALESCE(p.like_count, 0) - 0.2 * COALESCE(p.dislike_count, 0)) AS popularity_score
                FROM Movies m
                JOIN MovieGenres mg ON m.movie_id = mg.movie_id
                LEFT JOIN Popularity p ON m.movie_id = p.movie_id  -- Moved before WHERE clause
                WHERE mg.genre_id IN (${genrePlaceholders})  
                GROUP BY m.movie_id  
                ORDER BY popularity_score DESC
                LIMIT 20;
                `,
                genreIds
            );

            // Step 3: Assign genreArray safely (No duplicates)
            for (const movie of movies) 
            {
                movie["genreArray"] = await Genres.getMovieGenresStrings(movie.movie_id);
            }

            console.log("Movies from controller:", movies);
            return movies;
        } catch (error) {
            console.error("Error retrieving movies by genres:", error.message);
            throw new Error("Failed to fetch movies");
        }
    },
    
    
    

}

export default Genres;