import express from "express";
import PopularityController from "../controllers/popularityController.js";

const router = express.Router();

router.post("/getLikes", PopularityController.getLikeCount);
router.post("/getDislikes", PopularityController.getDislikeCount);
router.post("/getPopularity", PopularityController.fetchRow);
router.post("/incLike", PopularityController.addLike);
router.post("/incDislike", PopularityController.addDislike);

export default router;
