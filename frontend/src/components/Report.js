import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import "./EmployeeHomeStyles.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(" http://localhost:5000/report", {
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

  const handlePrintReport = () => {
    const element = document.getElementById("report-table");
    html2pdf(element);
  };

  return (
    <div className="emp-bg" id="report-table">
      <p>Monthly Income Report</p>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Income</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.month_year}>
              <td>{payment.month_year}</td>
              <td>{payment.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-report" onClick={handlePrintReport}>
        Print Report
      </button>
    </div>
  );
};

export default Payments;
