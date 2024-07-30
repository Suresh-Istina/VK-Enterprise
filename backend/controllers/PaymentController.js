import Payment from "../models/Payment.js";
import Admin from "../models/Admin.js";
import Employee from "../models/Employee.js";
import moment from "moment-timezone";
import Booking from "../models/Booking.js";
import Customer from "../models/Customer.js";
import { Sequelize, Op, literal } from "sequelize";

export const getReport = async (req, res) => {
  try {
    const response = await Payment.findAll({
      attributes: [
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(payment_date, '+00:00', '+05:30'), '%Y-%m')"
          ),
          "month_year",
        ],
        [Sequelize.fn("SUM", Sequelize.col("amount")), "total_amount"],
      ],
      group: [
        literal(
          "DATE_FORMAT(CONVERT_TZ(payment_date, '+00:00', '+05:30'), '%Y-%m')"
        ),
      ],
      order: [["month_year", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//***********************/
export const getPayment = async (req, res) => {
  try {
    const response = await Payment.findAll({
      attributes: [
        "payment_id",
        "amount",
        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(payment_date, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "payment_date",
        ],
        "booking_id",
        "employee_id",
      ],
      order: [["booking_id", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const response = await Payment.findOne({
      attributes: [
        "payment_id",
        "amount",

        [
          literal(
            "DATE_FORMAT(CONVERT_TZ(payment_date, '+00:00', '+05:30'), '%Y-%m-%d %H:%i:%s')"
          ),
          "payment_date",
        ],
        "booking_id",
        "employee_id",
      ],
      where: {
        booking_id: req.params.payment_id,
      },
      include: [
        {
          model: Customer,
          attributes: ["id", "name"],
        },
      ],

      include: [
        {
          model: Booking,
          attributes: [
            "booking_id",
            "vehicle_no",
            "slot_id",
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
          ],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
