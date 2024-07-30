import Employee from "../models/Employee.js";
import argon from "argon2";

export const getEmployee = async (req, res) => {
  try {
    const response = await Employee.findAll({
      attributes: ["id", "name", "email", "mobile"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const response = await Employee.findOne({
      attributes: ["id", "name", "email", "mobile"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ msg: "Employee doesn't exist" });
  }
};

export const createEmployee = async (req, res) => {
  const { name, email, password, confPassword, mobile } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and confirm password don't match" });
  const hashPassword = await argon.hash(password);
  try {
    /// Check if email already exists in the database
    const existingEmail = await Employee.findOne({ where: { email: email } });

    // If email already exists, send an error response
    if (existingEmail) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    await Employee.create({
      name: name,
      email: email,
      password: hashPassword,
      mobile: mobile,
      roleId: 3,
    });

    res.status(201).json({ msg: "Registration Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  const employee = await Employee.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!employee) return res.status(404).json({ msg: "User doesnt exist" });
  const { name, email, password, confPassword, mobile } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = employee.password;
  } else {
    hashPassword = await argon.hash(password);
  }

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and confirm password don't match" });
  try {
    await Employee.update(
      {
        name: name,
        email: email,
        mobile: mobile,
        password: hashPassword,
      },
      {
        where: {
          id: employee.id,
        },
      }
    );

    res.status(200).json({ msg: "Update Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const employee = await Employee.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!employee) return res.status(404).json({ msg: "User doesnt exist" });
  try {
    await Employee.destroy({
      where: {
        id: employee.id,
      },
    });

    res.status(200).json({ msg: "Delete Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
