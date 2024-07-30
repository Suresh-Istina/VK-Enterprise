import express from "express";
import {
  getSlots,
  getSlotById,
  getFreeSlots,
  getFreeSlotCount,
  getBookedSlotCount,
  createSlot,
  changeSlotStatus,
  deleteSlot,
} from "../controllers/SlotController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAdminAndEmployee,
} from "../middleware/AuthorizeUser.js";

const router = express.Router();

router.get("/slots", getSlots);
router.get("/slots/:slot_id", getSlotById);
router.get("/slots/free/:size", getFreeSlots);
router.get("/slots/count/free/:size", getFreeSlotCount);
router.get("/slots/count/booked/:size", getBookedSlotCount);
router.post("/slots", verifyTokenAndAdmin, createSlot);
router.patch(
  "/slots/:slot_id",
  verifyTokenAndAdminAndEmployee,
  changeSlotStatus
);
router.delete("/slots/:slot_id", verifyTokenAndAdmin, deleteSlot);

export default router;
