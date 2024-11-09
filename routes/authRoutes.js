import express from "express";
import registerController from "../controllers/authController";

const router = express.Router();

// Register route handler
router.post('/register', registerController);

router.post('./login')
// Export the router
export default router;
