import Food from "../models/food.schema.js";
import Order from "../models/order.schema.js"; // Corrected import for Order model

// Controller to create a new food item
const createFood = async (req, res) => {
    try {
        const { title, description, price, foodTags, category, code, isAvailable, restaurant, rating } = req.body;

        if (!title || !description || !price || !restaurant) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields (title, description, price, and restaurant)."
            });
        }

        const newFood = new Food({
            title,
            description,
            price,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        });

        await newFood.save();

        res.status(201).send({
            success: true,
            message: 'New food item created successfully',
            newFood
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error occurred while creating food item.",
            error: error.message
        });
    }
};

// Controller to get all food items
const getAllFood = async (req, res) => {
    try {
        const foods = await Food.find({});

        if (foods.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No food items found'
            });
        }

        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all foods API',
            error: error.message
        });
    }
};

// Controller to get a food item by ID
const getFoodById = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid ID."
            });
        }

        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'No food found with this ID'
            });
        }

        res.status(200).send({
            success: true,
            food
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in get single food API',
            error: error.message
        });
    }
};

// Controller to get food items by restaurant ID
const getFoodByRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        if (!restaurantId) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid restaurant ID."
            });
        }

        const foodItems = await Food.find({ restaurant: restaurantId });

        if (foodItems.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No food items found for this restaurant ID."
            });
        }

        res.status(200).send({
            success: true,
            message: "Food items for the specified restaurant",
            foodItems
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error occurred while retrieving food items by restaurant.",
            error: error.message
        });
    }
};

// Controller to update a food item by ID
const updateFood = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: "No food ID provided."
            });
        }

        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with this ID."
            });
        }

        const updateData = req.body;
        const updatedFood = await Food.findByIdAndUpdate(foodId, updateData, { new: true });

        res.status(200).send({
            success: true,
            message: "Food item has been updated",
            updatedFood
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in update food API",
            error: error.message
        });
    }
};

// Controller to delete a food item by ID
const deleteFood = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Please provide a food ID."
            });
        }

        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with this ID."
            });
        }

        await Food.findByIdAndDelete(foodId);

        res.status(200).send({
            success: true,
            message: "Food item deleted successfully."
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in delete food API",
            error: error.message
        });
    }
};

// Controller to place an order
const placeOrder = async (req, res) => {
    try {
        const { cart, buyerId } = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid food cart."
            });
        }

        let total = 0;
        cart.forEach((item) => {
            total += item.price;
        });

        const newOrder = new Order({
            foods: cart.map(item => item._id), // assuming cart items are food items with _id
            payment: { amount: total },
            buyer: buyerId
        });

        await newOrder.save();

        res.status(201).send({
            success: true,
            message: "Order placed successfully",
            newOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in place order API',
            error: error.message
        });
    }
};

export { createFood, getAllFood, getFoodById, getFoodByRestaurant, updateFood, deleteFood, placeOrder };
