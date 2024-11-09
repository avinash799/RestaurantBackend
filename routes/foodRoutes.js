import express from "express";

import { authmiddle } from "../middlewares/authmiddlewares";
import router from "./authRoutes";
import { deleteFood, getAllFood, getAllfoodById, getFoodByRestaurant, placeOrder, updateFood } from "../controllers/foodController";

router.post('/create', authmiddle, createFood);

router.get('/getAll', getAllFood)
router.get('/get/:id', getAllfoodById);

router.get('/getByRestaurant/:id', getFoodByRestaurant);
router.put('/update/:id', authmiddle, updateFood);
router.put("/delete/:id", authmiddle, deleteFood);
router.post('/placeOrder', authmiddle, placeOrder);

export default router;