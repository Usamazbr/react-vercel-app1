import React from "react";
import "../App.css";
import videoBg from "../Images/BG-84-1080p.mp4";

const Home = () => {
  return (
    <div className="main">
      <video src={videoBg} autoPlay loop muted />
      <div className="content">
        <div className="flex flex-col ml-40">
          <div className="flex flex-col max-w-6xl mx-auto p-6 bg-gray-900 text-blue-200 mt-20 py-6 px-6 rounded-lg">
            <h1 className="text-3xl font-bold text-blue-700 leading-tight text-center">
              Welcome
            </h1>
            <p className="mt-2">
              This demo performs a liveness detection, PhotoVerification and <br /> Upload/Enrollment/Verification of a live user.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;