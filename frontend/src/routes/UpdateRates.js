import React from "react";
import NavbarAdmin from "../components/AdminNavBar";
import Footer from "../components/Footer";
import RatesUpdate from "../components/UpdateRates";

const UpdateRates = () => {
  return (
    <div>
      <NavbarAdmin />
      <RatesUpdate />
      <Footer />
    </div>
  );
};

export default UpdateRates;
