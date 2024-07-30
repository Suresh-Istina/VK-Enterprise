import React from "react";
import "./AboutUsStyles.css";
import aboutVideo from "../assets/YT.mp4";

const AboutUs = () => {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-left">
          <video
            controls
            id="YTvideo"
            style={{ width: "100%", height: "auto" }}
          >
            <source src={aboutVideo} type="video/mp4" />
          </video>
        </div>
        <div className="about-right">
          <h1>About Us</h1>
          <p>
            Welcome to VK Enterprise! We're your one-stop solution for
            hassle-free truck parking. Our platform offers easy pre-booking with
            real-time updates, ensuring you find safe and secure parking spaces
            whenever you need them. Join thousands of satisfied drivers and
            fleet managers who trust us for reliable parking solutions.
            Experience convenience on the road with us !
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
