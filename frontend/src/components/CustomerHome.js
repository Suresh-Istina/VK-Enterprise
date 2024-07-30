import React, { useState, useEffect } from "react";
import "./CustomerHomeStyles.css";

const CustomerHome = () => {
  const [slotSize, setSlotSize] = useState("20");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [timeOptions, setTimeOptions] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [timeIn, setTimeIn] = useState(""); // Initialize with an empty string
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchSlots(slotSize);
  }, [slotSize]);

  useEffect(() => {
    if (Array.isArray(slots) && slots.length > 0) {
      setSelectedSlot(slots[0].id);
    }
  }, [slots]);

  useEffect(() => {
    fetchTimeOptions();
  }, []);

  useEffect(() => {
    // Set the initial value of timeIn from timeOptions
    if (Array.isArray(timeOptions) && timeOptions.length > 0) {
      setTimeIn(timeOptions[0]); // Set the first value as default
    }
  }, [timeOptions]);

  const fetchSlots = async (size) => {
    try {
      const response = await fetch(`http://localhost:5000/slots/free/${size}`);
      if (response.ok) {
        const data = await response.json();
        const formattedSlots = data.map((slot) => ({
          id: slot.slot_id,
          name: slot.slot_id,
        }));
        setSlots(formattedSlots);
      } else {
        console.error("Failed to fetch slots");
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const fetchTimeOptions = async () => {
    try {
      const response = await fetch("http://localhost:5000/time-options");
      if (response.ok) {
        const data = await response.json();
        setTimeOptions(data);
      } else {
        console.error("Failed to fetch time options");
      }
    } catch (error) {
      console.error("Error fetching time options:", error);
    }
  };

  const handleSlotSizeChange = (event) => {
    setSlotSize(event.target.value);
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleVehicleNumberChange = (event) => {
    setVehicleNumber(event.target.value);
  };

  const handleTimeInChange = (event) => {
    setTimeIn(event.target.value);
  };

  const handleBooking = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/bookings/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicle_no: vehicleNumber,
          time_in: timeIn,
          slot_id: selectedSlot,
        }),
      });
      if (response.ok) {
        setSuccessMessage("Booking successful");
        setErrorMessage("");

        window.location.reload();
      } else {
        const data = await response.json();
        setErrorMessage(data.msg);
        setSuccessMessage("");
        console.error("Failed to make booking:", data.msg);
      }
    } catch (error) {
      console.error("Error making booking:", error);
    }
  };

  return (
    <div className="customer-booking-form">
      <form className="cus-booking-form" onSubmit={handleBooking}>
        <p>New Booking</p>

        <label className="cus-label">Vehicle Number</label>
        <input
          type="text"
          className="cus-input"
          value={vehicleNumber}
          onChange={handleVehicleNumberChange}
          required
        />

        <label className="cus-label">Time In</label>
        <select
          className="cus-input"
          value={timeIn}
          onChange={handleTimeInChange}
        >
          {timeOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <label className="cus-label">Slot Size</label>
        <div className="radio-container">
          <input
            type="radio"
            id="20"
            name="slotSize"
            value="20"
            checked={slotSize === "20"}
            onChange={handleSlotSizeChange}
          />
          <label htmlFor="20" className="cus-radio">
            20 Feet
          </label>

          <input
            type="radio"
            id="40"
            name="slotSize"
            value="40"
            checked={slotSize === "40"}
            onChange={handleSlotSizeChange}
            className="radio-type"
          />
          <label htmlFor="40" className="cus-radio">
            40 Feet
          </label>
        </div>

        <label className="cus-label">Slot</label>
        <select
          className="cus-input"
          value={selectedSlot}
          onChange={handleSlotChange}
        >
          {slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.name}
            </option>
          ))}
        </select>

        {errorMessage && <h5 className="error-message">{errorMessage}</h5>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="btn-book">
          Book Slot
        </button>
      </form>
    </div>
  );
};

export default CustomerHome;
