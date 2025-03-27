import express from 'express';
const router = express.Router();


import MovieAccessController from '../controllers/movieaccesscontroller.js';

router.post("/checkAcess",MovieAccessController.accessibilty)

// add a route taht just takes params as :movie_id and gives movie name



export default router