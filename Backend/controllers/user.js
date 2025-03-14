import User from '../models/user.js';
import bcrypt from 'bcrypt';




const userController = {
    createUser: async (req, res) =>
    {
        try {
            const {
                    name,
                    email,
                    password
                    } = req.body;  // object destsructuring

            // encrypting password to store hashed password.


            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create(name, email, hashedPassword);   // creating new user using user model ,new user is a json object (that is promise resolved)
            res.status(201).json(newUser);
        } 

        catch (error)
        {
            console.error('Error creating user:', error);
            res.status(500).json
            (
                {
                message: 'Internal server error'
                }
            );
        }
    },

    getUserById: async (req, res) => 
    {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch (error) {
            console.error('Error getting user by ID:', error);
            res.status(500).json
            (
                {
                message: 'Internal server error'
                }
        );
        }
    },

    getUserByEmail: async (req, res) => 
    {
        try {
            const user = await User.findByEmail(req.params.email);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch (error) {
            console.error('Error getting user by email:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },

    updateUserPassword: async (req, res) => 
    {
        try 
        {
            const 
            {
                password
            } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const affectedRows = await User.updatePassword(req.params.id, hashedPassword);
            if (affectedRows > 0) {
                res.json({
                    message: 'Password updated successfully'
                });
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch (error) {
            console.error('Error updating password:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },

    deleteUserById: async (req, res) => 
    {
        try {
            const affectedRows = await User.deleteById(req.params.id);
            if (affectedRows > 0) {
                res.json({
                    message: 'User deleted successfully'
                });
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },

    updateUserEmail: async (req, res) => 
    {
        try {
            const {
                email
            } = req.body;

            const affectedRows = await User.updateEmail(req.params.id, email);
            
            if (affectedRows > 0) {
                res.json({
                    message: 'Email updated successfully'
                });
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch (error) {
            console.error('Error updating email:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },

    updateUserName: async (req, res) => 
    {
        try {
            const {
                name
            } = req.body;
            const affectedRows = await User.updateName(req.params.id, name);
            if (affectedRows > 0) {
                res.json({
                    message: 'Name updated successfully'
                });
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch (error) {
            console.error('Error updating name:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },


    updateUserNameByEmail: async (req, res) => 
    {
        try 
        {
            const { name ,email} = req.body;
    
            if (!name || name.trim() === "") 
            {
                return res.status(400).json({ message: "New name is required" });
            }
    
            const user = await User.findByEmail(email);
            console.log(email)
    
            if (user) 
            {
                const affectedRows = await User.updateName(user.user_id, name);
    
                if (affectedRows > 0) 
                {
                    return res.json({ message: "Name updated successfully" });//default status 200
                } else 
                {
                    return res.status(400).json({ message: "No changes made, name might be the same" });
                }
            }
            else
            {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            
        } catch (error) 
        {
            console.error("Error updating name by email:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    




    deleteUserByNameAndEmail: async (req, res) => 
    {
        try {
            const 
            {
                name,
                email
            } = req.body;

            const affectedRows = await User.deleteByNameAndEmail(name, email);
            if (affectedRows > 0) {
                res.json({
                    message: 'User deleted successfully'
                });
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch (error) {
            console.error('Error deleting user by name and email:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    },
};

export default userController;