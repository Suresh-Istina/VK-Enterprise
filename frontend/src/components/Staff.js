import React from "react";
import "./SignUpFormStyles.css";
import { Link } from "react-router-dom";

const Staff = () => {
  return (
    <div className="signup-form">
      <form>
        <p>Staff Type</p>

        <Link to="/admin-login" className="type">
          {" "}
          Admin{" "}
        </Link>

        <Link to="/employee-login" className="type">
          {" "}
          Employee{" "}
        </Link>
      </form>
    </div>
  );
};

export default Staff;
