import express from "express";
import { login, logout, refresh, register } from "../controllers/authController.js";
import { authLimiter } from "../middleware/rateLimiting.js";


const router = express.Router();


router.post("/register", authLimiter, register);
router.post("/login", login);
router.get('/logout', logout);
router.get('/refresh', authLimiter, refresh )

export default router