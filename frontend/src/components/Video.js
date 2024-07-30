import React from "react";
import "./VideoStyles.css";
import truckVideo from "../assets/video.mp4";
import { Link } from "react-router-dom";

const Video = () => {
  return (
    <div className="hero">
      <video autoPlay loop muted id="video">
        <source src={truckVideo} type="video/mp4" />
      </video>
      <div className="content">
        <h1>Stress-Free Parking: Pre-Book with Ease!</h1>
        <p>
          Park your trucks hassle free . Save fuel and protect the environment.
        </p>

        <div>
          <Link to="/login" className="btn btn-light ">
            Book Now{" "}
          </Link>
          <Link to="/signup" className="btn ">
            Sign Up{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Video;
