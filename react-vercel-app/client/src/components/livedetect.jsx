import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from 'axios';
// import VerifyImages from "../axios/VerifyImages";
import "../App.css";
// import "./css/App.scss";
const apiUrl = `http://localhost:5000/api/lived`;


function Livedetect() {
    const webcamRef = React.useRef(null);
    const [liveimg1, setImage1] = useState("");
    const [liveimg2, setImage2] = useState("");
    const [Resultb, setResultb] = useState();
    const [Result, setResult] = useState();

    useEffect(() => {

        console.log(Resultb);
    }, [Resultb]);

    const Verify1 = ({ liveimage1, liveimage2 }) => {
        //   console.log([liveimage1,liveimage2])
        let data = { "liveimage1": liveimage1, "liveimage2": liveimage2 }
        axios
            .post(
                apiUrl, data,
            )
            .then((res) => {
                setResultb(res.data);
                setResult(res);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onVerify = () => {
        const imageSrc1 = webcamRef.current.getScreenshot();
        setImage1(imageSrc1);
        // console.log(imageSrc1);
        setTimeout(() => {
            const imageSrc2 = webcamRef.current.getScreenshot();
            setImage2(imageSrc2);
            Verify1({ liveimage1: imageSrc1, liveimage2: imageSrc2 });
        }, 2000);

    };
    const svgIcon = () => (
        <svg
            width="100%"
            height="100%"
            className="svg mx-auto rounded-lg"
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

    return (
        <div className="flex flex-col ">
            <div className="max-w-6xl mx-auto flex p-4 bg-gray-900 mt-20 rounded-lg shadow-lg">
                <div className="pt-1">
                    <h1 className="text-3xl font-bold text-blue-700 leading-tight text-center">
                        Livedetect
                    </h1>
                    <p className="mb-2 text-xl text-gray-600 leading-normal text-center">
                        Please place your face at the centre of the circle and at the size of it
                    </p>
                    <div className="flex flex-row">
                        <div className="flex flex-row m-auto">
                            <div className="webcam-container m-1">
                                <Webcam
                                    className="shadow-lg rounded-lg"
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
                            <div className="flex flex-col p-4 rounded-lg">
                                <div className="flex flex-wrap m-2 justify-center p-4 bg-indigo-900 text-blue-200 shadow-inner hover:text-white rounded-lg">
                                    {Result ?
                                        (<><div className="flex flex-col justify-center">Result is {Resultb ? (<h1 className="flex flex-wrap justify-center text-base text-green-500 font-bold mx-1"> live</h1>) : (<h1 className="flex flex-wrap justify-center text-red-500 font-bold mx-1">fake</h1>)}</div></>) : (<><h1 className="flex flex-wrap py-2 px-3 text-center hover:underline hover:bg-red-400 hover:text-gray-900 rounded-lg">No data</h1></>)}
                                </div>
                                <button
                                    onClick={onVerify}
                                    className="shadow-lg transition duration-500 ease-in-out m-auto bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:-translate-y-1 hover:scale-110 focus:outline-none py-2 px-3 rounded-lg"
                                >
                                    <div className="tooltip">Start
                                        <span className="tooltiptext">This will take two images with a 2 sec break<br />Try to move slighty in an arbitrary direction while remaining inside the circle before the second screenshot</span>
                                    </div>
                                </button>
                                {/* <button data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button" className="mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tooltip right</button>
                                <div id="tooltip-right" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Tooltip on right
                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            {liveimg1 && (
                                <img
                                    height={150}
                                    width={300}
                                    src={liveimg1}
                                    className="p-1 rounded-t-lg"
                                    alt="imageI"
                                />
                            )}
                            {liveimg2 && (
                                <img
                                    height={150}
                                    width={300}
                                    src={liveimg2}
                                    className="p-1 rounded-b-lg"
                                    alt="imageI"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-wrap mx-auto mt-3 bg-gray-900 text-blue-200 py-2 px-2 rounded-lg"> */}
            {/* <div className="flex flex-wrap mx-auto mb-3 bg-gray-900 py-2 px-12 rounded-lg"> */}
            {/* <button
                onClick={onVerify}
                className="transition duration-500 ease-in-out mt-3 bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:-translate-y-1 hover:scale-110 py-2 px-3 rounded-lg mx-auto"
            >
                Try To see if User is Real */}
            {/* </button> */}
            {/* </div> */}
            {/* <div className="flex flex-auto mx-auto mb-2 justify-center p-2 bg-indigo-900 text-blue-200 hover:text-white mt-3 py-2 px-3 rounded-lg">
                    {Result ?
                        (<><div>Result is {Resultb ? (<h1 className="flex flex-wrap justify-center text-green-500 font-bold">live</h1>) : (<h1 className="flex flex-wrap justify-center text-red-500 font-bold">fake</h1>)}</div></>) : (<><h1 className="flex flex-wrap justify-center pt-2">No data</h1></>)}
                </div> */}
            {/* </div> */}
            <div className="max-w-6xl mx-auto flex p-6 bg-gray-900 text-blue-200 mt-5 py-6 px-6 rounded-lg shadow-lg">
                <p>
                    This demo performs a liveness detection on two selfies to verify whether they were recorded from a live person.
                </p>
            </div>
        </div>
    );
}

export default Livedetect;
