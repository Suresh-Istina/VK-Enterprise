import Customer from "../models/Customer.js";
import argon from "argon2";
import jwt from "jsonwebtoken";

export const customerLogin = async (req, res) => {
  const customer = await Customer.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!customer)
    return res
      .status(404)
      .json({ msg: "Invalid email. Customer doesnt exist." });
  const match = await argon.verify(customer.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Incorrect password" });
  // Extracting necessary information from the customer object for the payload
  const payload = {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    roleId: customer.roleId,
  };

  // Signing the payload
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 5 * 60 * 60 },
    function (err, accessToken) {
      res.status(200).json({
        message: "Authentication successful and logged in as an customer.",
        accessToken: accessToken,
        ...payload,
      });
    }
  );
};

export const currentCustomer = async (req, res) => {
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

        // Token is valid, retrieve the customer based on the decoded token
        const customer = await Customer.findOne({
          attributes: ["id", "name", "email", "roleId"],
          where: {
            id: decoded.id,
          },
        });

        if (!customer) {
          return res.status(404).json({ msg: "customer not found" });
        }

        // customer found, send the customer data in the response
        res.status(200).json(customer);
      }
    );
  } catch (error) {
    console.error("Error fetching current customer:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// export const logout = async (req, res) => {
//   res.clearCookie("jwt");
//   res.status(200).json({ status: "success" });
// };
