import pool from "../config/db.js";


const Movies = {
    findByMovieNamePartial: async (name) => {
        try 
        {
            const [rows] = await pool.execute(
                'SELECT * FROM Movies WHERE title LIKE ?',
                [`%${name}%`]
            )
            return rows; //list of row objects of movies
        } 
        catch (error) 
        {
            console.error('Error finding Movies by name:', error);
            throw error;
        }
    },


    findByName: async (name) => 
    {
        try 
        {
            const [rows] = await pool.execute(
                'SELECT * FROM Movies WHERE title = ?',
                [name]
            )
            return rows;
        } 
        catch (error) 
        {   
            console.error('Error finding Movie by name:', error);
            throw error;
        }
    }
};


export default Movies