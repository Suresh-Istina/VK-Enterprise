import React, { useState, useEffect } from "react";
import "./FreeSlotsStyles.css";

const FreeSlots = () => {
  // Define state variables to hold count values for each card
  const [counts, setCount] = useState({
    count1: { freeCount: 15 },
    count2: { freeCount: 15 },
  });

  useEffect(() => {
    // Fetch count for each card when component mounts
    fetchCount("count1", 20);
    fetchCount("count2", 40);
  }, []);

  const fetchCount = async (slotKey, slot_id) => {
    try {
      const response = await fetch(
        ` http://localhost:5000/slots/count/free/${slot_id}`
      );
      const data = await response.json();
      setCount((prevCount) => ({
        ...prevCount,
        [slotKey]: {
          freeCount: Math.floor(data.count),
        },
      }));
    } catch (error) {
      console.error(`Error fetching rate for ${slotKey}:`, error);
    }
  };

  return (
    <div className="free-slots">
      <div className="slot-card-container">
        <div className="card">
          <h3>- 20 Feet -</h3>
          <span className="bar"></span>

          <p className="ftc">{counts.count1.freeCount}</p>
          <p>- Free Slots -</p>
        </div>

        <div className="card">
          <h3>- 40 Feet -</h3>
          <span className="bar"></span>

          <p className="ftc">{counts.count2.freeCount}</p>
          <p>- Free Slots -</p>
        </div>
      </div>
    </div>
  );
};

export default FreeSlots;
