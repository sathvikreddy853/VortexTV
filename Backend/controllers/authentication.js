// controllers/authController.js

import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Subscription from "../models/subscription.js";

const authController = 
{
    signup: async (req, res) => 
    {
        try {
            const { name, email, password } = req.body;

            const existingUser = await User.findByEmail(email);

            if (existingUser) 
            {
                return res.status(400).json({
                    message: "Email already exists",
                });
            }   

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create(name, email, hashedPassword);

            const token = jwt.sign
            (
                {
                    userId: newUser.user_id,
                },
                "your-secret-key",
                {
                    expiresIn: "7d",
                }
            );

            res.status(201).json({
                token,
                user: {
                    user_id: newUser.user_id,
                    name: newUser.name,
                    email: newUser.email,
                },
            }); 
        } catch (error) 
        {
            console.error("Error during signup:", error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;  

            const user = await User.findByEmail(email);  // checking wether user is present in db or not
            if (!user) 
            {

                return res.status(401).json({message: "Invalid credentials",});
            }

            const passwordMatch = await bcrypt.compare(password, user.password_hash); // compares db's userpassword and sent password

            if (!passwordMatch) 
            {
                return res.status(401).json({message: "Invalid credentials",});
            }

            // here u can encode any object but i am encoding simply user_id because u can work everything with that 
            const token = jwt.sign(
                {
                    userId: user.user_id,
                },
                "your-secret-key",
                {
                    expiresIn: "7d",
                }
            );

            let stillSubscribed = true;

            if(await Subscription.isUserSubscribed(user.user_id))
            {
                let endDate = await Subscription.getEndDate(user.user_id);
                console.log(" here i am ")
                if(new Date(endDate) < new Date())
                {

                    stillSubscribed=false;
                    const resultant = await Subscription.deleteSubscription(user.user_id);
                    if(!resultant)
                    {
                        // this hsould not happen
                        console.log("reached unwanted place  ,correct your code, from authentication.js controller");
                        return res.status(400).json("some codeproblem");
                    }
                }

            }


            //here test for users subscription status
            

            // frankly speaking user object should nnot be sent only token is enough but our complete backend just pretends to have security where infact it dosent have much security
            res.json
            ({
                token,
                user: 
                {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email,
                },
                stillSubscribed
            }); 
        } 
        catch (error) 
        {
            console.error("Error during login:", error);
            res.status(500).json({message: "Internal server error", });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findByEmail(email);

            if (!user) 
            {
                return res.status(404).json({ message: "User not found" }); // code 404 means it is negative result
            }

            //by default respons eis 200


            res.json({ message: "User found. Proceed to reset password." });  
        } catch (error) {
            console.error("Error during forgot password:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { email, newPassword } = req.body;
            const user = await User.findByEmail(email);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.updatePassword(user.user_id, hashedPassword);

            res.json({ message: "Password reset successful" });
        } catch (error) 
        {
            console.error("Error during reset password:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    validate: async (req, res) => 
    {
        try {
                const token = req.headers.authorization?.split(" ")[1];
                // console.log("token in  backendis :",token)
    
            if (!token) 
            {
                // console.log("in this check 1")
                return res.status(401).json({ valid: false, message: "No token provided" });
            }
    
            let decoded;
            try 
            {
                decoded = jwt.verify(token, "your-secret-key");
            } 
            catch (err) 
            {
                const errorMessage =
                    err.name === "TokenExpiredError" ? "Token expired" :
                    err.name === "JsonWebTokenError" ? "Invalid token" :
                    "Token verification failed";
                // console.log("403 here")
                return res.status(403).json({ valid: false, message: errorMessage });
            }
    
            return res.status(200).json({ valid: true });
    
        } catch (err) 
        {
            console.error("JWT Validation Error:", err);
            return res.status(500).json({ valid: false, message: "Server error" });
        }
    }
    
    
};


export default authController;
