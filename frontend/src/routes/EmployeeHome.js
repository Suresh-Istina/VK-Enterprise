import React from "react";
import EmpNavbar from "../components/EmployeeNavBar";
import Footer from "../components/Footer";
import HomeEmployee from "../components/EmployeeHome";

const EmployeeHome = () => {
  return (
    <div>
      <EmpNavbar />
      <HomeEmployee />
      <Footer />
    </div>
  );
};

export default EmployeeHome;
