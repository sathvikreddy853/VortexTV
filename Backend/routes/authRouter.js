
// const express = require('express');
import express from 'express';
const router = express.Router();
import authController from '../controllers/authentication.js';
router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;