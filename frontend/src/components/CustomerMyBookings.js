import React, { useState, useEffect } from "react";
import "./CustomerMyBookingsStyles.css";

const CustomerMyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/bookings/customer", {
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

  // Function to determine card color based on booking status
  const getCardColor = (booking) => {
    // Assuming there's a property called status in booking object
    switch (booking.status) {
      case "Complete":
        return "card-complete";
      case "Booked":
        return "card-booked";
      case "Cancelled":
        return "card-cancelled";
      case "Checked In":
        return "card-in";
      default:
        return ""; // Default color
    }
  };

  return (
    <div className="my-booking-cards">
      <div className="my-card-container">
        {bookings.map((booking) => (
          <div
            className={`my-card ${getCardColor(booking)}`}
            key={booking.booking_id}
          >
            <h3>Booking Number: {booking.booking_id}</h3>
            <p> {booking.booked_date}</p>
            <p>{booking.status}</p>

            <p> {booking.vehicle_no}</p>
            <p>Slot {booking.slot_id}</p>
            <p>In: {booking.time_in}</p>
            <p>Out: {booking.actual_time_out}</p>

            <p>Payment: {booking.Payment ? booking.Payment.amount : "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerMyBookings;
