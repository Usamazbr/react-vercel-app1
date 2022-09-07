import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from 'axios';
import "../App.css";


const apiUrl = `http://localhost:5000/api/upload`;



function Verification() {
    // const webcamRef = React.useRef(null);
    const [idimage, setImage3] = useState("");

    const [Resultb, setResultb] = useState();
    const [Result, setResult] = useState();
    const [ResultErr, setResultErr] = useState();
    const [ResultWar, setResultWar] = useState();

    useEffect(() => {
        // console.log();
    }, []);

    const Verify = (idimage) => {
        //   console.log([liveimage1,liveimage2])
        // let data = idimage;
        // const cleanerBase64 = idimage.substring(0);
        // const cleanerBase64 = idimage.slice(0, 23) + idimage.slice(24);
        // console.log(idimage)
        const body = { material: idimage };
        axios
            .post(
                apiUrl, body,
            )
            .then((res) => {
                // console.log("hello");
                setResult(res);
                setResultb(res.data.Accepted);
                setResultErr(res.data.Error);
                setResultWar(res.data.Warnings);
                setTimeout(() => {
                    console.log(Result);
                }, 3000)
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const onVerify = () => {
        // const imageSrc1 = webcamRef.current.getScreenshot();
        // setImage1(imageSrc1);
        // console.log(imageSrc1);
        setTimeout(() => {
            // const imageSrc2 = webcamRef.current.getScreenshot();
            // setImage2(imageSrc2);
            Verify(idimage);
        }, 2000);

    };

    const fileSelectHandler = e => {
        let file1 = e.target.files[0];
        console.log(file1);
        let fileread = new FileReader();
        fileread.readAsDataURL(file1)
        fileread.onload = function () {
            setImage3(fileread.result);
            // setTimeout(() => {
            //     console.log(idimage);
            // }, 4000)
        };
        // setTimeout(() => {
        //     fileread.readAsDataURL(file1);
        // }, 3000)
    }


    return (
        <div className="flex flex-col">
            <div className="mx-auto flex p-5 bg-gray-900 mt-20 rounded-lg">
                <div className="">
                    <h1 className="text-3xl font-bold text-blue-700 hover:text-white leading-tight text-center">
                        Enrollment and Verification
                    </h1>
                </div>
            </div>
            <div className="mx-auto flex flex-row bg-transparent mt-4 rounded-lg">
                <div className="webcam-container mr-4 p-2">
                    <Webcam
                        className="shadow-lg rounded-lg "
                        audio={false}
                        height={200}
                        mirrored
                        // ref={webcamRef}
                        // forceScreenshotSourceSize = {true}
                        // minScreenshotWidth={150}
                        screenshotFormat="image/jpeg"
                        width={480}
                        videoConstraints={{
                            width: 200,
                            height: 200 / (4 / 3),
                            facingMode: "user",
                        }}
                    />
                    <div className="overlay-container">
                        {/* {svgIcon()} */}
                    </div>
                </div>
                <div className="mx-auto flex flex-col p-5 bg-gray-900 mt-2 rounded-lg">
                    <div className="">
                        <p className="text-lg font-bold text-blue-700 hover:text-white leading-tight text-center">
                            Upload, Enrollment and Verification
                        </p>
                    </div>
                    <div className="mx-auto flex flex-row-reverse">
                        <div className="flex flex-col p-2 h-full w-2/5 text-center rounded-lg">
                            <div className="m-2 p-2 bg-blue-900 text-blue-200 text-center rounded-lg">
                                {ResultErr ?
                                    (<h1 className="flex flex-wrap justify-center text-base text-green-500 font-bold mx-1">No Face Detected</h1>) : (<><div className="flex flex-wrap justify-center">
                                        {Resultb ?
                                            (<><div className="flex flex-wrap justify-center text-base text-green-500 font-bold mx-1 " data-tooltip-target="tooltip-right" data-tooltip-placement="right"><div className="tooltip">Image Accepted<span className="tooltiptext">Warning: {ResultWar}</span></div></div></>) : (<><h1 className="flex flex-wrap text-center hover:underline hover:bg-red-400 hover:text-gray-900 rounded-lg">No upload</h1></>)}</div></>)}
                            </div>
                        </div>
                        <div className="flex flex-col p-2 m-auto w-3/5 rounded-lg">
                            <div className="flex flex-col ml-4 rounded-lg">
                                {/* <div className="flex flex-wrap m-1 justify-center p-2 bg-indigo-900 text-blue-200 shadow-inner hover:text-white rounded-lg">
                                    {Resultb ?
                                        (<><div className="flex flex-wrap justify-center">Accuracy is {Result ? (<h1 className="flex flex-wrap justify-center text-base text-green-500 font-bold mx-1">5</h1>) : (<h1 className="flex flex-wrap justify-center text-red-500 font-bold mx-1">0</h1>)}</div></>) : (<><h1 className="flex flex-wrap py-2 px-2 mx-2 text-center hover:underline hover:bg-red-400 hover:text-gray-900 rounded-lg">False Image</h1></>)}
                                </div> */}
                                <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex flex-wrap m-2 justify-center bg-blue-900 text-blue-200 shadow-inner hover:text-white focus:outline-none rounded-lg">
                                    <label className="text-center custom-file-upload m-4">
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            className="m-4"
                                            onChange={fileSelectHandler}
                                        // ref={fileInput => this.fileInput = fileInput} 
                                        />
                                        {/* <button onClick={() => this.fileInput.click()}>Upload Image</button> */}
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
                                    <div className="tooltip">Confirm Upload
                                        <span className="tooltiptext">Click again if Image isn't accepted</span>
                                    </div>
                                </button>
                                <button
                                    // onClick={onVerify}
                                    data-tooltip-target="tooltip-right"
                                    data-tooltip-placement="right"
                                    type="button"
                                    className="shadow-lg mt-2 transition duration-500 ease-in-out m-auto bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:-translate-y-1 hover:scale-110 focus:outline-none py-2 px-3 rounded-lg"
                                >
                                    <div className="tooltip">Enrollment
                                        <span className="tooltiptext">This will enroll the images onto the database</span>
                                    </div>
                                </button>
                                <button
                                    // onClick={onVerify}
                                    data-tooltip-target="tooltip-right"
                                    data-tooltip-placement="right"
                                    type="button"
                                    className="shadow-lg mt-2 transition duration-500 ease-in-out m-auto bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:-translate-y-1 hover:scale-110 focus:outline-none py-2 px-3 rounded-lg"
                                >
                                    <div className="tooltip">Verification
                                        <span className="tooltiptext">Verify the snap is the same person as uploaded database</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;