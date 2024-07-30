import React, { useState, useEffect } from "react";
import "./EmployeeHomeStyles.css";

const Checkout = () => {
  const [bookings, setBookings] = useState([]);

  // Function to fetch bookings data from the server
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:5000/checked-in/bookings",
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
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

  // Function to handle check-in button click
  const handleCheckOut = async (bookingId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/check-out/${bookingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to check in");
      }

      fetchBookings();
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="emp-bg">
      <p>Checked In Bookings</p>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Vehicle No</th>
            <th>Booked Date</th>
            <th>Booked Time In</th>
            <th>Actual Time In</th>
            <th>Slot ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Check-Out</th>
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
              <td>{booking.slot_id}</td>
              <td>{booking.customer_id}</td>
              <td>{booking.Customer.name}</td>
              <td>
                <button onClick={() => handleCheckOut(booking.booking_id)}>
                  Check Out
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Checkout;
