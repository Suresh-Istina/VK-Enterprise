import React, { useState, useEffect } from "react";
import "./EmployeeHomeStyles.css";

const Cancelled = () => {
  const [bookings, setBookings] = useState([]);

  // Function to fetch bookings data from the server
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/cancelled/bookings", {
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

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="emp-bg">
      <p>Cancelled Bookings</p>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Vehicle No</th>
            <th>Booked Date</th>
            <th>Booked Time In</th>
            <th>Cancelled Time</th>
            <th>Slot ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.vehicle_no}</td>
              <td>{booking.booked_date}</td>
              <td>{booking.time_in}</td>
              <td>{booking.actual_time_out}</td>
              <td>{booking.slot_id}</td>
              <td>{booking.customer_id}</td>
              <td>{booking.Customer.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cancelled;
