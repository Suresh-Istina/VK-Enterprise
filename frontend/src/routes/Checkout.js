import React from "react";
import EmpNavbar from "../components/EmployeeNavBar";
import Footer from "../components/Footer";
import BookingChecckout from "../components/Checkout";

const Checkout = () => {
  return (
    <div>
      <EmpNavbar />

      <BookingChecckout />
      <Footer />
    </div>
  );
};

export default Checkout;
