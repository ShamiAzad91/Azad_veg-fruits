import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

console.log("ENV TEST →", process.env.CLOUDINARY_API_KEY);

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// my routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

app.use("/api/v1/order",orderRoutes);


// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
