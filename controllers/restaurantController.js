// create restaurant
const createRestaurantController = async (req, res) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;

        // Validation
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "Please provide title and address"
            });
        }

        const newRestaurant = new restaurantSchema({ title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords });
        await newRestaurant.save();

        res.status(201).send({
            success: true,
            message: "New restaurant created successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating restaurant API"
        });
    }
};

// get all restaurants
const getAllRestaurant = async (req, res) => {
    try {
        const restaurants = await restaurantSchema.find();
        res.status(200).send({
            success: true,
            data: restaurants
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching restaurants"
        });
    }
};

const getAllRestaurantById = async (req, res) => {
    try {
        const restaurantId = await req.params.id
        const restaurant = restaurantSchema.findById(restaurantId)
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: 'no restaurant found'
            })
        }
        res.status(200).send({
            success: true,
            restaurant
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in get restaurant by id api',
            error
        })
    }
}
const deleteRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "please provide restaurant Id"
            })
        }
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "No restaurant found"
            })
        }

        await restaurantSchema.findByIdAndDelete(restaurantId);
        res.status(200).send({
            success: true,
            message: "Restaurant Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in delete api'
        })
    }

}

// export functions
export { createRestaurantController, getAllRestaurant, getAllRestaurantById, deleteRestaurant };
