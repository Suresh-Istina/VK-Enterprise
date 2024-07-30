import React, { useState } from "react";
import "./EmployeeNavbarStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminNavBar = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem("accessToken");
    // Redirect to login page
    navigate("/admin-login");
  };

  return (
    <div className="employee-header">
      <Link to="/">
        <h1>VK Enterprise</h1>
      </Link>
      <ul className={click ? "emp-nav-menu active" : "emp-nav-menu"}>
        <li>
          <Link to="/admin-home">Dashboard</Link>
        </li>

        <li>
          <Link to="/new-slot">New Slot</Link>
        </li>

        <li>
          <Link to="/manage-slot">Manage Slot</Link>
        </li>

        {/* delete option as well*/}
        <li>
          <Link to="/new-employee">Add Employee</Link>
        </li>
        <li>
          <Link to="/manage-employee">Manage Employees</Link>
        </li>
        <li>
          <Link to="/update-rate">Update Rates</Link>
        </li>
        <li>
          <Link to="/payments">Payments</Link>
        </li>

        <li>
          <Link to="/admin-my-details">My Details</Link>
        </li>
        {/* Attach handleLogout directly to onClick event of the Link */}
        <li>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>

      <div className="hamburger-emp" onClick={handleClick}>
        {click ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
      </div>
    </div>
  );
};

export default AdminNavBar;
