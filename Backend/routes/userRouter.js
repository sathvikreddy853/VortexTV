import express from 'express'
const router = express.Router();
import userController from '../controllers/user.js'



/*
example for /users 

now user routeer send it here and now /user here becomes  / , its like a mini app in express app

express passes the arguments res and req to the call back ( here it siss userController.createUser)

how front end sends post request 
POST /users
Content-Type: application/json

{
    "name": "aditya",
    "email": "aditya@gmail.com",
    "password": "secret123"
}

*/




// Create a new user
router.post('/', userController.createUser);

// Get user by ID
router.get('/:id', userController.getUserById);

// Get user by email
router.get('/email/:email', userController.getUserByEmail);

// Update user password
router.put('/:id/password', userController.updateUserPassword);

// Delete user by ID
router.delete('/:id', userController.deleteUserById);

// Update user email
router.put('/:id/email', userController.updateUserEmail);

// Update user name
router.put('/:id/name', userController.updateUserName);

// Delete user by name and email
router.delete('/name-email', userController.deleteUserByNameAndEmail);

router.put('/change-name', userController.updateUserNameByEmail); //newly added for the sake of change in username in settings

export default router