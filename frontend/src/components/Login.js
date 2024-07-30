import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpFormStyles.css";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [blankFieldError, setBlankFieldError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!email) {
      setBlankFieldError("Email is required");
      return;
    }
    if (!password) {
      setBlankFieldError("Password is required");
      return;
    } else {
      setBlankFieldError("");
    }

    try {
      const response = await fetch("http://localhost:5000/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in local storage
        localStorage.setItem("accessToken", data.accessToken);
        // Redirect to customer home
        navigate("/customer-home");
      } else {
        setError(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <p>Login</p>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <h5 className="error">{error}</h5>}
        {blankFieldError && <h5 className="error">{blankFieldError}</h5>}

        <button className="btn1">Login</button>
        <Link to="/signup" className="new-link">
          {" "}
          Sign Up Now{" "}
        </Link>
        <Link to="/customer-forgot-password" className="new-link">
          {" "}
          Forgot Password?{" "}
        </Link>
      </form>
    </div>
  );
};

export default Login;
