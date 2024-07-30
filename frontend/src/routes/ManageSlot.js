import React from "react";
import NavbarAdmin from "../components/AdminNavBar";
import Footer from "../components/Footer";
import UpdateSlot from "../components/ManageSlot";

const ManageSlot = () => {
  return (
    <div>
      <NavbarAdmin />
      <UpdateSlot />
      <Footer />
    </div>
  );
};

export default ManageSlot;
