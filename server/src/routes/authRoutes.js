import express from "express";
import { login, logout, refresh, register } from "../controllers/authController.js";
import { authenticate } from "../middleware/verifyJWT.js";
import { verifyRole } from "../middleware/verifyRoles.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/logout', logout);
router.post('/refresh', refresh )

export default router