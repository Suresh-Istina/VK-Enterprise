import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/AboutUs";
import HeroImage from "../components/HeroImage";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <HeroImage
        heading="Our Vision"
        text="To make truck parking seamless and stress-free through innovative technology and unwavering reliability !"
      />
      <About />
      <Footer />
    </div>
  );
};

export default AboutUs;
