import React from "react";
import NavbarAdmin from "../components/AdminNavBar";
import Footer from "../components/Footer";
import UpdateAdmin from "../components/AdminUpdateDetails";

const AdminUpdateDetails = () => {
  return (
    <div>
      <NavbarAdmin />
      <UpdateAdmin />
      <Footer />
    </div>
  );
};

export default AdminUpdateDetails;
