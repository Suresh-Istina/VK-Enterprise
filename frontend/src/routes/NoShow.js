import React from "react";
import EmpNavbar from "../components/EmployeeNavBar";
import Footer from "../components/Footer";
import NoShows from "../components/NoShow";

const NoShow = () => {
  return (
    <div>
      <EmpNavbar />
      <NoShows />
      <Footer />
    </div>
  );
};

export default NoShow;
