import React from "react";
import EmpNavbar from "../components/EmployeeNavBar";
import Footer from "../components/Footer";
import Bill from "../components/GenerateInvoice";

const GenerateInvoice = () => {
  return (
    <div>
      <EmpNavbar />
      <Bill />
      <Footer />
    </div>
  );
};

export default GenerateInvoice;
