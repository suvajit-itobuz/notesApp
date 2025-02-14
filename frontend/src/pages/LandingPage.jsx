import React from "react";
import home from "../assets/home.jpeg";

export default function LandingPage() {
  return (
    <>
      <div
        className="w-full h-[90vh] flex justify-center items-center bg-contain bg-center bg-no-repeat overflow-hidden bg-[#F8F5EE]"
      >
        <h1 className="text-blue-500 text-8xl font-bold w-[48vw]  m-10">
          Think freely, Note Seamlessly!!
        </h1>
        <div>
          <img src={home} alt="" />
        </div>
      </div>
    </>
  );
}
