import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouter.js";
import authRoutes from "./routes/authRouter.js";
import subscriptionRoutes from "./routes/subscriptionRouter.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/auth',authRoutes);
app.use('/subscription',subscriptionRoutes);







app.listen(3000, () => console.log("Server running on port 3000"));