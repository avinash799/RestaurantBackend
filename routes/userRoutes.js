import express from "express";
import {
    getUserController,
    resetPasswordController,
    updatePasswordController,
    updateUserController,
    deleteProfileController // Make sure this controller exists and is imported
} from "../controllers/userController";
import { authmiddle } from "../middlewares/authmiddlewares";

const router = express.Router();

// Get user information
router.get('/getUser', authmiddle, getUserController);

// Update user information
router.put("/updateUser", authmiddle, updateUserController);

// Update password
router.post("/updatePassword", authmiddle, updatePasswordController);

// Reset password
router.post('/resetPassword', authmiddle, resetPasswordController);

// Delete user profile
router.delete('/deleteUser/:id', authmiddle, deleteProfileController);

export default router;
