import movies from '../models/search.js';

const searchController = {
    findByNamePartial: async (req, res) => {
        const name = req.query.moviename;  
        try {
            const rows = await movies.findByMovieNamePartial(name);
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
