import Rate from "../models/Rate.js";

export const getRate = async (req, res) => {
  try {
    const response = await Rate.findAll({
      attributes: ["rate_id", "per_hour", "per_day"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getRateById = async (req, res) => {
  try {
    const response = await Rate.findOne({
      attributes: ["rate_id", "per_hour", "per_day"],
      where: {
        rate_id: req.params.rate_id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createRate = async (req, res) => {
  const { rate_id, per_hour, per_day } = req.body;

  try {
    await Rate.create({
      rate_id: rate_id,
      per_hour: per_hour,
      per_day: per_day,
    });

    res.status(201).json({ msg: "Rate Added Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateRate = async (req, res) => {
  const rate = await Rate.findOne({
    where: {
      rate_id: req.params.rate_id,
    },
  });
  if (!rate) return res.status(404).json({ msg: "Rate doesnt exist" });
  const { per_hour, per_day } = req.body;

  try {
    await Rate.update(
      {
        per_hour: per_hour,
        per_day: per_day,
      },
      {
        where: {
          rate_id: rate.rate_id,
        },
      }
    );

    res.status(200).json({ msg: "Rates Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
