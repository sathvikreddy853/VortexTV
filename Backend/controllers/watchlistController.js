import Watchlist from "../models/watchlist.js";
import MovieAccess from "../models/movieaccess.js";
const WatchlistController = {
    // Add a movie to the watchlist
    addMovie: async (req, res) => {
        try 
        {
            const { user_id, movie_id } = req.body;
            console.log(user_id, movie_id);

            if (!user_id || !movie_id) 
            {
                return res.status(400).json({ message: "user_id and movie_id are required" });
            }

            const result = await Watchlist.addMovie(user_id, movie_id);

            return res.status(201).json(result);
        } 
        catch (error) 
        {
            console.error("Error adding movie to watchlist:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    // Remove a movie from the watchlist
    removeMovie: async (req, res) => {
        try 
        {
            const { user_id, movie_id } = req.body;

            if (!user_id || !movie_id) 
            {
                return res.status(400).json({ message: "user_id and movie_id are required" });
            }

            const result = await Watchlist.removeMovie(user_id, movie_id);

            if (result.affectedRows === 0) 
            {
                return res.status(404).json({ message: "Movie not found in watchlist" });
            }

            return res.status(200).json({ message: "Movie removed from watchlist" });
        } catch (error) {
            console.error("Error removing movie from watchlist:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    // Get user's watchlist
    getUserWatchlist: async (req, res) => 
    {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ message: "user_id is required" });
            }
    
            // Get all watchlist entries for the user
            const watchlist = await Watchlist.getUserWatchlist(user_id);
    
            // Fetch movie details for each movie_id in the watchlist
            const movies = await Promise.all(
                watchlist.map(async (entry) => 
                {
                    const movieDetails = await MovieAccess.getMovies(entry.movie_id);
                    return movieDetails; // Assuming getMovies returns an array, take the first object
                })
            );
    
            return res.status(200).json({ watchlist: movies }); // return array of moveis
        } catch (error) {
            console.error("Error fetching watchlist:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    
};

export default WatchlistController;
