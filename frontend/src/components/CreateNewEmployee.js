import React, { useState } from "react";

import "./CustomerHomeStyles.css";

const CreateNewEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",

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
    const token = localStorage.getItem("accessToken");
    const response = await fetch(" http://localhost:5000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.msg); // Display success message
      window.location.reload();
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
    <div className="customer-booking-form">
      <form className="cus-booking-form" onSubmit={handleSubmit}>
        <p>Add Employee</p>

        <label className="cus-label">Name</label>
        <input
          type="text"
          className="cus-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <h5 className="error">{errors.name}</h5>}

        <label className="cus-label">Email</label>
        <input
          type="email"
          className="cus-input"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <h5 className="error">{errors.email}</h5>}

        <label className="cus-label">Mobile</label>
        <input
          type="text"
          className="cus-input"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        {errors.mobile && <h5 className="error">{errors.mobile}</h5>}

        <label className="cus-label">Password</label>
        <input
          type="password"
          className="cus-input"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <h5 className="error">{errors.password}</h5>}

        <label className="cus-label">Confirm Password</label>
        <input
          type="password"
          className="cus-input"
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

        <button className="btn-book" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateNewEmployee;
