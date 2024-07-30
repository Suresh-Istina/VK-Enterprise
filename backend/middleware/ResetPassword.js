import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import Admin from "../models/Admin.js";
import Customer from "../models/Customer.js";
import Employee from "../models/Employee.js";
import argon from "argon2";
import dotenv from "dotenv";

dotenv.config();

// Initialize nodemailer transporter with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Define separate maps for reset tokens for each user type
const adminResetTokens = new Map();
const customerResetTokens = new Map();
const employeeResetTokens = new Map();

// Endpoint for requesting a password reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email, userType } = req.body;
    let user;
    let resetTokensMap;

    // Determine user type and select appropriate reset token map
    if (userType === "admin") {
      user = await Admin.findOne({ where: { email } });
      resetTokensMap = adminResetTokens;
    } else if (userType === "customer") {
      user = await Customer.findOne({ where: { email } });
      resetTokensMap = customerResetTokens;
    } else if (userType === "employee") {
      user = await Employee.findOne({ where: { email } });
      resetTokensMap = employeeResetTokens;
    }

    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found. Kindly re-check your Email ID" });
    }

    // Generate reset token and set expiration time
    const resetToken = uuidv4();
    const tokenExpiration = Date.now() + 3600000; // 1 hour
    resetTokensMap.set(resetToken, {
      userId: user.id,
      expiration: tokenExpiration,
    });

    // Send reset instructions via email
    await sendResetEmail(user.email, resetToken, userType);

    return res
      .status(200)
      .json({ msg: "Reset instructions sent successfully" });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Function to send reset instructions via email
const sendResetEmail = async (email, token, userType) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  let resetInstructions;

  resetInstructions = "Please follow this link to reset your password.";

  const mailOptions = {
    from: "greenwebsdp@gmail.com",
    to: email,
    subject: "Password Reset Instructions",
    html: `<p>${resetInstructions}: <a href="${resetLink}">${resetLink}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

// Route for handling password reset page
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    let resetTokensMap;
    let user;
    let userType;

    // Determine which map to use based on the token
    if (adminResetTokens.has(token)) {
      resetTokensMap = adminResetTokens;
      userType = "admin";
    } else if (customerResetTokens.has(token)) {
      resetTokensMap = customerResetTokens;
      userType = "customer";
    } else if (employeeResetTokens.has(token)) {
      resetTokensMap = employeeResetTokens;
      userType = "employee";
    } else {
      return res.status(400).json({ msg: "Invalid or expired reset token" });
    }

    // Check if reset token exists and is valid
    if (!resetTokensMap.has(token)) {
      return res.status(400).json({ msg: "Invalid or expired reset token" });
    }

    const { userId, expiration } = resetTokensMap.get(token);
    // Check if token has expired
    if (Date.now() > expiration) {
      resetTokensMap.delete(token); // Remove expired token
      return res.status(400).json({ msg: "Reset token has expired" });
    }

    // Check if newPassword and confirmPassword are blank
    if (!newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Both new password and confirm password are required" });
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    // Update user's password
    if (userType === "admin") {
      user = await Admin.findByPk(userId);
    } else if (userType === "customer") {
      user = await Customer.findByPk(userId);
    } else if (userType === "employee") {
      user = await Employee.findByPk(userId);
    }

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.password = await argon.hash(newPassword);
    await user.save();

    // Remove used token
    resetTokensMap.delete(token);

    return res.status(200).json({ msg: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
