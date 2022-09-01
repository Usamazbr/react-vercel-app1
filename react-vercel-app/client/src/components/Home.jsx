import React from "react";
import "../App.css";

const Home = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col max-w-6xl mx-auto flex p-6 bg-gray-900 text-blue-200 mt-20 py-6 px-6 rounded-lg">
        <h1 className="text-3xl font-bold text-blue-700 leading-tight text-center">
          Welcome
        </h1>
        <p className="mt-2">
          This demo performs a liveness detection, PhotoVerification and Upload/Verify of a live user.
        </p>
      </div>
    </div>
  );
};

export default Home;