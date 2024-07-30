import Role from "../models/Role.js";

export const getRole = async (req, res) => {
  try {
    const response = await Role.findAll({
      attributes: ["role_id", "role_name"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createRole = async (req, res) => {
  const { role_name } = req.body;

  try {
    await Role.create({
      role_name: role_name,
    });

    res.status(201).json({ msg: "Role Added Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteRole = async (req, res) => {
  const role = await Role.findOne({
    where: {
      role_id: req.params.role_id,
    },
  });
  if (!role) return res.status(404).json({ msg: "Role doesnt exist" });
  try {
    await Role.destroy({
      where: {
        role_id: role.role_id,
      },
    });

    res.status(200).json({ msg: "Role Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
