// controllers/authController.js

import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
    signup: async (req, res) => {
        try {
            const {
                name,
                email,
                password
            } = req.body;

            // Check if user with the given email already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    message: 'Email already exists'
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the new user
            const newUser = await User.create(name, email, hashedPassword);

            // Generate a JWT for the new user
            const token = jwt.sign({
                userId: newUser.user_id
            }, 'your-secret-key', {
                expiresIn: '1h'
            });

            // Return the token and user details to the frontend
            res.status(201).json({
                token,
                user: {
                    user_id: newUser.user_id,
                    name: newUser.name,
                    email: newUser.email
                }
            }); //Include user details.
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },

    login: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;

            const user = await User.findByEmail(email);
            if (!user) 
            {
                return res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if (!passwordMatch) {
                return res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
            const token = jwt.sign({
                userId: user.user_id
            }, 'your-secret-key', {
                expiresIn: '1h'
            });
            res.json({
                token,
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email
                }
            }); // Include user details.
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },
};


export default authController;