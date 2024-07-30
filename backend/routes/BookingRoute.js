import express from "express";
import {
  getAllBookings,
  getMyBookings,
  getBookingById,
  customerCreateBooking,
  employeeAdminCreateBooking,
  checkIn,
  generateTimeOptions,
  cancelBooking,
  getBooked,
  getNoShow,
  getCheckedIn,
  getCancelled,
  getCompleted,
  checkout,
} from "../controllers/BookingController.js";
import {
  verifyTokenAndCustomer,
  verifyTokenAndAdminAndEmployee,
} from "../middleware/AuthorizeUser.js";

const router = express.Router();

router.get("/time-options", generateTimeOptions);
router.get("/bookings", verifyTokenAndAdminAndEmployee, getAllBookings);
router.get("/bookings/customer", verifyTokenAndCustomer, getMyBookings);
router.get(
  "/bookings/:booking_id",
  verifyTokenAndAdminAndEmployee,
  getBookingById
);
router.post(
  "/bookings",
  verifyTokenAndAdminAndEmployee,
  employeeAdminCreateBooking
);
router.post(
  "/bookings/customer",
  verifyTokenAndCustomer,
  customerCreateBooking
);
router.patch(
  "/bookings/check-in/:booking_id",
  verifyTokenAndAdminAndEmployee,
  checkIn
);
router.patch(
  "/bookings/cancel/:booking_id",
  verifyTokenAndAdminAndEmployee,
  cancelBooking
);
router.get("/booked/bookings", verifyTokenAndAdminAndEmployee, getBooked);
router.get("/no-show/bookings", verifyTokenAndAdminAndEmployee, getNoShow);
router.get(
  "/checked-in/bookings",
  verifyTokenAndAdminAndEmployee,
  getCheckedIn
);
router.get("/cancelled/bookings", verifyTokenAndAdminAndEmployee, getCancelled);
router.get("/completed/bookings", verifyTokenAndAdminAndEmployee, getCompleted);
router.post("/check-out/:booking_id", verifyTokenAndAdminAndEmployee, checkout);

export default router;
