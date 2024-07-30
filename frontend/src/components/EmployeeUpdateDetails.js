import React, { useState, useEffect } from "react";
import "./EmployeeHomeStyles.css";

const EmployeeupdateDetails = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [formData, setFormData] = useState({
    password: "",
    confPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const employeeId = extractEmployeeIdFromToken(token);
        const response = await fetch(
          ` http://localhost:5000/employees/${employeeId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setEmployeeData(data);
        } else {
          setErrors({ serverError: data.msg });
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const extractEmployeeIdFromToken = (token) => {
    const tokenPayload = token.split(".")[1];
    const decodedPayload = atob(tokenPayload);
    const { id } = JSON.parse(decodedPayload);
    return id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const employeeId = extractEmployeeIdFromToken(token);

    // Check if password and confirm password match
    if (formData.password !== formData.confPassword) {
      setErrors({ passwordMatchError: "Passwords do not match." });
      return; // Prevent further execution
    }

    try {
      const requestBody = {
        name: employeeData.name,
        email: employeeData.email,
        password: formData.password,
        confPassword: formData.password,
        mobile: employeeData.mobile,
      };

      const response = await fetch(
        ` http://localhost:5000/employees/${employeeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        window.location.reload();
      } else {
        setErrors({ serverError: data.msg });
      }
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user edits any field
    setErrors({});
  };

  return (
    <div className="customer-booking-form">
      <form className="cus-booking-form" onSubmit={handleSubmit}>
        <p>Update Details</p>

        <label className="cus-label">Name</label>
        <input
          type="text"
          name="name"
          required
          className="cus-input"
          value={employeeData.name}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, name: e.target.value })
          }
        />

        <label className="cus-label">Email</label>
        <input
          type="email"
          name="email"
          required
          className="cus-input"
          value={employeeData.email}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, email: e.target.value })
          }
        />

        <label className="cus-label">Mobile</label>
        <input
          type="text"
          name="mobile"
          className="cus-input"
          required
          value={employeeData.mobile}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, mobile: e.target.value })
          }
        />

        <label className="cus-label">Password</label>
        <input
          type="password"
          name="password"
          className="cus-input"
          placeholder="Update your password only if necessary."
          onChange={handleChange}
        />

        <label className="cus-label">Confirm Password</label>
        <input
          type="password"
          name="confPassword"
          className="cus-input"
          placeholder="Update your password only if necessary."
          onChange={handleChange}
        />
        <div className="error-container">
          {errors.serverError && (
            <h5 className="error">{errors.serverError}</h5>
          )}
          {errors.passwordMatchError && (
            <h5 className="error">{errors.passwordMatchError}</h5>
          )}
        </div>

        <button className="btn-book" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EmployeeupdateDetails;
