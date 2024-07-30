import express from "express";
import {
  getRate,
  getRateById,
  createRate,
  updateRate,
} from "../controllers/RateController.js";
import { verifyTokenAndAdmin } from "../middleware/AuthorizeUser.js";

const router = express.Router();

router.get("/rates", getRate);
router.get("/rates/:rate_id", getRateById);
router.post("/rates", verifyTokenAndAdmin, createRate);
router.patch("/rates/:rate_id", verifyTokenAndAdmin, updateRate);

export default router;
