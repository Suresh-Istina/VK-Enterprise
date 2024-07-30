import React from "react";
import NavbarAdmin from "../components/AdminNavBar";
import Footer from "../components/Footer";
import Income from "../components/Payments";

const Payments = () => {
  return (
    <div>
      <NavbarAdmin />
      <Income />
      <Footer />
    </div>
  );
};

export default Payments;
