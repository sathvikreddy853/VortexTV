import MovieRatingController from "../controllers/ratingController.js";

import express from 'express';
const router = express.Router();

router.get("/:user_id", MovieRatingController.getAllUserRatings);
router.post("/addrating", MovieRatingController.addRating);
router.put("/rating/:user_id/:movie_id", MovieRatingController.updateRating);
router.delete("/rating", MovieRatingController.deleteRating);
router.get("//:user_id/:movie_id",MovieRatingController.getUserRatingForMovie)

export default router;
