import express from 'express';
import subscriptionController from '../controllers/subscriptionController.js'

const router = express.Router();



router.post("/subscribe",subscriptionController.subscribeUser)
router.post("/fetchplan",subscriptionController.subscriptionDetails)


export default router