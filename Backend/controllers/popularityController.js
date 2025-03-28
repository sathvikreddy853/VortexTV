import Popularity from "../models/popularity.js";

const PopularityController = 
{

    // Controller method to fetch like count
    getLikeCount: async (req, res) => 
    {
        const { movie_id } = req.body;

        try {
            console.log("Received movie_id in getLikeCount:", movie_id);

            if (!movie_id) {
                throw new Error("movie_id is required");
            }

            const likeCount = await Popularity.fetchLikeCount(movie_id);
            res.json({ like_count: likeCount });
        } 
        catch (error) {
            console.error("Error in getLikeCount:", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    // Controller method to fetch dislike count
    getDislikeCount: async (req, res) => 
    {
        const { movie_id } = req.body;

        try {
            console.log("Received movie_id in getDislikeCount:", movie_id);

            if (!movie_id) {
                throw new Error("movie_id is required");
            }

            const dislikeCount = await Popularity.fetchDislikeCount(movie_id);
            res.json({ dislike_count: dislikeCount });
        } 
        catch (error) {
            console.error("Error in getDislikeCount:", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    fetchRow :async (req, res) => { 
        try 
        {
            const { movie_id } = req.body;
            console.log("Received movie_id in fetchRow:", movie_id);
            const row = await Popularity.fetchRow(movie_id);
            res.status(200).json(row);
        } 
        catch (error) {
            console.error("Error in fetchRow:", error.message);
            res.status(500).json({ error: error.message });
        }
    },


    changeLikeDislike: async (req, res) => 
    {
        try {
            const { movie_id, changeLike, changeDislike } = req.body;

            if (!movie_id || changeLike === undefined || changeDislike === undefined) 
            {
                return res.status(400).json({ success: false, message: "Invalid input parameters" });
            }

            const result = await Popularity.changeLikeDislike(movie_id, changeLike, changeDislike);

            if (!result.success) 
            {
                return res.status(404).json({ success: false, message: "Movie ID not found" });
            }

            res.status(200).json({ success: true, updatedData: result.updatedRow });  //final return 
        } 
        catch (error) 
        {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }


};

export default PopularityController;
