import React, { useState, useEffect } from "react";
import "./PricingStyles.css";
import { Link } from "react-router-dom";

const Pricing = () => {
  // Define state variables to hold rate values for each card
  const [rates, setRates] = useState({
    rate1: { perHour: 350, perDay: 950 }, // Default rates for card 1
    rate2: { perHour: 450, perDay: 1000 }, // Default rates for card 2
  });

  useEffect(() => {
    // Fetch rate for each card when component mounts
    fetchRate("rate1", 20);
    fetchRate("rate2", 40);
  }, []);

  const fetchRate = async (rateKey, rateId) => {
    try {
      const response = await fetch(`http://localhost:5000/rates/${rateId}`);
      const data = await response.json();
      setRates((prevRates) => ({
        ...prevRates,
        [rateKey]: {
          perHour: Math.floor(data.per_hour),
          perDay: Math.floor(data.per_day),
        },
      }));
    } catch (error) {
      console.error(`Error fetching rate for ${rateKey}:`, error);
    }
  };

  return (
    <div className="pricing">
      <div className="card-container">
        <div className="card">
          <h3>- 20 Feet -</h3>
          <span className="bar"></span>
          <p>- More than 5 hours -</p>
          <p className="btc">Rs.{rates.rate1.perDay}</p>
          <p>- Per Day -</p>

          <Link to="/login" className="btn">
            Book Now{" "}
          </Link>
        </div>

        <div className="card">
          <h3>- 20 Feet -</h3>
          <span className="bar"></span>
          <p>- Less than 5 hours -</p>
          <p className="btc">Rs.{rates.rate1.perHour}</p>
          <p>- Per Hour -</p>

          <Link to="/login" className="btn">
            Book Now{" "}
          </Link>
        </div>

        <div className="card">
          <h3>- 40 Feet -</h3>
          <span className="bar"></span>
          <p>- More than 5 hours -</p>
          <p className="btc">Rs.{rates.rate2.perDay}</p>
          <p>- Per Day -</p>

          <Link to="/login" className="btn">
            Book Now{" "}
          </Link>
        </div>

        <div className="card">
          <h3>- 40 Feet -</h3>
          <span className="bar"></span>
          <p>- Less than 5 hours -</p>
          <p className="btc">Rs.{rates.rate2.perHour}</p>
          <p>- Per Hour -</p>

          <Link to="/login" className="btn">
            Book Now{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
