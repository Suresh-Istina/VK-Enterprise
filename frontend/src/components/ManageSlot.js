import React, { useState, useEffect } from "react";
import "./EmployeeHomeStyles.css";

const ManageSlot = () => {
  const [slots, setSlots] = useState([]);

  // Function to fetch slots data from the server
  const fetchSlots = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/slots", {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSlots(data);
      } else {
        console.error("Failed to fetch slots");
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  // Function to handle check-in button click
  const handleDelete = async (slotId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(` http://localhost:5000/slots/${slotId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      fetchSlots();
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  // Function to handle status change button click
  const handleChangeStatus = async (slotId, status) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(` http://localhost:5000/slots/${slotId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      fetchSlots();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div className="emp-bg">
      <p>Manage Slots</p>
      <table>
        <thead>
          <tr>
            <th>Slot ID</th>
            <th>Size</th>
            <th>Status</th>
            <th>Delete</th>
            <th>Change Status</th> {/* New column for status change */}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.slot_id}>
              <td>{slot.slot_id}</td>
              <td>{slot.size}</td>
              <td>{slot.status}</td>

              <td>
                <button
                  className="cancel-button"
                  onClick={() => handleDelete(slot.slot_id)}
                >
                  Delete Slot
                </button>
              </td>

              <td>
                <button
                  className="status-button"
                  onClick={() =>
                    handleChangeStatus(slot.slot_id, slot.status === 1 ? 0 : 1)
                  }
                >
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSlot;
