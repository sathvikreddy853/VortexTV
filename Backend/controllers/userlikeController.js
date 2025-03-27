import User_Likes from "../models/userlikes.js";

const UserLikeController = {
    // Handles like/dislike updates
    changeLikeStatus: async (req, res) => {
        try {
            const { user_id, movie_id, likestatus } = req.body;

            if (user_id == null || movie_id == null || likestatus == null) {
                return res.status(400).json({ success: false, message: "Missing parameters" });
            }

            const result = await User_Likes.changeLikeStatus(user_id, movie_id, likestatus);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error changing like status:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    // Fetches the movies the user has liked
    fetchUserLikes: async (req, res) => {
        try {
            const { user_id } = req.body;

            if (!user_id) {
                return res.status(400).json({ success: false, message: "Missing user_id" });
            }

            const result = await User_Likes.fetchUser_Likes(user_id);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error fetching user likes:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    // Fetches like count for a movie
    fetchLikeCount: async (req, res) => {
        try {
            const { movie_id } = req.body;

            if (!movie_id) {
                return res.status(400).json({ success: false, message: "Missing movie_id" });
            }

            const likeCount = await User_Likes.fetchLikeCount(movie_id);
            return res.status(200).json({ success: true, likeCount });
        } catch (error) {
            console.error("Error fetching like count:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    // Fetches like/dislike status of a specific movie for a user
    fetchLikestatus: async (req, res) => {
        try {
            const { user_id, movie_id } = req.body;

            if (!user_id || !movie_id) {
                return res.status(400).json({ success: false, message: "Missing parameters" });
            }

            const result = await User_Likes.fetchLikestatus(user_id, movie_id);
            return res.status(200).json({ success: true, likeStatus: result });
        } catch (error) {
            console.error("Error fetching like status:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
};

export default UserLikeController;
