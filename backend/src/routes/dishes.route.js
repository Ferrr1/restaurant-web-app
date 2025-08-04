import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  addDish,
  deleteDish,
  getDishes,
  updateDish,
} from "../controllers/dishes.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import multer from "multer";

const router = express.Router();

// Protected Routes
router.get("/", authenticate, getDishes);
router.post(
  "/",
  authenticate,
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        console.error("Multer error:", err.message);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  addDish
);

router.put(
  "/:id",
  authenticate,
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        console.error("Multer error:", err.message);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  updateDish
);
router.delete("/:id", authenticate, deleteDish);
export default router;
