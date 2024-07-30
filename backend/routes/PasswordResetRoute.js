import express from "express";
import {
  requestPasswordReset,
  resetPassword,
} from "../middleware/ResetPassword.js";

const router = express.Router();

router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
