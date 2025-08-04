import express from "express";
import {
  addTable,
  deleteTable,
  getTables,
  updateTable,
} from "../controllers/tables.controller.js";

const router = express.Router();

router.get("/", getTables);
router.post("/", addTable);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);

export default router;
