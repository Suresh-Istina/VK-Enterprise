import React from "react";
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";
import MyBooking from "../components/CustomerMyBookings";

const CustomerMyBookings = () => {
  return (
    <div>
      <CustomerNavbar />

      <MyBooking />
      <Footer />
    </div>
  );
};

export default CustomerMyBookings;
