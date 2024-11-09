import express from "express";

import { authmiddle } from "../middlewares/authmiddlewares";
import { createCategory, getAllCategory, updateCategory } from "../controllers/categoryController";

const router = express.Router();

router.post('/create', authmiddle, createCategory)

router.get('/getAll', getAllCategory);
router.put('/update/:id', authmiddle, updateCategory);

export default router;