import express from "express";
import {
  getPayment,
  getPaymentById,
  getReport,
} from "../controllers/PaymentController.js";
import { verifyTokenAndAdminAndEmployee } from "../middleware/AuthorizeUser.js";

const router = express.Router();

router.get("/payments", verifyTokenAndAdminAndEmployee, getPayment);
router.get("/report", verifyTokenAndAdminAndEmployee, getReport);
router.get(
  "/payments/:payment_id",
  verifyTokenAndAdminAndEmployee,
  getPaymentById
);

export default router;
