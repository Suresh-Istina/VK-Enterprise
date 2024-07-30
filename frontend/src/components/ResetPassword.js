import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ForgotPasswordStyles.css";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(""); // Clear error message when user starts typing again

    try {
      const response = await axios.post(
        "http://localhost:5000/reset-password",
        {
          token: token,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }
      );

      alert(response.data.msg); // Show success message
      window.location.reload(); // Refresh page on successful password reset
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg); // Set error message from server response
      } else if (error.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Internal server error. Please try again later.");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Invalid token. Please check the URL.");
    }
  }, [token]);

  return (
    <div className="signup-form">
      <form onSubmit={handleResetPassword}>
        <p>Reset Password</p>

        <label>Enter Your New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <h5 className="error-message">{error}</h5>}
        <button type="submit" className="btn2">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
