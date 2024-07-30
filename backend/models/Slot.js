import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Rate from "./Rate.js";

const { DataTypes } = Sequelize;

const Slot = db.define(
  "Slot",
  {
    slot_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, //0-available 1-booked
      validate: {
        notEmpty: true,
      },
    },

    rate_id: {
      type: DataTypes.STRING,
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

Rate.hasMany(Slot, { foreignKey: "rate_id" });
Slot.belongsTo(Rate, { foreignKey: "rate_id" });

export default Slot;
