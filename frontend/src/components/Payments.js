import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeHomeStyles.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(" http://localhost:5000/payments", {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      } else {
        console.error("Failed to fetch payments");
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleGenerateReport = () => {
    navigate("/report");
  };

  return (
    <div className="emp-bg">
      <p>Payments</p>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Booking ID</th>
            <th>Employee ID</th>
            <th>Paid Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.payment_id}>
              <td>{payment.payment_id}</td>
              <td>{payment.booking_id}</td>
              <td>{payment.employee_id}</td>
              <td>{payment.payment_date}</td>
              <td>{payment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-report" onClick={handleGenerateReport}>
        Generate Monthly Report
      </button>
    </div>
  );
};

export default Payments;
