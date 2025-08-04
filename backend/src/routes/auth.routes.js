import express from "express";
import {
  getUser,
  login,
  logout,
  refreshToken,
  register,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { testEmailConnection } from "../services/email.service.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { limiter } from "../utils/limiter.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", limiter, login);
router.post("/refresh-token", refreshToken);
router.get("/verify-email/:token", verifyEmail);
router.post("/request-password-reset", limiter, requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.get("/user", authenticate, getUser);
router.post("/logout", authenticate, logout);
router.post("/test-email", testEmailConnection);

export default router;
