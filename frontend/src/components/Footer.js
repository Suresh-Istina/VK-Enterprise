import React from "react";
import "./FooterStyles.css";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaMailBulk,
  FaPhone,
  FaSearchLocation,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="left">
          <h2 style={{ alignItems: "center" }}>Find Us</h2>
          <div className="location">
            <h4>
              <FaSearchLocation
                size={20}
                style={{
                  color: "#ffffff",
                  marginRight: "2rem",
                  marginTop: "1.5rem",
                }}
              />
              64/20, Hekiththa Road, Wattala.
            </h4>
          </div>
          <div className="phone">
            <h4>
              {" "}
              <FaPhone
                size={20}
                style={{ color: "#ffffff", marginRight: "2rem" }}
              />
              0112436891 / 0777323796
            </h4>
          </div>
          <div className="email">
            <h4>
              {" "}
              <FaMailBulk
                size={20}
                style={{ color: "#ffffff", marginRight: "2rem" }}
              />
              vk_enterprise@gmail.com
            </h4>
          </div>
        </div>
        <div className="right">
          <h2>Follow Us</h2>

          <div className="social">
            <FaFacebook
              size={35}
              style={{
                color: "#ffffff",
                marginRight: "1rem",
                marginTop: "1.5rem",
                marginLeft: "1rem",
              }}
            />
            <FaInstagram
              size={35}
              style={{
                color: "#ffffff",
                marginRight: "1rem",
                marginTop: "1rem",
              }}
            />
            <FaLinkedin
              size={35}
              style={{
                color: "#ffffff",
                marginRight: "1rem",
                marginTop: "1rem",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
