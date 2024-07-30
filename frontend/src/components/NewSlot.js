import React, { useState } from "react";
import "./CustomerHomeStyles.css";

const NewSlot = () => {
  const [slotSize, setSlotSize] = useState("20");
  const [slotId, setSlotId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSlotSizeChange = (event) => {
    setSlotSize(event.target.value);
  };

  const handleSlotIdChange = (event) => {
    setSlotId(event.target.value);
  };

  const handleNewSlot = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(" http://localhost:5000/slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({
          slot_id: slotId,
          size: slotSize,
        }),
      });
      if (response.ok) {
        setSuccessMessage("New Slot Added Successfully");
        setErrorMessage("");
        window.location.reload();
      } else {
        const data = await response.json();
        setErrorMessage(data.msg);
        setSuccessMessage("");
        console.error("Failed to create slot:", data.msg);
      }
    } catch (error) {
      console.error("Error making booking:", error);
    }
  };

  return (
    <div className="customer-booking-form">
      <form className="cus-booking-form" onSubmit={handleNewSlot}>
        <p>Add New Slot</p>

        <label className="cus-label">Slot ID</label>
        <input
          type="text"
          className="cus-input"
          name="slotId"
          value={slotId}
          onChange={handleSlotIdChange}
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

        {errorMessage && <h5 className="error-message">{errorMessage}</h5>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="btn-book">
          Create Slot
        </button>
      </form>
    </div>
  );
};

export default NewSlot;
