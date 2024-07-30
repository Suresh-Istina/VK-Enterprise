import Admin from "../models/Admin.js";
import argon from "argon2";

export const getAdmin = async (req, res) => {
  try {
    const response = await Admin.findAll({
      attributes: ["id", "name", "email"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      attributes: ["id", "name", "email"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createAdmin = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and confirm password don't match" });
  const hashPassword = await argon.hash(password);
  try {
    await Admin.create({
      name: name,
      email: email,
      password: hashPassword,
      roleId: 1,
    });

    res.status(201).json({ msg: "Registration Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User doesnt exist" });
  const { name, email, password, confPassword, roleId } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = admin.password;
  } else {
    hashPassword = await argon.hash(password);
  }

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and confirm password don't match" });
  try {
    await Admin.update(
      {
        name: name,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          id: admin.id,
        },
      }
    );

    res.status(200).json({ msg: "Update Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User doesnt exist" });
  try {
    await Admin.destroy({
      where: {
        id: admin.id,
      },
    });

    res.status(200).json({ msg: "Delete Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
