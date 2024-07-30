import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Slot from "./Slot.js";
import Customer from "./Customer.js";

const { DataTypes } = Sequelize;

const Booking = db.define(
  "Booking",
  {
    booking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    vehicle_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    booked_date: {
      type: DataTypes.DATE,
    },
    actual_time_in: {
      type: DataTypes.DATE,
    },
    actual_time_out: {
      type: DataTypes.DATE,
    },
    time_in: {
      type: DataTypes.DATE,
    },

    slot_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    customer_id: {
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

Slot.hasMany(Booking, { foreignKey: "slot_id" });
Booking.belongsTo(Slot, { foreignKey: "slot_id" });

Customer.hasMany(Booking, { foreignKey: "customer_id" });
Booking.belongsTo(Customer, { foreignKey: "customer_id" });

export default Booking;
