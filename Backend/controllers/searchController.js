import movies from '../models/search.js';
import Genres from '../models/Genres.js';

const searchController = 
{
    findByNamePartial: async (req, res) => {
        const name = req.query.moviename;  
        try {
            let rows = await movies.findByMovieNamePartial(name); // array of movie objects
            console.log(rows)
            // now for loop through arrays and each movie in array need a new row call genre array
            rows = await Promise.all
            (
                rows.map(async (movieObject) => 
                {
                    console.log(movieObject)
                    movieObject["genreArray"] = await Genres.getMovieGenres(movieObject.movie_id); // Adding genre array
                    console.log(movieObject)
                    return movieObject; // Return the modified movie object
                })
            
            );
            return res.status(200).json(rows || []);  // Return empty array if no results
        } 
        catch (error) {
            console.error('Error finding movie by partial name:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    findByName: async (req, res) => {
        const name = req.query.moviename;  
        try {
            const rows = await movies.findByName(name);
            return res.status(200).json(rows || []);  // Return empty array if no results
        } 
        catch (error) {
            console.error('Error finding movie by name:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default searchController;
