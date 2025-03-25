import express from "express";
import WatchlistController from "../controllers/watchlistController.js";

const router = express.Router();

// Route to add a movie to the watchlist
router.post("/add", WatchlistController.addMovie);

// Route to remove a movie from the watchlist
router.post("/remove", WatchlistController.removeMovie);

// Route to get a user's watchlist
router.post("/list", WatchlistController.getUserWatchlist);

export default router;
