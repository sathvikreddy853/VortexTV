import express from "express";
import userLikecontroller from "../controllers/userlikeController.js";

const router = express.Router();

router.post("/changelikestatus", userLikecontroller.changeLikeStatus);
router.post("/getLikedMovies", userLikecontroller.fetchUserLikes);
router.post("/userLikeCount", userLikecontroller.fetchLikeCount);
router.post("/fetchlikestatus", userLikecontroller.fetchLikestatus);

export default router;
