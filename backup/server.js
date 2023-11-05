import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from 'cors';
import connectDB from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js"
import categoryRoutes from "./Routes/categoryRoutes.js"
import petRoutes from "./Routes/petRoutes.js"
import cartRoutes from "./Routes/cartRoutes.js"





//config env
dotenv.config()

//rest object
const app=express();


//middlewares
app.use(express.json())
app.use(cors());
app.use(morgan("dev"));

//Database Connections
connectDB();

//API endpoints
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/pets",petRoutes)
app.use("/api/v1/cart",cartRoutes)









if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  } 

//PORT
const PORT=process.env.PORT || 8080;

//Connection 
app.listen(PORT,()=>{
console.log(`server is running on the port ${PORT}`.bgCyan.white)
})