import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from 'axios';
// import VerifyImages from "../axios/VerifyImages";
import "../App.css";
import "../Images/Building-Pillar.png";
// import "./css/App.scss";
const apiUrl = `http://localhost:5000/api/upload`;


function PhotoVerify() {
  const webcamRef = React.useRef(null);
  const [liveimg1, setImage1] = useState("");
  const [liveimg2, setImage2] = useState("");
  const [idimage, setImage3] = useState("");

  const [Resultb, setResultb] = useState();
  const [Result, setResult] = useState();

  useEffect(() => {
    // console.log(Resultb);
  }, [Resultb]);

  const Verify1 = ({ idimage }) => {
    //   console.log([liveimage1,liveimage2])
    let data = { "dataURL": idimage }
    console.log(data)
    axios
      .post(
        apiUrl, data,
      )
      .then((res) => {
        setResultb(res.data.Success);
        setResult(res.data.AccuracyLevel);
        setTimeout(() => {
          console.log(!Resultb);
        }, 2000)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onVerify = () => {
    const imageSrc1 = webcamRef.current.getScreenshot();
    setImage1(imageSrc1);
    setTimeout(() => {
      const imageSrc2 = webcamRef.current.getScreenshot();
      setImage2(imageSrc2);
      Verify1({ liveimage1: imageSrc1, liveimage2: imageSrc2, idimage });
    }, 2000);

  };
  const svgIcon = () => (
    <svg
      width="100%"
      height="100%"
      className="svg m-auto rounded-lg"
      viewBox="0 0 260 200"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <mask id="overlay-mask" x="0" y="0" width="100%" height="100%">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
          <circle cx="50%" cy="50%" r="65" />
        </mask>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" mask="url(#overlay-mask)" fillOpacity="0.9" />
    </svg>
  );

  const fileSelectHandler = e => {
    let file1 = e.target.files[0];
    let fileread = new FileReader();
    fileread.readAsDataURL(file1)
    fileread.onload = function () {
      setImage3(fileread.result);
      setTimeout(() => {
        console.log(idimage);
      }, 2000)
    };
  }

  return (
    <div className="flex flex-col ">
      <div className="max-w-6xl mx-auto flex p-4 bg-gray-900 mt-20 rounded-lg shadow-lg">
        <div className="ml-6 pt-1">
          <h1 className="text-3xl font-bold text-blue-700 leading-tight text-center">
            About
          </h1>
          <p className="text-lg text-gray-600 leading-normal text-center">
            Please upload your ID image first then place your face at the <br /> centre of the circle and at the size of it before clicking on start
          </p>
          <div className="flex flex-row p-4 m-auto w-4/5">
            <div className="webcam-container">
              <Webcam
                className="shadow-lg rounded-lg"
                audio={false}
                height={200}
                mirrored
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={480}
                videoConstraints={{
                  width: 390,
                  height: 400 / (4 / 3),
                  facingMode: "user",
                }}
              />
              <div className="overlay-container">
                {svgIcon()}
              </div>
            </div>
            <div className="flex flex-col ml-4 rounded-lg">
              <div className="flex flex-wrap m-1 justify-center p-2 bg-indigo-900 text-blue-200 shadow-inner hover:text-white rounded-lg">
                {Resultb ?
                  (<><div className="flex flex-wrap justify-center">Accuracy is {Result ? (<h1 className="flex flex-wrap justify-center text-base text-green-500 font-bold mx-1">5</h1>) : (<h1 className="flex flex-wrap justify-center text-red-500 font-bold mx-1">0</h1>)}</div></>) : (<><h1 className="flex flex-wrap py-2 px-2 mx-2 text-center hover:underline hover:bg-red-400 hover:text-gray-900 rounded-lg">False Image</h1></>)}
              </div>
              <div className="shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none shadow-lg flex flex-wrap m-2 justify-center p-4 bg-blue-900 text-blue-200 shadow-inner hover:text-white focus:outline-none rounded-lg">
                <label className="flex flex-wrap text-center custom-file-upload">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    className=""
                    onChange={fileSelectHandler}
                  />
                  Upload Image
                </label>
              </div>
              <button
                onClick={onVerify}
                data-tooltip-target="tooltip-right"
                data-tooltip-placement="right"
                type="button"
                className="shadow-lg transition duration-500 ease-in-out m-auto bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:-translate-y-1 hover:scale-110 focus:outline-none py-2 px-3 rounded-lg"
              >
                <div className="tooltip">Start
                  <span className="tooltiptext">This will take two images with a 2 sec break<br />Try to move slighty in an arbitrary direction while remaining inside the circle before the second screenshot</span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            {liveimg1 && (
              <img
                height={150}
                width={300}
                src={liveimg1}
                className="p-1 rounded-l-lg"
                alt="imageI"
              />
            )}
            {liveimg2 && (
              <img
                height={150}
                width={300}
                src={liveimg2}
                className="p-1 rounded-r-lg"
                alt="imageI"
              />
            )}
            {idimage && (
              <div className="flex flex-col">
                <img
                  height={50}
                  width={100}
                  src={idimage}
                  className="p-1 rounded-lg"
                  alt="imageI"
                />
                <img
                  height={70}
                  width={100}
                  src={require("../Images/48045-short-pillar-clipart.png")}
                  className="h-full"
                  alt="No ImageI"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex p-6 bg-gray-900 text-blue-200 mt-10 py-6 px-6 rounded-lg shadow-lg">
        <p>
          This demo performs a liveness detection on two selfies to verify whether they were recorded from a live person.
        </p>
      </div>
    </div >
  );
}

export default PhotoVerify;
