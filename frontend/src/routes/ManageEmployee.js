import React from "react";
import NavbarAdmin from "../components/AdminNavBar";
import Footer from "../components/Footer";
import DeleteEmployee from "../components/ManageEmployee";

const ManageEmployee = () => {
  return (
    <div>
      <NavbarAdmin />
      <DeleteEmployee />
      <Footer />
    </div>
  );
};

export default ManageEmployee;
