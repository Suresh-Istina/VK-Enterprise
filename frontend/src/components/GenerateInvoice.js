import React, { useState, useEffect } from "react";
import "./EmployeeHomeStyles.css";
import jsPDF from "jspdf";
//import html2canvas from "html2canvas";

const GenerateInvoice = () => {
  const [bookings, setBookings] = useState([]);
  const [paymentData, setPaymentData] = useState(null);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/completed/bookings", {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        console.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  //***************************** */
  const handleInvoice = async (bookingId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const paymentResponse = await fetch(
        `http://localhost:5000/payments/${bookingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      if (!paymentResponse.ok) {
        throw new Error("Failed to retrieve details");
      }

      const paymentData = await paymentResponse.json(); // Parse response to JSON
      setPaymentData(paymentData);

      const content = document.getElementById("invoice-content").innerHTML;
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [595, 842], // A4 size
      });
      doc.html(content, {
        callback: function (pdf) {
          pdf.save(`invoice_${bookingId}.pdf`);
        },
        x: 10,
        y: 10,
      });

      fetchBookings();
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  //***************************** */
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="emp-bg">
      <p>Completed Bookings</p>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Vehicle No</th>
            <th>Booked Date</th>
            <th>Booked Time In</th>
            <th>Actual Time In</th>
            <th>Time Out</th>
            <th>Slot ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.vehicle_no}</td>
              <td>{booking.booked_date}</td>
              <td>{booking.time_in}</td>
              <td>{booking.actual_time_in}</td>
              <td>{booking.actual_time_out}</td>
              <td>{booking.slot_id}</td>
              <td>{booking.customer_id}</td>
              <td>{booking.Customer.name}</td>
              <td>
                <button onClick={() => handleInvoice(booking.booking_id)}>
                  Generate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="invoice-content" style={{ display: "none" }}>
        <p className="p-inv">Invoice</p>
        <table className="inv-tbl">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Booking ID</th>
              <th>Employee ID</th>
              <th>Payment Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {paymentData && (
              <tr>
                <td>{paymentData.payment_id}</td>
                <td>{paymentData.booking_id}</td>
                <td>{paymentData.employee_id}</td>
                <td>{paymentData.payment_date}</td>
                <td>{paymentData.amount}</td>
              </tr>
            )}
          </tbody>
          <thead>
            <tr>
              <th>Vehicle Number</th>
              <th>Booked Date</th>
              <th>Booked Time In</th>
              <th>Time Out</th>
              <th>Slot</th>
            </tr>
          </thead>
          <tbody>
            {paymentData && paymentData.Booking && (
              <tr>
                <td>{paymentData.Booking.vehicle_no}</td>
                <td>{paymentData.Booking.booked_date}</td>
                <td>{paymentData.Booking.time_in}</td>
                <td>{paymentData.Booking.actual_time_out}</td>
                <td>{paymentData.Booking.slot_id}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenerateInvoice;
