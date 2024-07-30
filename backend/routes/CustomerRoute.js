import express from "express";
import {
  getCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail,
  getCustomerByNIC,
} from "../controllers/CustomerController.js";

import {
  verifyTokenAndAdminAndEmployee,
  verifyTokenAndAdmin,
  verifyTokenAndCustomer,
} from "../middleware/AuthorizeUser.js";

const router = express.Router();

router.get("/customers", verifyTokenAndAdminAndEmployee, getCustomer);
router.get("/customers/:id", getCustomerById);
router.get(
  "/customers/email/:email",
  verifyTokenAndAdminAndEmployee,
  getCustomerByEmail
);
router.get(
  "/customers/nic/:nic",
  verifyTokenAndAdminAndEmployee,
  getCustomerByNIC
);
router.post("/customers", createCustomer);
router.patch("/customers/:id", verifyTokenAndCustomer, updateCustomer);
router.delete("/customers/:id", verifyTokenAndAdmin, deleteCustomer);

export default router;
