
import express from 'express';
const router = express.Router();
import authController from '../controllers/authentication.js';


router.post('/signup', authController.signup);
router.post('/login', authController.login);

// new post for forgot password
//new route for update password

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword); 

export default router;