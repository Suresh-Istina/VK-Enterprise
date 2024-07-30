import React from "react";
import EmpNavbar from "../components/EmployeeNavBar";
import Footer from "../components/Footer";
import NewCustomer from "../components/CreateNewCustomer";

const CreateNewCustomer = () => {
  return (
    <div>
      <EmpNavbar />
      <NewCustomer />
      <Footer />
    </div>
  );
};

export default CreateNewCustomer;
