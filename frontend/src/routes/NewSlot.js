import React from "react";
import NavbarAdmin from "../components/AdminNavBar";
import Footer from "../components/Footer";
import AddSlot from "../components/NewSlot";

const NewSlot = () => {
  return (
    <div>
      <NavbarAdmin />
      <AddSlot />
      <Footer />
    </div>
  );
};

export default NewSlot;
