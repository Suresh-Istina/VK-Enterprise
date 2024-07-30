import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpFormStyles.css";

const SignUpForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nic: "",
    mobile: "",
    password: "",
    confPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user edits any field
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform frontend validations
    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = "Name is required";
    } else if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = "Invalid email address";
    } else if (!formData.nic) {
      validationErrors.nic = "NIC is required";
    } else if (!formData.mobile) {
      validationErrors.mobile = "Mobile is required";
    } else if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (!formData.confPassword) {
      validationErrors.confPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confPassword) {
      validationErrors.confPassword =
        "Password and confirm password don't match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If all validations pass, send the request to the backend
    const response = await fetch("http://localhost:5000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.msg); // Display success message
      navigate("/login"); // Redirect to login page using navigate
    } else {
      setErrors({ serverError: data.msg });
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <p>SIGN UP</p>

        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <h5 className="error">{errors.name}</h5>}

        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <h5 className="error">{errors.email}</h5>}

        <label for="nic">NIC</label>
        <input
          id="nic"
          type="text"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
        />
        {errors.nic && <h5 className="error">{errors.nic}</h5>}

        <label for="mobile">Mobile</label>
        <input
          id="mobile"
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        {errors.mobile && <h5 className="error">{errors.mobile}</h5>}

        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <h5 className="error">{errors.password}</h5>}

        <label for="confPassword">Confirm Password</label>
        <input
          id="confPassword"
          type="password"
          name="confPassword"
          value={formData.confPassword}
          onChange={handleChange}
        />
        {errors.confPassword && (
          <h5 className="error">{errors.confPassword}</h5>
        )}
        <div className="error-container">
          {" "}
          {errors.serverError && (
            <h5 className="error">{errors.serverError}</h5>
          )}
        </div>

        <button className="btn1" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
