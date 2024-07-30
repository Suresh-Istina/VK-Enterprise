import React, { useState } from "react";
import axios from "axios";
import "./ForgotPasswordStyles.css";

const EmployeeForgotPW = () => {
  const [email, setEmail] = useState(""); // State to hold the email input value
  const [error, setError] = useState(""); // State to hold error messages

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend endpoint
      const response = await axios.post(
        "http://localhost:5000/forgot-password",
        {
          email: email,
          userType: "employee",
        }
      );

      // If the request is successful, show a success message
      alert(response.data.msg);

      // Clear the email input and error message
      setEmail("");
      setError("");
    } catch (error) {
      // If there's an error, handle different types of errors
      if (error.response) {
        // Server responded with an error status code
        setError(
          "Failed to reset password. Kindly check your Email ID and try again later."
        );
        console.error("Error resetting password:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setError("Network error. Please check your internet connection.");
        console.error("Network error:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        setError("Internal server error. Please try again later.");
        console.error("Error:", error.message);
      }
    }
  };

  const handleEmailChange = (e) => {
    // Clear the error message when the user starts typing again
    setError("");
    setEmail(e.target.value);
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleResetPassword}>
        <p>Employee Forgot Password</p>

        <label className="reset-label">Enter Your Registered Email ID</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        ></input>

        {error && <h5 className="error-message">{error}</h5>}
        <button className="btn2">Reset Password</button>
      </form>
    </div>
  );
};

export default EmployeeForgotPW;
