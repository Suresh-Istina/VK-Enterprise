import React, { useState, useEffect } from "react";
import "./EmployeeHomeStyles.css";

const UpdateRates = () => {
  const [rates, setRates] = useState([]);
  const [selectedRateId, setSelectedRateId] = useState("");
  const [perHour, setPerHour] = useState("");
  const [perDay, setPerDay] = useState("");

  useEffect(() => {
    // Fetch rates from the API endpoint
    fetch("http://localhost:5000/rates")
      .then((response) => response.json())
      .then((data) => {
        setRates(data);
        // Select the first rate by default
        if (data.length > 0) {
          setSelectedRateId(data[0].rate_id);
          setPerHour(data[0].per_hour);
          setPerDay(data[0].per_day);
        }
      })
      .catch((error) => console.error("Error fetching rates:", error));
  }, []);

  const handleRateChange = (event) => {
    const selectedId = event.target.value;
    const selectedRate = rates.find((rate) => rate.rate_id === selectedId);
    setSelectedRateId(selectedId);
    setPerHour(selectedRate.per_hour);
    setPerDay(selectedRate.per_day);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    // Prepare data for PATCH request
    const data = {
      per_hour: perHour,
      per_day: perDay,
    };

    const token = localStorage.getItem("accessToken");
    fetch(`http://localhost:5000/rates/${selectedRateId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Updated Rates Successfully"); // Display success message
          window.location.reload();
        } else {
          alert("Failed to update rate.");
        }
      })
      .catch((error) => alert("Error updating rate:", error));
  };

  return (
    <div className="customer-booking-form">
      <form className="cus-booking-form" onSubmit={handleUpdate}>
        <p>Update Rate</p>

        <label className="cus-label">Truck Size</label>
        <select
          className="cus-input"
          value={selectedRateId}
          onChange={handleRateChange}
          required
        >
          {rates.map((rate) => (
            <option key={rate.rate_id} value={rate.rate_id}>
              {rate.rate_id}
            </option>
          ))}
        </select>

        <label className="cus-label">Per Hour</label>
        <input
          type="text"
          className="cus-input"
          value={perHour}
          onChange={(e) => setPerHour(e.target.value)}
          required
        />

        <label className="cus-label">Per Day</label>
        <input
          type="text"
          className="cus-input"
          value={perDay}
          onChange={(e) => setPerDay(e.target.value)}
          required
        />

        <button type="submit" className="btn-book">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateRates;
