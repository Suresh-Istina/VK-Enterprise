import React from "react";
import EmpNavbar from "../components/EmployeeNavBar";
import Footer from "../components/Footer";
import Cancellations from "../components/Cancelled";

const Cancelled = () => {
  return (
    <div>
      <EmpNavbar />
      <Cancellations />
      <Footer />
    </div>
  );
};

export default Cancelled;
