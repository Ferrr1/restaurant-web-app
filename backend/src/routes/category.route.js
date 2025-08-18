import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import multer from "multer";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// Protected Routes
router.get("/", getCategories);
router.post(
  "/",

  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        console.error("Multer error:", err.message);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  addCategory
);

router.put(
  "/:id",

  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        console.error("Multer error:", err.message);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  updateCategory
);
router.delete("/:id", deleteCategory);
export default router;
