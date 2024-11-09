import express from "express";
import { authmiddle } from "../middlewares/authmiddlewares";
import { createRestaurantController, getAllRestaurant, getAllRestaurantById, deleteRestaurant } from "../controllers/restaurantController";

const router = express.Router();

router.post('/create', authmiddle, createRestaurantController);
router.get('/getAll', getAllRestaurant);
router.get('/get/:id', getAllRestaurantById);
router.delete('/delete/:id', authmiddle, deleteRestaurant);

export default router;
