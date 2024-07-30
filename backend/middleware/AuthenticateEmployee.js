import Employee from "../models/Employee.js";
import argon from "argon2";
import jwt from "jsonwebtoken";

export const employeeLogin = async (req, res) => {
  const employee = await Employee.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!employee)
    return res
      .status(404)
      .json({ msg: "Invalid email. Employee doesnt exist." });
  const match = await argon.verify(employee.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Incorrect password" });
  // Extracting necessary information from the employee object for the payload
  const payload = {
    id: employee.id,
    name: employee.name,
    email: employee.email,
    roleId: employee.roleId,
  };

  // Signing the payload
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 8 * 60 * 60 },
    function (err, accessToken) {
      res.status(200).json({
        message: "Authentication successful and logged in as an employee.",
        accessToken: accessToken,
        ...payload,
      });
    }
  );
};

export const currentEmployee = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];

    // Verify the token
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (error, decoded) => {
        if (error) {
          return res.status(403).json({ msg: "Token is not valid" });
        }

        // Token is valid, retrieve the employee based on the decoded token
        const employee = await Employee.findOne({
          attributes: ["id", "name", "email", "roleId"],
          where: {
            id: decoded.id,
          },
        });

        if (!employee) {
          return res.status(404).json({ msg: "Employee not found" });
        }

        // employee found, send the employee data in the response
        res.status(200).json(employee);
      }
    );
  } catch (error) {
    console.error("Error fetching current employee:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
