import mongoose from "mongoose";
import { Restaurant } from "./restaurant.schema.js"
const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Food Title is required'],
    },
    description: {
        type: String,
        required: [true, "Food description is required"],
    },
    price: {
        type: Number,
        required: [true, "Food price is required"],
    },
    foodTags: {
        type: String,  // Consider making this an array of strings if there are multiple tags
    },
    category: {
        type: String, // You might want to limit this to specific categories (e.g., enum or reference)
    },
    code: {
        type: String, // You can use a unique code for the food item
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Make sure 'Restaurant' model name is correct
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5,
    },
    ratingCount: {
        type: Number, // Changed to Number to accurately represent rating counts
        default: 0,
    }
}, { timestamps: true });

export const Food = mongoose.model('Food', foodSchema);

