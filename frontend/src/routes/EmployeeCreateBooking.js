import React from "react";
import EmpNavbar from "../components/EmployeeNavBar";
import Footer from "../components/Footer";
import NewBookingEmp from "../components/EmployeeCreateBooking";

const EmployeeCreateBooking = () => {
  return (
    <div>
      <EmpNavbar />
      <NewBookingEmp />
      <Footer />
    </div>
  );
};

export default EmployeeCreateBooking;
