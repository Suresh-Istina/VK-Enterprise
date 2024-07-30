import express from "express";
import {
  getRole,
  createRole,
  deleteRole,
} from "../controllers/RoleController.js";

import { verifyTokenAndAdmin } from "../middleware/AuthorizeUser.js";

const router = express.Router();

router.get("/roles", verifyTokenAndAdmin, getRole);
router.post("/roles", verifyTokenAndAdmin, createRole);
router.delete("/roles/:role_id", verifyTokenAndAdmin, deleteRole);

export default router;
