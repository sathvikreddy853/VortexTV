import express from 'express';
const router = express.Router();


import MovieAccessController from '../controllers/movieaccesscontroller.js';

router.post("/checkAcess",MovieAccessController.accessibilty)



export default router