import Admin from "../models/Admin.js";
import argon from "argon2";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  const user = await Admin.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user)
    return res.status(404).json({ msg: "Invalid email. Admin doesnt exist." });
  const match = await argon.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Incorrect password" });
  // Extracting necessary information from the user object for the payload
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
  };

  // Signing the payload
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 30 * 60 * 60 },
    function (err, accessToken) {
      res.status(200).json({
        message: "Authentication successful and logged in as an admin.",
        accessToken: accessToken,
        ...payload,
      });
    }
  );
};

export const currentAdmin = async (req, res) => {
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

        // Token is valid, retrieve the admin based on the decoded token
        const admin = await Admin.findOne({
          attributes: ["id", "name", "email", "roleId"],
          where: {
            id: decoded.id,
          },
        });

        if (!admin) {
          return res.status(404).json({ msg: "Admin not found" });
        }

        // Admin found, send the admin data in the response
        res.status(200).json(admin);
      }
    );
  } catch (error) {
    console.error("Error fetching current admin:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
