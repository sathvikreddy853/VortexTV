import MovieRatingController from "../controllers/ratingController.js";

import express from 'express';
const router = express.Router();

router.get("/:user_id", MovieRatingController.getAllUserRatings);
router.post("/addrating", MovieRatingController.addRating);
router.put("/:user_id/:movie_id", MovieRatingController.updateRating);
router.delete("/delete", MovieRatingController.deleteRating);
router.get("/:user_id/:movie_id",MovieRatingController.getUserRatingForMovie)
router.post("/get-reviews", MovieRatingController.getReviews);


export default router;
