import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouter.js";
import authRoutes from "./routes/authRouter.js";
import subscriptionRoutes from "./routes/subscriptionRouter.js";
import authMiddleware from "./middleware/authmiddleware.js"
import moviesRoutes  from "./routes/searchRouter.js";
import movieAccessRoutes from "./routes/movieaccessRouter.js"
import wattchlistRoutes from "./routes/watchlistRoutes.js"
import ratingRoutes from "./routes/ratingRouter.js"
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth',authRoutes);


// disadvantage her eis change password now will not have a security check

// if there is time ensure changepassword is from different route i.e seperate it from authentication
app.use(authMiddleware)

app.use('/users', userRoutes);
app.use('/subscription',subscriptionRoutes);
app.use('/movies',moviesRoutes);
app.use('/movieaccess',movieAccessRoutes) //latest added route for movieaccess checking
app.use('/watchlist',wattchlistRoutes)
app.use('/rating',ratingRoutes)








app.listen(3000, () => console.log("Server running on port 3000"));