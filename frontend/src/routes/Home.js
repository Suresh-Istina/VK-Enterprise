import React from "react";
import Navbar from "../components/Navbar";
import Video from "../components/Video";
import Footer from "../components/Footer";
import FreeSlotCards from "../components/FreeSlots";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Video />
      <FreeSlotCards />
      <Footer />
    </div>
  );
};

export default Home;
