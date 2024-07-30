import React, { useState } from "react";
import "./CustomerNavbarStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const CustomerNavbar = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem("accessToken");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="customer-header">
      <Link to="/">
        <h1>VK Enterprise</h1>
      </Link>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/customer-home">New Booking</Link>
        </li>
        <li>
          <Link to="/customer-my-bookings">My Bookings</Link>
        </li>
        <li>
          <Link to="/customer-my-details">My Details</Link>
        </li>
        {/* Attach handleLogout directly to onClick event of the Link */}
        <li>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>

      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
      </div>
    </div>
  );
};

export default CustomerNavbar;
