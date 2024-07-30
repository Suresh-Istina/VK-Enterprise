import React from "react";
import EmpNavbar from "../components/EmployeeNavBar";
import Footer from "../components/Footer";
import UpdateEmp from "../components/EmployeeUpdateDetails";

const EmployeeUpdateDetails = () => {
  return (
    <div>
      <EmpNavbar />
      <UpdateEmp />
      <Footer />
    </div>
  );
};

export default EmployeeUpdateDetails;
