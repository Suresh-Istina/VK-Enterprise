import express from "express";
import {
  getEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/EmployeeController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndEmployee,
  verifyTokenAndAdminAndEmployee,
} from "../middleware/AuthorizeUser.js";

const router = express.Router();

router.get("/employees", verifyTokenAndAdmin, getEmployee);
router.get("/employees/:id", verifyTokenAndAdminAndEmployee, getEmployeeById);

router.post("/employees", verifyTokenAndAdmin, createEmployee);
router.patch("/employees/:id", verifyTokenAndEmployee, updateEmployee);
router.delete("/employees/:id", verifyTokenAndAdmin, deleteEmployee);

export default router;
