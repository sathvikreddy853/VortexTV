import express from "express";
import PopularityController from "../controllers/popularityController.js";

const router = express.Router();

router.post("/getLikes", PopularityController.getLikeCount);
router.post("/getDislikes", PopularityController.getDislikeCount);
router.post("/getPopularityRow", PopularityController.fetchRow);
router.post("/changeLikeDislike", PopularityController.changeLikeDislike);

export default router;
