// Import required modules
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import verifyJWT from "./middleware/auth.js";
import orderRouter from "./routes/orderRouter.js";

// Initialize Express application
const app = express();

// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://admin:123@cluster0.z596bqh.mongodb.net/?appName=Cluster0"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("connection failed");
  });

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.use(verifyJWT);

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

// GET endpoint - Fetch all students from database

// Start server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
