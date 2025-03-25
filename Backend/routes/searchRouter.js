
import express from 'express';
const router = express.Router();

import searchController from '../controllers/searchController.js'


router.get('/moviesearch',searchController.findByNamePartial)


export default router