import React, { useState, useEffect } from "react";
import "./CustomerHomeStyles.css";

const EmployeeCreateBooking = () => {
  const [slotSize, setSlotSize] = useState("20");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [customer, setCustomer] = useState(""); // State for selected customer
  const [customers, setCustomers] = useState([]); // State for customers data
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchSlots(slotSize);
    fetchCustomers(); // Fetch customers data
  }, [slotSize]);

  useEffect(() => {
    if (Array.isArray(slots) && slots.length > 0) {
      setSelectedSlot(slots[0].id);
    }
  }, [slots]);

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

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:5000/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        console.error("Failed to fetch customers");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
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

  const handleCustomerChange = (event) => {
    const selectedCustomerId = event.target.value;
    setCustomer(selectedCustomerId);
    const selectedCustomer = customers.find(
      (customer) => customer.id === parseInt(selectedCustomerId)
    );
    if (selectedCustomer) {
      // Set customer name based on selected ID
      document.getElementById("customer-name").value = selectedCustomer.name;
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault();
    if (!customer) {
      setErrorMessage("Please select a customer");
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicle_no: vehicleNumber,
          customer_id: customer,
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

        <label className="cus-label">Customer</label>
        <select
          className="cus-input"
          value={customer}
          onChange={handleCustomerChange}
          required
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.id}
            </option>
          ))}
        </select>

        <label className="cus-label">Customer Name</label>
        <input
          id="customer-name" // Add an id for setting the value later
          type="text"
          className="cus-input"
          readOnly
          required
        />

        <label className="cus-label">Vehicle Number</label>
        <input
          type="text"
          className="cus-input"
          value={vehicleNumber}
          onChange={handleVehicleNumberChange}
          required
        />

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

export default EmployeeCreateBooking;
