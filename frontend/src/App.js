import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Pricing from "./routes/Pricing";
import AboutUs from "./routes/AboutUs";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import Staff from "./routes/Staff";
import AdminLogin from "./routes/AdminLogin";
import EmployeeLogin from "./routes/EmployeeLogin";
import CustomerHome from "./routes/CustomerHome";
import CustomerMyBookings from "./routes/CustomerMyBookings";
import CustomerForgotPW from "./routes/CustomerForgotPW";
import AdminForgotPW from "./routes/AdminForgotPW";
import EmployeeForgotPW from "./routes/EmployeeForgotPW";
import ResetPassword from "./routes/ResetPassword";
import PrivateRoutes from "./routes/PrivateRoutes";
import CustomerUpdate from "./routes/CustomerUpdateDetails";
import HomeEmp from "./routes/EmployeeHome";
import Checkout from "./routes/Checkout";
import NoShow from "./routes/NoShow";
import Cancelled from "./routes/Cancelled";
import CreateNewCustomer from "./routes/CreateNewCustomer";
import EmployeeCreateBooking from "./routes/EmployeeCreateBooking";
import FindCustomer from "./routes/FindCustomer";
import EmployeeUpdateDetails from "./routes/EmployeeUpdateDetails";
import GenerateInvoice from "./routes/GenerateInvoice";
import NewSlot from "./routes/NewSlot";
import ManageSlot from "./routes/ManageSlot";
import CreateNewEmployee from "./routes/CreateNewEmployee";
import ManageEmployee from "./routes/ManageEmployee";
import UpdateRates from "./routes/UpdateRates";
import AdminUpdateDetails from "./routes/AdminUpdateDetails";
import Dashboard from "./routes/Dashboard";
import Payments from "./routes/Payments";
import Report from "./routes/Report";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/customer-forgot-password" element={<CustomerForgotPW />} />
      <Route path="/admin-forgot-password" element={<AdminForgotPW />} />
      <Route path="/employee-forgot-password" element={<EmployeeForgotPW />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<PrivateRoutes />}>
        <Route element={<CustomerMyBookings />} path="/customer-my-bookings" />
        <Route path="/customer-home" element={<CustomerHome />} />
        <Route path="/customer-my-details" element={<CustomerUpdate />} />
        <Route path="/checkin" element={<HomeEmp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/no-show" element={<NoShow />} />
        <Route path="/cancelled" element={<Cancelled />} />
        <Route path="/new-customer" element={<CreateNewCustomer />} />
        <Route path="/new-booking" element={<EmployeeCreateBooking />} />
        <Route path="/find-customer" element={<FindCustomer />} />
        <Route
          path="/employee-my-details"
          element={<EmployeeUpdateDetails />}
        />
      </Route>
      <Route path="/generate-invoice" element={<GenerateInvoice />} />
      <Route path="/new-slot" element={<NewSlot />} />
      <Route path="/manage-slot" element={<ManageSlot />} />
      <Route path="/new-employee" element={<CreateNewEmployee />} />
      <Route path="/manage-employee" element={<ManageEmployee />} />
      <Route path="/update-rate" element={<UpdateRates />} />
      <Route path="/admin-my-details" element={<AdminUpdateDetails />} />
      <Route path="/admin-home" element={<Dashboard />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
}

export default App;
