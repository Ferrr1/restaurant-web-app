import express from "express";
import {
  addReservation,
  getCustomers,
} from "../controllers/customers.controller.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", addReservation);
// router.put("/:id", updateCustomer);
// router.delete("/:id", deleteCustomer);

export default router;
