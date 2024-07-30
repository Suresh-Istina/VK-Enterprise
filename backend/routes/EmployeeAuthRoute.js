import express from "express";
import {
  currentEmployee,
  employeeLogin,
} from "../middleware/AuthenticateEmployee.js";

const router = express.Router();

router.get("/employee/details", currentEmployee);
router.post("/employee/login", employeeLogin);

export default router;
