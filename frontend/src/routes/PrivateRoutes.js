import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("accessToken");

  // Determine authentication status based on token existence
  const isAuthenticated = !!token;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
