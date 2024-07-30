import React from "react";
import NavbarAdmin from "../components/AdminNavBar";
import Footer from "../components/Footer";
import NewEmployee from "../components/CreateNewEmployee";

const CreateNewEmployee = () => {
  return (
    <div>
      <NavbarAdmin />
      <NewEmployee />
      <Footer />
    </div>
  );
};

export default CreateNewEmployee;
