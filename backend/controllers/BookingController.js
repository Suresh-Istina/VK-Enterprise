import Booking from "../models/Booking.js";
import Customer from "../models/Customer.js";
import Payment from "../models/Payment.js";
import Employee from "../models/Employee.js";
import Slot from "../models/Slot.js";
import Rate from "../models/Rate.js";
import { Op, literal } from "sequelize";
import moment from "moment-timezone";
import { updateSlotStatus } from "./SlotController.js";
import {
  bookingSuccessNotification,
  checkOutNotification,
  bookingCancelledNotification,
  checkedInNotification,
} from "./NotificationController.js";

function getSriLankaTime() {
  // Set the time zone to Sri Lanka
  return moment().tz("Asia/Colombo");
}

// Function to generate time options in 5-minute intervals up to the next 30 minutes
export const generateTimeOptions = async (req, res) => {
  const currentTime = getSriLankaTime();
  const nextStartTime = currentTime.clone().add(30, "minutes"); // Start time is 30 minutes from current time
  const endTime = nextStartTime.clone().add(30, "minutes"); // 30 minutes from the next start time
  const timeOptions = [];

  // Generate time options in 5-minute intervals up to the next 30 minutes
  let timeIterator = nextStartTime.clone();
  while (timeIterator < endTime) {
    const formattedTime = timeIterator.format("YYYY-MM-DD HH:mm:ss");
    timeOptions.push(formattedTime);
    timeIterator.add(5, "minutes"); // Increment by 5 minutes
  }

  res.json(timeOptions);
};

//emp or admin view all bookings
export const getAllBookings = async (req, res) => {
  try {
    let response;

    response = await Booking.findAll({
      attributes: [
        "booking_id",
        "vehicle_no",
        "status",
        [literal("CONVERT_TZ(booked_date, '+00:00', '+05:30')"), "booked_date"],
        [
          literal("CONVERT_TZ(actual_time_in, '+00:00', '+05:30')"),
          "actual_time_in",
        ],
        [
          literal("CONVERT_TZ(actual_time_out, '+00:00', '+05:30')"),
          "actual_time_out",
        ],
        [literal("CONVERT_TZ(time_in, '+00:00', '+05:30')"), "time_in"],
        "slot_id",
        "customer_id",
      ],
      include: [
        {
          model: Payment,
          attributes: [
            "payment_id",
            "amount",
            [
              literal("CONVERT_TZ(booked_date, '+00:00', '+05:30')"),
              "payment_date",
            ],
          ],
        },
        {
          model: Customer,
          attributes: ["id", "name", "email", "mobile"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//customer my bookings
export const getMyBookings = async (req, res) => {
  try {
    const response = await Booking.findAll({
      attributes: [
        "booking_id",
        "vehicle_no",
        "status",
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(booked_date, '+00:00', '+05:30'), '%Y-%m-%d')"
          ),
          "booked_date",
        ],
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(actual_time_in, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "actual_time_in",
        ],
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(actual_time_out, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "actual_time_out",
        ],

        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(time_in, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "time_in",
        ],
        //[literal("CONVERT_TZ(booked_date, '+00:00', '+05:30')"), "booked_date"],
        // [
        //   literal("CONVERT_TZ(actual_time_in, '+00:00', '+05:30')"),
        //   "actual_time_in",
        // ],
        // [
        //   literal("CONVERT_TZ(actual_time_out, '+00:00', '+05:30')"),
        //   "actual_time_out",
        // ],
        // [literal("CONVERT_TZ(time_in, '+00:00', '+05:30')"), "time_in"],
        "slot_id",
        "customer_id",
      ],
      where: {
        customer_id: req.user.id,
      },
      include: [
        {
          model: Payment,
          attributes: [
            "payment_id",
            "amount",
            [
              literal("CONVERT_TZ(booked_date, '+00:00', '+05:30')"),
              "payment_date",
            ],
          ],
        },
        {
          model: Customer,
          attributes: ["id", "name", "email", "mobile"],
        },
      ],

      order: [["booking_id", "DESC"]],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//admin and employee get booking by id
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: {
        booking_id: req.params.booking_id,
      },
    });
    if (!booking)
      return res.status(404).json({ msg: "Booking number doesn't exist." });
    let response;

    response = await Booking.findOne({
      attributes: [
        "booking_id",

        "vehicle_no",
        "status",
        [literal("CONVERT_TZ(booked_date, '+00:00', '+05:30')"), "booked_date"],
        [
          literal("CONVERT_TZ(actual_time_in, '+00:00', '+05:30')"),
          "actual_time_in",
        ],
        [
          literal("CONVERT_TZ(actual_time_out, '+00:00', '+05:30')"),
          "actual_time_out",
        ],
        [literal("CONVERT_TZ(time_in, '+00:00', '+05:30')"), "time_in"],

        "slot_id",
        "customer_id",
      ],
      where: {
        booking_id: booking.booking_id,
      },
      include: [
        {
          model: Payment,
          attributes: [
            "payment_id",
            "amount",
            [
              literal("CONVERT_TZ(booked_date, '+00:00', '+05:30')"),
              "payment_date",
            ],
          ],
        },
        {
          model: Customer,
          attributes: ["id", "name", "email", "mobile"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//emp or admin creating booking
export const employeeAdminCreateBooking = async (req, res) => {
  try {
    const booked_date = getSriLankaTime();

    console.log(req.roleId);
    const { vehicle_no, customer_id, slot_id } = req.body;

    await Booking.create({
      vehicle_no: vehicle_no,
      actual_time_in: booked_date,
      time_in: booked_date,
      status: "Checked In",
      customer_id: customer_id,
      slot_id: slot_id,
      booked_date: booked_date,
    });

    // Update slot status using the updateSlotStatus method from the slotController
    await updateSlotStatus(slot_id, 1);

    res.status(201).json({ msg: "Booking Created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// customer makes booking prior to arrival
export const customerCreateBooking = async (req, res) => {
  try {
    const booked_date = getSriLankaTime();
    const { vehicle_no, time_in, slot_id } = req.body;
    const newBooking = await Booking.create({
      vehicle_no: vehicle_no,
      time_in: time_in,
      status: "Booked",
      customer_id: req.user.id,
      slot_id: slot_id,
      booked_date: booked_date,
    });

    // Update slot status using the updateSlotStatus method from the slotController
    await updateSlotStatus(slot_id, 1);

    // Trigger notification to customer
    await bookingSuccessNotification(
      req.user.id,
      slot_id,
      time_in,
      vehicle_no,
      newBooking.booking_id
    );

    res.status(201).json({ msg: "Booking Created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//checkin for booked customer
export const checkIn = async (req, res) => {
  try {
    const actual_time_in = getSriLankaTime(); // Get the current date and time
    const booking = await Booking.findOne({
      where: {
        booking_id: req.params.booking_id,
      },
    });
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    // Check if booking status is "Checked In"
    if (booking.status === "Checked In") {
      return res.status(400).json({ msg: "Booking checked in already" });
    }

    // Check if booking status is "Cancelled"
    if (booking.status === "Cancelled") {
      return res.status(400).json({ msg: "Booking is cancelled" });
    }

    if (booking.status === "Complete") {
      return res.status(400).json({ msg: "Booking is already completed" });
    }

    await Booking.update(
      { actual_time_in: actual_time_in, status: "Checked In" },
      {
        where: {
          booking_id: booking.booking_id,
        },
      }
    );

    // Trigger notification to customer
    await checkedInNotification(
      booking.customer_id,
      booking.slot_id,
      booking.time_in,
      booking.vehicle_no,
      booking.booking_id,
      actual_time_in
    );

    res.status(200).json({ msg: "Checked In Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const cancelled_time = getSriLankaTime(); // Get the current date and time
    const booking = await Booking.findOne({
      where: {
        booking_id: req.params.booking_id,
        // status: "Booked",
      },
    });
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    // Check if booking status is "Checked In"
    if (booking.status === "Checked In") {
      return res.status(400).json({ msg: "Booking checked in already" });
    }

    // Check if booking status is "Cancelled"
    if (booking.status === "Cancelled") {
      return res.status(400).json({ msg: "Booking is cancelled already" });
    }

    if (booking.status === "Complete") {
      return res.status(400).json({ msg: "Booking is already completed" });
    }

    await Booking.update(
      { actual_time_out: cancelled_time, status: "Cancelled" },
      {
        where: {
          booking_id: booking.booking_id,
        },
      }
    );

    // Update slot status using the updateSlotStatus method from the slotController
    await updateSlotStatus(booking.slot_id, 0);

    // Trigger notification to customer
    await bookingCancelledNotification(
      booking.customer_id,
      booking.slot_id,
      booking.time_in,
      booking.vehicle_no,
      booking.booking_id
    );

    res.status(200).json({ msg: "Booking Cancelled" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//admin and employee get booked bookings
export const getBooked = async (req, res) => {
  try {
    const response = await Booking.findAll({
      attributes: [
        "booking_id",
        "vehicle_no",
        "status",
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(booked_date, '+00:00', '+05:30'), '%Y-%m-%d')"
          ),
          "booked_date",
        ],

        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(time_in, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "time_in",
        ],
        "slot_id",
        "customer_id",
      ],
      where: {
        status: "Booked",
      },
      include: [
        {
          model: Customer,
          attributes: ["id", "name", "email", "mobile"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//admin and employee get no shows
export const getNoShow = async (req, res) => {
  try {
    // const fifteenMinutesAgo = getSriLankaTime().subtract(15, "minutes");
    // console.log("15 mins: ", fifteenMinutesAgo);
    // console.log("SL: ", getSriLankaTime());
    const response = await Booking.findAll({
      attributes: [
        "booking_id",
        "vehicle_no",
        "status",
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(booked_date, '+00:00', '+05:30'), '%Y-%m-%d')"
          ),
          "booked_date",
        ],

        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(time_in, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "time_in",
        ],
        "slot_id",
        "customer_id",
      ],
      where: {
        status: "Booked",
        time_in: {
          [Op.lt]: literal("NOW() - INTERVAL 15 MINUTE"),
        },
      },
      include: [
        {
          model: Customer,
          attributes: ["id", "name", "email", "mobile"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//admin and employee get checked in bookings
export const getCheckedIn = async (req, res) => {
  try {
    const response = await Booking.findAll({
      attributes: [
        "booking_id",
        "vehicle_no",
        "status",
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(booked_date, '+00:00', '+05:30'), '%Y-%m-%d')"
          ),
          "booked_date",
        ],

        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(actual_time_in, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "actual_time_in",
        ],
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(time_in, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "time_in",
        ],

        "slot_id",
        "customer_id",
      ],
      where: {
        status: "Checked In",
      },
      include: [
        {
          model: Customer,
          attributes: ["id", "name", "email", "mobile"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//admin and employee get cancelled booked bookings
export const getCancelled = async (req, res) => {
  try {
    const response = await Booking.findAll({
      attributes: [
        "booking_id",
        "vehicle_no",
        "status",
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(booked_date, '+00:00', '+05:30'), '%Y-%m-%d')"
          ),
          "booked_date",
        ],
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(time_in, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "time_in",
        ],
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(actual_time_out, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "actual_time_out",
        ],

        "slot_id",
        "customer_id",
      ],
      where: {
        status: "Cancelled",
      },
      include: [
        {
          model: Customer,
          attributes: ["id", "name", "email", "mobile"],
        },
      ],
      order: [["booking_id", "DESC"]],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//admin and employee get completed booked bookings
export const getCompleted = async (req, res) => {
  try {
    const response = await Booking.findAll({
      attributes: [
        "booking_id",
        "vehicle_no",
        "status",
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(booked_date, '+00:00', '+05:30'), '%Y-%m-%d')"
          ),
          "booked_date",
        ],

        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(actual_time_in, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "actual_time_in",
        ],
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(actual_time_out, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "actual_time_out",
        ],

        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(time_in, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "time_in",
        ],

        // [
        //   literal("CONVERT_TZ(actual_time_out, '+00:00', '+05:30')"),
        //   "actual_time_out",
        // ],
        // [literal("CONVERT_TZ(time_in, '+00:00', '+05:30')"), "time_in"],
        "slot_id",
        "customer_id",
      ],
      where: {
        status: "Complete",
      },
      include: [
        {
          model: Customer,
          attributes: ["id", "name", "email", "mobile"],
        },
      ],
      order: [["booking_id", "DESC"]],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//checkout
export const checkout = async (req, res) => {
  try {
    // Retrieve booking details including slot ID
    const booking = await Booking.findByPk(req.params.booking_id, {
      include: [
        {
          model: Slot,
          attributes: ["rate_id", "slot_id"],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Check if booking status is "Booked"
    if (booking.status === "Booked") {
      return res.status(400).json({ msg: "Booking is not checked in" });
    }

    // Check if booking status is "Cancelled"
    if (booking.status === "Cancelled") {
      return res.status(400).json({ msg: "Booking is cancelled" });
    }

    if (booking.status === "Complete") {
      return res.status(400).json({ msg: "Booking is already completed" });
    }

    // Fetch rate ID associated with the slot
    const { rate_id } = booking.Slot;

    // Fetch rate details based on rate ID
    const rate = await Rate.findByPk(rate_id);

    if (!rate) {
      return res.status(404).json({ msg: "Rate not found" });
    }

    // Update actual_time_out to current time
    const actualTimeOut = getSriLankaTime();

    //Update booking status
    await Booking.update(
      { actual_time_out: actualTimeOut },
      {
        where: {
          booking_id: booking.booking_id,
        },
      }
    );

    // Calculate booking charges based on updated duration of booking
    const bookingStartTime = booking.time_in;
    // Calculate booking duration in hours and round up to the nearest whole number
    const bookingDurationHours = Math.ceil(
      (actualTimeOut - bookingStartTime) / (1000 * 60 * 60)
    );

    console.log("start time ", bookingStartTime);

    console.log("end time ", actualTimeOut);

    let bookingCharges = 0;
    let days = 0;
    let remainingHours = 0;
    let hrs = 0;

    // if (bookingDurationHours >= 24) {
    //   // If duration is 24 hours or more, calculate per-day rate
    //   days = Math.floor(bookingDurationHours / 24);

    //   remainingHours = bookingDurationHours % 24;
    //   hrs = remainingHours;

    //   bookingCharges = days * rate.per_day + remainingHours * rate.per_hour;
    // } else {
    //   // If duration is less than 24 hours, calculate only per-hour rate
    //   bookingCharges = bookingDurationHours * rate.per_hour;
    //   hrs = bookingDurationHours;
    // }

    if (bookingDurationHours > 5) {
      // If duration is 5 hours or more, calculate per-day rate
      days = Math.ceil(bookingDurationHours / 24);
      bookingCharges = days * rate.per_day;
      hrs = 0;
    } else {
      // If duration is less than 24 hours, calculate only per-hour rate
      bookingCharges = bookingDurationHours * rate.per_hour;
      hrs = bookingDurationHours;
    }

    console.log("Amount ", bookingCharges);
    // Create payment record with calculated amount and other details
    const payment_date = getSriLankaTime();
    const bill = await Payment.create({
      amount: bookingCharges,
      payment_date: payment_date,
      booking_id: booking.booking_id,
      employee_id: req.user.id,
    });

    const emp = await Employee.findOne({
      attributes: ["id", "name", "email", "mobile"],
      where: {
        id: req.user.id,
      },
    });

    // Update slot status using the updateSlotStatus method from the slotController
    await updateSlotStatus(booking.slot_id, 0);

    //Update booking status
    await Booking.update(
      { status: "Complete" },
      {
        where: {
          booking_id: booking.booking_id,
        },
      }
    );

    // Trigger notification to customer
    await checkOutNotification(
      booking.customer_id,
      booking.slot_id,
      booking.time_in,
      booking.actual_time_in,
      actualTimeOut,
      booking.vehicle_no,
      booking.booking_id,
      bill.amount,
      bill.employee_id,
      emp.name,
      bill.payment_date,
      bill.payment_id,
      days,
      hrs,
      rate.per_day,
      rate.per_hour
    );

    res.status(200).json({ msg: "Checkout successful" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//income report
