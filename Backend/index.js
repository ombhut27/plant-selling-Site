import express from "express";
import 'dotenv/config';
import connectDB from "./Config/mongodb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./Routes/authRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import cartRouter from "./Routes/cartRoutes.js";
import wishlistRouter from "./Routes/wishlistRoutes.js";
import connectCloudinary from "./Config/cloudinary.js";
import productRouter from "./Routes/productRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";

const app = express();
const port = process.env.PORT || 5000
connectDB();
connectCloudinary()

const allowedOrigins = ['http://localhost:5173','http://localhost:5174'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}))


//API endpoint
app.get('/' , (req,res)=> res.send("API Working"))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/wishlist',wishlistRouter)
app.use('/api/product',productRouter)
app.use('/api/order',orderRouter)

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
})