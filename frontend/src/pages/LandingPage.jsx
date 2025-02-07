import React from "react";
import home from "../assets/home.jpg"

export default function LandingPage() {
  return (
    <>
      <div className="landing-image">
        <img src={home} alt="home" />
      </div>
    </>
  );
}
