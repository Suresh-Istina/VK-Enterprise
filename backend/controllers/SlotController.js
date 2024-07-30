import Slot from "../models/Slot.js";
import Rate from "../models/Rate.js";

export const getSlots = async (req, res) => {
  try {
    const response = await Slot.findAll({
      attributes: ["slot_id", "size", "status", "rate_id"],
      include: [
        {
          model: Rate,
          attributes: ["per_day", "per_hour"],
        },
      ],
      order: [["size"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSlotById = async (req, res) => {
  try {
    const response = await Slot.findOne({
      attributes: ["slot_id", "size", "status", "rate_id"],
      where: {
        slot_id: req.params.slot_id,
      },
      include: [
        {
          model: Rate,
          attributes: ["per_day", "per_hour"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get free slots list
export const getFreeSlots = async (req, res) => {
  try {
    const response = await Slot.findAll({
      attributes: ["slot_id"],
      where: {
        size: req.params.size,
        status: 0,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get free slots count
export const getFreeSlotCount = async (req, res) => {
  try {
    const freeSlots = await Slot.count({
      where: {
        size: req.params.size,
        status: 0, // Check if status is zero
      },
    });
    res.status(200).json({ count: freeSlots });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get booked slots count
export const getBookedSlotCount = async (req, res) => {
  try {
    const freeSlots = await Slot.count({
      where: {
        size: req.params.size,
        status: 1, // Check if status is zero
      },
    });
    res.status(200).json({ count: freeSlots });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSlot = async (req, res) => {
  const { slot_id, size } = req.body;

  try {
    /// Check if slot already exists in the database
    const existingSlot = await Slot.findOne({ where: { slot_id: slot_id } });

    if (existingSlot) {
      return res.status(400).json({ msg: "Slot already registered" });
    }

    const rate_id = size;

    await Slot.create({
      slot_id: slot_id,
      size: size,
      rate_id: rate_id,
    });

    res.status(201).json({ msg: "Slot Added Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateSlotStatus = async (slotId, status) => {
  const slot = await Slot.findOne({
    where: {
      slot_id: slotId,
    },
  });
  if (!slot) return res.status(404).json({ msg: "Slot doesnt exist" });

  try {
    await Slot.update(
      {
        status: status,
      },
      {
        where: {
          slot_id: slot.slot_id,
        },
      }
    );
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const changeSlotStatus = async (req, res) => {
  const slot = await Slot.findOne({
    where: {
      slot_id: req.params.slot_id,
    },
  });
  if (!slot) return res.status(404).json({ msg: "Slot doesnt exist" });

  try {
    const { status } = req.body;
    await Slot.update(
      {
        status: status,
      },
      {
        where: {
          slot_id: slot.slot_id,
        },
      }
    );
    res.status(200).json({ msg: "Slot Status Update Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteSlot = async (req, res) => {
  const slot = await Slot.findOne({
    where: {
      slot_id: req.params.slot_id,
    },
  });
  if (!slot) return res.status(404).json({ msg: "Slot doesnt exist" });
  try {
    await Slot.destroy({
      where: {
        slot_id: slot.slot_id,
      },
    });

    res.status(200).json({ msg: "Delete Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
