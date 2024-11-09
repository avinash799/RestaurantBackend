import mongoose from "mongoose";

// Define the Category Schema
const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Category title is required'],
            unique: true, // Ensure title is unique
            trim: true, // Remove extra spaces from the title
            minlength: [3, 'Category title must be at least 3 characters long'], // Validation for minimum length
        },
        imageUrl: {
            type: String,
            default: "https://via.placeholder.com/150",  // Default image URL
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description should not exceed 500 characters'], // Limit the description length
        },
        isActive: {
            type: Boolean,
            default: true,  // New field to indicate whether the category is active or not
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// // Create a virtual property for the category's full name or custom format
// categorySchema.virtual('fullCategoryDetails').get(function () {
//   return `${this.title} - ${this.description || 'No description available'}`;
// });

// // Pre-save hook to perform some actions before saving (e.g., validate or manipulate data)
// categorySchema.pre('save', function (next) {
//   if (this.title && this.title.length < 3) {
//     return next(new Error('Title should be at least 3 characters long'));
//   }
//   next();
// });

// Create and export the Category model
export const Category = mongoose.model('Category', categorySchema);

