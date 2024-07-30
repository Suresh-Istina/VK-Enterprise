import express from "express";
import {
  getAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/AdminController.js";
import { verifyTokenAndAdmin } from "../middleware/AuthorizeUser.js";

const router = express.Router();

router.get("/admins", verifyTokenAndAdmin, getAdmin);
router.get("/admins/:id", verifyTokenAndAdmin, getAdminById);
router.post("/admins", verifyTokenAndAdmin, createAdmin);
router.patch("/admins/:id", verifyTokenAndAdmin, updateAdmin);
router.delete("/admins/:id", verifyTokenAndAdmin, deleteAdmin);

export default router;
