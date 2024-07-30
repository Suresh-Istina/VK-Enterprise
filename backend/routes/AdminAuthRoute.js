import express from "express";
import { adminLogin, currentAdmin } from "../middleware/AuthenticateAdmin.js";

const router = express.Router();

router.get("/admin/details", currentAdmin);
router.post("/admin/login", adminLogin);

export default router;
