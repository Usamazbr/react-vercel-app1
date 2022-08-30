import React, { useState } from "react";
import Webcam from "react-webcam";
// import axios from 'axios';
import verifyImages from "../axios/verifyImages";
import "../App.css";
// import "./css/App.scss";

const svgIcon = () => (
    <svg
        width="100%"
        height="100%"
        className="svg mx-auto "
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

function App2() {
    const webcamRef = React.useRef(null);
    const [liveimg1, setImage1] = useState("");
    const [liveimg2, setImage2] = useState("");
    const [resultbool, setResult] = useState("");

    const onVerify = () => {
        const imageSrc1 = webcamRef.current.getScreenshot();
        // let result1 = false;
        setImage1(imageSrc1);
        // console.log(imageSrc1);
        setTimeout(() => {
            const imageSrc2 = webcamRef.current.getScreenshot();
            setImage2(imageSrc2);
            verifyImages({ liveimage1: imageSrc1, liveimage2: imageSrc2 });
            // result1 = verifyImages;
        }, 2000);
        // setTimeout(() => {
        //     console.log(result1);
        // }, 3000)
        // return verifyImages;
    };
    // console.log([liveimg1,liveimg2]);
    // console.log(onVerify);
    //   console.log([liveimage1,liveimage2]);

    return (
        <div className="flex flex-col ">
            <div className="max-w-6xl mx-auto flex p-6 bg-gray-900 mt-10 rounded-lg">
                <div className="ml-6 pt-1">
                    <h1 className="text-3xl font-bold text-blue-700 leading-tight text-center">
                        Bioid Ware
                    </h1>
                    {/* <p className="mb-6 text-xl text-gray-600 leading-normal text-center">
            This demo detects if a person is real or fake using Bio ID API
          </p> */}
                    <div className="p-2 mx-auto w-4/5">
                        <div className="webcam-container ">
                            <Webcam
                                className=""
                                audio={false}
                                height={200}
                                mirrored
                                ref={webcamRef}
                                // forceScreenshotSourceSize = {true}
                                // minScreenshotWidth={150}
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
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {liveimg1 && (
                            <img
                                height={150}
                                width={300}
                                src={liveimg1}
                                className="p-1 bg-gray-900 border rounded-lg"
                                alt="imageI"
                            />
                        )}
                        {liveimg2 && (
                            <img
                                height={150}
                                width={300}
                                src={liveimg2}
                                className="p-1 bg-gray-900 border rounded-lg"
                                alt="imageI"
                            />
                        )}
                    </div>
                </div>
            </div>
            <button
                onClick={onVerify}
                className="transition duration-500 ease-in-out mt-3 bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:-translate-y-1 hover:scale-110 py-2 px-8 rounded-lg mx-auto"
            >
                Try To see if User is Real
            </button>
            <div className="max-w-6xl mx-auto flex p-6 bg-gray-900 text-blue-200 mt-10 py-6 px-6 rounded-lg">
                <p>
                    This demo performs a liveness detection on two selfies to verify whether they were recorded from a live person.
                </p>
            </div>
        </div>
    );
}

export default App2;
