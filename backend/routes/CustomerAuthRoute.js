import express from "express";
import {
  customerLogin,
  currentCustomer,
  //logout,
} from "../middleware/AuthenticateCustomer.js";

const router = express.Router();

router.get("/customer/details", currentCustomer);
router.post("/customer/login", customerLogin);
//router.post("/customer/logout", logout);
export default router;
