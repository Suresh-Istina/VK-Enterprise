import Customer from "../models/Customer.js";
import argon from "argon2";

export const getCustomer = async (req, res) => {
  try {
    const response = await Customer.findAll({
      attributes: ["id", "name", "email", "nic", "mobile"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const response = await Customer.findOne({
      attributes: ["id", "name", "email", "nic", "mobile"],
      where: {
        id: req.params.id,
      },
    });
    if (!response) return res.status(404).json({ msg: "User doesnt exist" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCustomerByEmail = async (req, res) => {
  try {
    const response = await Customer.findOne({
      attributes: ["id", "name", "email", "nic", "mobile"],
      where: {
        email: req.params.email,
      },
    });
    if (!response) return res.status(404).json({ msg: "User doesnt exist" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCustomerByNIC = async (req, res) => {
  try {
    const response = await Customer.findOne({
      attributes: ["id", "name", "email", "nic", "mobile"],
      where: {
        nic: req.params.nic,
      },
    });
    if (!response) return res.status(404).json({ msg: "User doesnt exist" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCustomer = async (req, res) => {
  const { name, email, password, confPassword, mobile, nic } = req.body;

  // Check if the password matches the confirm password
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password and confirm password don't match" });
  }

  // Hash the password
  const hashPassword = await argon.hash(password);

  try {
    /// Check if email already exists in the database
    const existingEmail = await Customer.findOne({ where: { email: email } });

    // Check if NIC already exists in the database
    const existingNIC = await Customer.findOne({ where: { nic: nic } });

    // If email already exists, send an error response
    if (existingEmail) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // If NIC already exists, send an error response
    if (existingNIC) {
      return res.status(400).json({ msg: "NIC already registered" });
    }

    // Create the new customer
    await Customer.create({
      name: name,
      email: email,
      password: hashPassword,
      mobile: mobile,
      nic: nic,
      roleId: 2,
    });

    // Send success response
    res.status(201).json({ msg: "Registration Success" });
  } catch (error) {
    // Send error response if any error occurs
    res.status(400).json({ msg: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const customer = await Customer.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!customer) return res.status(404).json({ msg: "User doesnt exist" });
  const { name, email, password, confPassword, mobile, nic } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = customer.password;
  } else {
    hashPassword = await argon.hash(password);
  }

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and confirm password don't match" });
  try {
    await Customer.update(
      {
        name: name,
        email: email,
        mobile: mobile,
        nic: nic,
        password: hashPassword,
      },
      {
        where: {
          id: customer.id,
        },
      }
    );

    res.status(200).json({ msg: "Update Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const customer = await Customer.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!customer) return res.status(404).json({ msg: "User doesnt exist" });
  try {
    await Customer.destroy({
      where: {
        id: customer.id,
      },
    });

    res.status(200).json({ msg: "Delete Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
