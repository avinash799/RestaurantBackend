
//create restaurant

const createRestaurantController = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.Status(500).send({
            success: false,
            message: "Error in creating restaurant api"
        })
    }
}