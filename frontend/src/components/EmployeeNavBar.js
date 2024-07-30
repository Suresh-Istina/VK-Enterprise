import React, { useState } from "react";
import "./EmployeeNavbarStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const EmployeeNavBar = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem("accessToken");
    // Redirect to login page
    navigate("/employee-login");
  };

  return (
    <div className="employee-header">
      <Link to="/">
        <h1>VK Enterprise</h1>
      </Link>
      <ul className={click ? "emp-nav-menu active" : "emp-nav-menu"}>
        <li>
          <Link to="/checkin">Check in</Link>
        </li>
        <li>
          <Link to="/checkout">Check Out</Link>
        </li>
        <li>
          <Link to="/new-booking">New Booking</Link>
        </li>

        <li>
          <Link to="/new-customer">New Customer</Link>
        </li>

        <li>
          <Link to="/generate-invoice">Completed</Link>
        </li>
        <li>
          <Link to="/no-show">No Show</Link>
        </li>
        <li>
          <Link to="/cancelled">Cancelled</Link>
        </li>
        <li>
          <Link to="/find-customer">Find Customer</Link>
        </li>
        <li>
          <Link to="/employee-my-details">My Details</Link>
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

export default EmployeeNavBar;
