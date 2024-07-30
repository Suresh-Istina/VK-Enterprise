import React from "react";
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";
import CustomerUpdate from "../components/CustomerUpdateDetails";

const CustomerUpdateDetails = () => {
  return (
    <div>
      {" "}
      <CustomerNavbar />
      <CustomerUpdate />
      <Footer />
    </div>
  );
};

export default CustomerUpdateDetails;
