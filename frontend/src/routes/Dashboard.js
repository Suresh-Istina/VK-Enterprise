import React from "react";
import NavbarAdmin from "../components/AdminNavBar";
import Footer from "../components/Footer";
import AdminDashboard from "../components/Dashboard";

const Dashboard = () => {
  return (
    <div>
      <NavbarAdmin />
      <AdminDashboard />
      <Footer />
    </div>
  );
};

export default Dashboard;
