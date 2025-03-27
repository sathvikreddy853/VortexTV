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


    addLike: async (req, res) => 
    {
        try {
            const { movie_id } = req.body;
            if (!movie_id) {
                return res.status(400).json({ success: false, message: "movie_id is required" });
            }

            const result = await Popularity.increaseLikeCount(movie_id);
            if (!result.success) {
                return res.status(404).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, updatedRow: result.updatedRow });
        } 
        catch (error) {
            console.error("Error in addLike:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    addDislike: async (req, res) => 
    {
        try {
            const { movie_id } = req.body;
            if (!movie_id) {
                return res.status(400).json({ success: false, message: "movie_id is required" });
            }

            const result = await Popularity.increaseDislikeCount(movie_id);
            if (!result.success) {
                return res.status(404).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, updatedRow: result.updatedRow });
        } 
        catch (error) {
            console.error("Error in addDislike:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

};

export default PopularityController;
