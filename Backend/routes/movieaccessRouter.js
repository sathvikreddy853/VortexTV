import express from 'express';
const router = express.Router();


import MovieAccessController from '../controllers/movieaccesscontroller.js';

router.post("/checkAcess",MovieAccessController.accessibilty)
router.post("/getmoviesbygenres",MovieAccessController.getMoviesByGenres)
// add a route taht just takes params as :movie_id and gives movie name
router.get("/getrecommendations",MovieAccessController.getRecommendedMovies)
router.post("/addtowatchhistory",MovieAccessController.addToWatchHistory)
router.post("/fetchwatchhistory",MovieAccessController.fetchwatchHistory)

export default router