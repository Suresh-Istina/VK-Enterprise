import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Booking from "./Booking.js";
import Employee from "./Employee.js";

const { DataTypes } = Sequelize;

const Payment = db.define(
  "Payment",
  {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Booking.hasOne(Payment, { foreignKey: "booking_id" });
Payment.belongsTo(Booking, { foreignKey: "booking_id" });

Employee.hasMany(Payment, { foreignKey: "employee_id" });
Payment.belongsTo(Employee, { foreignKey: "employee_id" });

export default Payment;
