import express from "express";
import {
  login,
  logout,
  register,
  rememberLogin,
} from "../controllers/auth.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route
router.post("/login", login);
router.post("/register", register);
router.get("/remember-login", authenticate, rememberLogin);

// Protected Route
router.post("/logout", authenticate, logout);

// Admin Route
router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ user: req.user, message: "Halaman admin" });
});

export default router;
