import Category from "../models/category.Schema.js";

// Create Category
const createCategory = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;

        // Validation for title
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Please provide category title.",
            });
        }

        // Create new category with title and imageUrl (if provided)
        const newCategory = new Category({
            title,
            imageUrl: imageUrl || "https://via.placeholder.com/150", // Default image if not provided
        });

        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: "Category Created",
            category: newCategory, // Return the newly created category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating category",
            error: error.message,
        });
    }
};

// Get All Categories
const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find({});

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found",
            });
        }

        return res.status(200).json({
            success: true,
            totalCategories: categories.length, // More descriptive name
            categories,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching categories",
            error: error.message,
        });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;

        // Find category by ID and update
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { title, imageUrl },
            { new: true, runValidators: true } // `runValidators: true` ensures validation happens on update
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory, // Return the updated category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating category",
            error: error.message,
        });
    }
};

export { createCategory, getAllCategory, updateCategory };
