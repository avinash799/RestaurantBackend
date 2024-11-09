import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbconnection } from "./config/db.js";

// Load environment variables
dotenv.config(); // Ensure this is uncommented to load .env file

// Connect to the database
dbconnection();

// Initialize Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // to parse JSON requests

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import restaurantRoutes from "./routes/restaurantRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import foodRoutes from "./routes/foodRoutes.js"
api.use("/api/v1/auth", authRoutes);
api.use("/api/v1/user", userRoutes);
api.use("/api/v1/restaurant", restaurantRoutes)
api.use('/api/v1/category', categoryRoutes)
api.use('./api/v1/food', foodRoutes);
// Basic route to check server status

app.get('/', (req, res) => {
    res.status(200).send(`Server is running on port ${process.env.PORT || 8000}`);
});

// Define port
const PORT = process.env.PORT || 9000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
