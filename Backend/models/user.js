import pool from "../config/db.js";

const User = {
    // Create a new user
    create: async (name, email, passwordHash) => {
        try {
            const [result] = await pool.execute(
                'INSERT INTO Users (name, email, password_hash) VALUES (?, ?, ?)',
                [name, email, passwordHash]
            );
            return await User.findByEmail(email);  //returns user object exactly
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    // Find a user by user_id
    findById: async (userId) => {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM Users WHERE user_id = ?',
                [userId]
            );
            return rows[0];  // this exactly returns required object nothing else
        } catch (error) {
            console.error('Error finding user by user_id:', error);
            throw error;
        }
    },

    // Find a user by email
    findByEmail: async (email) => {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM Users WHERE email = ?',
                [email]
            );
            return rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    },

    // Update user password
    updatePassword: async (userId, passwordHash) => 
    {
        try {
            const [result] = await pool.execute(
                'UPDATE Users SET password_hash = ? WHERE user_id = ?',
                [passwordHash, userId]
            );
            return result.affectedRows;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    },

    // Delete user by user_id
    deleteById: async (userId) => 
    {
        try {
            const [result] = await pool.execute(
                'DELETE FROM Users WHERE user_id = ?',
                [userId]
            );
            return result.affectedRows;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    // Update user email
    updateEmail: async (userId, email) => 
    {
        try {
            const [result] = await pool.execute(
                'UPDATE Users SET email = ? WHERE user_id = ?',
                [email, userId]
            );
            return result.affectedRows;
        } catch (error) {
            console.error('Error updating email:', error);
            throw error;
        }
    },

    // Update user name
    updateName: async (userId, name) => 
    {
        try {
            const [result] = await pool.execute(
                'UPDATE Users SET name = ? WHERE user_id = ?',
                [name, userId]
            );
            return result.affectedRows;
        } catch (error) {
            console.error('Error updating name:', error);
            throw error;
        }
    },

    //Delete user by name and email.
    deleteByNameAndEmail: async (name, email) => 
    {
        try {
            const user = await User.findByNameAndEmail(name, email);
            if (user) {
                return await User.deleteById(user.user_id);
            } else {
                return 0; // User not found
            }
        } catch (error) {
            console.error('Error deleting user by name and email:', error);
            throw error;
        }
    },

    //helper function to find user by name and email
    findByNameAndEmail: async (name, email) => 
    {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM Users WHERE name = ? AND email = ?',
                [name, email]
            );
            return rows[0];
        } catch (error) {
            console.error('Error finding user by name and email:', error);
            throw error;
        }
    },
};
export default User