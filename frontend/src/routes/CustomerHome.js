import React from "react";
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";
import HomeCustomer from "../components/CustomerHome";

const CustomerHome = () => {
  return (
    <div>
      <CustomerNavbar />

      <HomeCustomer />
      <Footer />
    </div>
  );
};

export default CustomerHome;
