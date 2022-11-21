import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from 'axios';
import "../App.css";
import TodoForm from './TodoForm';
import Todo from './Todo';


const apiUrl = `http://localhost:5000/api/`;
// const apiUrl1 = `http://localhost:5000/api/upload`;
// const apiUrl2 = `http://localhost:5000/api/enroll`;
// const apiUrl3 = `http://localhost:5000/api/delete`;

let tempId = [{
    id1: null,
    value: ''
}]


function Verification() {
    // const webcamRef = React.useRef(null);
    const [idimage, setImage3] = useState("");
    const [bcId, setBcid] = useState("");

    const [Resultb, setResultb] = useState();
    // const [Result, setResult] = useState();
    const [ResultErr, setResultErr] = useState();
    const [ResultWar, setResultWar] = useState();
    // const [Termin, setTermin] = useState(0);
    const [Enable, setEnable] = useState(false);

    const [AeSwtich, setAeSwtich] = useState(false);
    const [EmSwtich, setEmSwtich] = useState(false);
    // const [ResultEb, setResultEb] = useState(false);
    // const [ResultEerr, setResultEerr] = useState(false);

    const [ResultE, setResultE] = useState();
    const [ResultV, setResultV] = useState();
    const [ResultVr, setResultVr] = useState();

    const [Filename, setFilename] = useState();

    const [todos, setTodos] = useState([]);

    const [valID, setValID] = useState();
    const [locID, setLoc] = useState(0);

    let T = 0;

    // let tempId = [{
    //     id1: null,
    //     value: ''
    // }]
    // const [tempId, setTempId] = useState({
    //     id1: null,
    //     value: ''
    // });

    useEffect(() => {
        // console.log();
    }, []);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log(...todos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removedArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const Delete1 = () => {
        let id = 'bws/12001/1';
        const body = { class_id: id };

        axios
            .post(
                apiUrl + 'delete', body,
            )
            .then((res) => {
                console.log("result returned");
                // setResultE(res);
                console.log(res.status);
                // setResultb(res.data.Accepted);
                // setResultErr(res.data.Error);
                // setResultWar(res.data.Warnings);
                // setTimeout(() => {
                //     console.log(Resultb);
                // }, 3000)
            })
            .catch((err) => {
                console.log(err.response.data.status1 + ': ' + err.response.data.errormsg);
            });
    }

    const Enroll = () => {
        const body = { biov_id: bcId };

        if (bcId !== "") {
            axios
                .post(
                    apiUrl + 'enroll', body,
                )
                .then((res) => {
                    console.log("result returned");
                    setResultE(res.data.Success);
                    console.log(ResultE);
                    console.log(res.data.Success);
                    console.log(res.data.Error);
                    // setResultEb(res.data.Success);
                    // setResultEerr(res.data.Error);
                    // setResultWar(res.data.Warnings);
                    // setTimeout(() => {
                    //     console.log(Resultb);
                    // }, 3000)
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        else {
            alert("Please Upload a User first");
        }
    }
    const onVerify = () => {
        const body = { biov_id: bcId };

        if (bcId !== "") {
            axios
                .post(
                    apiUrl + 'verify', body,
                )
                .then((res) => {
                    console.log("result returned");
                    setResultV(res);
                    setResultVr(res.data.Success);
                    console.log(res);
                    console.log(ResultV);
                    console.log(res.data.Success);
                    console.log(res.data.Error);
                    // setResultb(res.data.Accepted);
                    // setResultErr(res.data.Error);
                    // setResultWar(res.data.Warnings);
                    // setTimeout(() => {
                    //     console.log(Resultb);
                    // }, 3000)
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        else {
            alert("Please Upload a User first");
        }
    }


    const enrollMode = () => {
        var checkBox = document.getElementById("em_check");

        if (checkBox.checked === true) {
            setEmSwtich(true);
            console.log(EmSwtich);
        } else {
            setEmSwtich(false);
            console.log(EmSwtich);
        }
    };

    const Uploader = () => {
        // const cleanerBase64 = idimage.substring(0);
        // const cleanerBase64 = idimage.slice(0, 23) + idimage.slice(24);
        // console.log(idimage)
        // let valID = "";
        const vID = findSelected();
        console.log(vID);
        let bcId1 = bcId;
        if (vID !== "") {
            if (tempId.length >= 1) {
                if (vID !== valID) {
                    setValID(vID);
                    console.log(valID);
                    console.log(vID);
                    // let loc = 0;
                    let bol = false;
                    console.log(tempId.length);
                    for (let i = 0; i < tempId.length; i++) {
                        console.log(i);
                        console.log(bol);
                        if (tempId[i].id1 === vID) {
                            bol = true;
                            bcId1 = tempId[i].value;
                            console.log(bol);
                        }
                        // else{bcId1 = "";}
                        // loc++;
                        setLoc(i);
                    }
                    if (bol === false) { bcId1 = ""; console.log(bcId1) }
                }
            }

            const body = { material: idimage, bcidt: bcId1, autoen: AeSwtich, en_mode: EmSwtich };
            axios
                .post(
                    apiUrl + 'upload', body,
                )
                .then((res) => {
                    // console.log("hello");
                    // setResult(res.data);
                    setResultb(res.data.Accepted);
                    setResultErr(res.data.Error);
                    setResultWar(res.data.Warnings);
                    setTimeout(() => {
                        console.log(Resultb);
                        setValID(vID);
                        // setTempId({ id1: valID, value: res.data.tokenr })
                        // setTempId([...tempId, { id1: valID, value: res.data.tokenr }])
                        setBcid(res.data.tokenr);
                        // let loc = 0;
                        let bol = false;
                        console.log(tempId.length);
                        for (let i = 0; i < tempId.length; i++) {
                            console.log(i);
                            // loc++;
                            if (tempId[i].id1 === vID) {
                                bol = true;
                                setLoc(i);
                                console.log(bol);
                            }
                        }
                        if (bol === false) { setLoc(tempId.length); tempId.push({ id1: vID, value: res.data.tokenr }); console.log("New User added") }
                    }, 3000)
                })
                .catch((err) => {
                    const status = err.response.data.status1;
                    console.log("Error Status: " + status);
                    T++;
                    console.log("Term Error: " + T);
                    // setTermin(T);
                    if (T < 4 && status === 401) {
                        Uploader();
                    }
                });
        }
        else {
            alert("Please select a user");
        }
    }

    const findSelected = () => {
        // const option = document.getElementById('input[name = "user"]:checked').value
        let el = document.forms[0];
        // console.log(el);
        // console.log(option);
        let txt = "";
        let i;

        for (i = 0; i < el.length; i++) {
            if (el[i].checked) {
                txt = txt + el[i].value + "";
            }
        }
        // console.log(txt);
        // setTempId(txt);
        return txt;
        // console.log(tempId);
    }

    const fileSelectHandler = e => {
        let file1 = e.target.files[0];
        // getFileData(file1);
        setResultb("");
        setResultErr("");
        // setTermin(0);
        // if (file1.name !== undefined){}
        setFilename(file1.name);
        console.log(file1.name);
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

    const stopcam = () => {
        var checkBox = document.getElementById("myCheck");

        if (checkBox.checked === true) {
            setEnable(true);
            console.log(Enable);
        } else {
            setEnable(false);
            console.log(Enable);
        }
    };

    const autoEnroll = () => {
        var checkBox = document.getElementById("ae_check");

        if (checkBox.checked === true) {
            setAeSwtich(true);
            console.log(AeSwtich);
        } else {
            setAeSwtich(false);
            console.log(AeSwtich);
        }
    };

    // Test Buttons
    const testButton = () => {
        console.log(tempId.length);
        for (let i = 0; i < tempId.length; i++) {
            console.log(tempId[i].id1);
            console.log(tempId[i].value);
        }
        console.log(tempId);
        // console.log(tempId[locID].id1);
    }
    const testButton2 = () => {
        console.log(bcId);
    }
    const testButton3 = () => {
        console.log(locID);
    }
    const testButton4 = () => {
        console.log(ResultE);
    }


    return (
        <div className="flex flex-row-reverse p-2 mt-20 mx-auto">
            <div className="flex flex-col bg-gray-800 w-56 mx-auto ml-2 rounded-lg">
                <div className="mx-auto p-5 rounded-lg">
                    <h1 className="text-3xl font-bold text-blue-700 hover:text-white leading-tight text-center">
                        Data
                    </h1>
                </div>
                {/* Todo List */}
                <form className="bg-gray-800 m-4 text-white rounded-lg">
                    <>
                        <h1>List Users</h1>
                        <TodoForm onSubmit={addTodo} />
                        <Todo
                            todos={todos}
                            completeTodo={completeTodo}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo}
                        />
                    </>
                </form>
            </div>
            <div className="flex flex-col mx-10 rounded-lg">
                <div className="mx-auto flex p-3 bg-cyan-500 shadow-md shadow-cyan-500/50 rounded-lg">
                    <div className="">
                        <h1 className="text-3xl font-bold text-white hover:text-zinc-800 leading-tight text-center">
                            Verification
                        </h1>
                    </div>
                </div>
                <div className="mx-auto flex flex-row object-left bg-transparent mt-4 rounded-lg">
                    {/* Camera */}
                    <div className="w-48 mr-4">
                        <div className="webcam-container shadow-md shadow-cyan-500/50 mr-2 h-72 w-full rounded-lg">
                            {Enable ?
                                (<><Webcam
                                    className="shadow h-full shadow-gray-900 rounded-lg "
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
                                    </div></>) : (<></>)
                            }
                        </div>
                        <div className="flex flex-row">
                            <label className="switch ml-4 mt-4 w-1/4">
                                <input type="checkbox" id="myCheck" onClick={stopcam} />
                                <span className="slider round"></span>
                            </label>
                            <div className="flex flex-col ml-5 mt-2">
                                <button
                                    onClick={testButton}
                                    type="button"
                                    className="shadow-lg transition duration-500 ease-in-out m-auto bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:scale-110 focus:outline-none rounded-lg"
                                >tempId</button>
                                <button
                                    onClick={testButton2}
                                    type="button"
                                    className="shadow-lg transition duration-500 ease-in-out m-auto bg-green-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:scale-110 focus:outline-none rounded-lg"
                                >bcId</button>
                                <button
                                    onClick={testButton3}
                                    type="button"
                                    className="shadow-lg transition duration-500 ease-in-out m-auto bg-red-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:scale-110 focus:outline-none rounded-lg"
                                >locID</button>
                                <button
                                    onClick={testButton4}
                                    type="button"
                                    className="shadow-lg transition duration-500 ease-in-out m-auto bg-amber-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:scale-110 focus:outline-none rounded-lg"
                                >ResultE</button>
                                {/* </div>
                            <div className="m-2">
                            </div>
                            <div className="m-2"> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-5 h-full w-96 bg-gray-800 shadow-md shadow-gray-800/50 rounded-lg">
                        <div className="">
                            <p className="text-lg font-bold text-blue-700 leading-tight text-center">
                                Upload, Enrollment and Verification
                            </p>
                        </div>
                        <div className="mx-auto flex flex-row-reverse">
                            {/* Result Board */}
                            <div className="flex flex-col p-2 h-full w-36 text-center rounded-lg">
                                <div className="my-2 p-2 bg-blue-600 shadow-inner shadow-blue-600/50 text-blue-200 text-center rounded-xl">
                                    {/* {Filename} */}
                                    <>{Filename ? ((Filename.length < 20) ? (<p>{Filename}</p>) : (<p>{Filename.substring(0, 11) + "..."}<br />{"..." + Filename.substring((Filename.length - 11), Filename.length)}</p>)) : (<p>File name</p>)}</>
                                </div>
                                <div className="my-2 bg-transparent rounded-xl">
                                    {ResultErr ?
                                        (<h1 className="p-2  bg-blue-500 text-base text-red-500 font-bold rounded-lg">{ResultErr.replace(/([a-z])([A-Z])/g, '$1 $2')}</h1>) : (<><div className="">
                                            {Resultb ?
                                                (<><div className="p-2 text-base bg-blue-800 text-lime-500 font-bold rounded-lg" data-tooltip-target="tooltip-right" data-tooltip-placement="right"><div className="tooltip">Image Accepted
                                                    {ResultWar[0] ?
                                                        (<span className="tooltiptext4">Warning: {ResultWar.map(ResultWar => (<p>{ResultWar.replace(/([a-z])([A-Z])/g, '$1 $2')} <br /></p>))}</span>) : (<span className="tooltiptext4">No Warnings {":)"}</span>)}</div></div></>
                                                ) : (
                                                    <><h1 className="p-2 text-center bg-blue-500 hover:underline hover:bg-red-400 hover:text-gray-900 rounded-lg">No upload
                                                    </h1></>)}
                                        </div></>)}
                                </div>
                                <div className="my-2 p-2 bg-blue-800 text-blue-200 text-center rounded-xl">
                                    {Resultb ?
                                        (<>{tempId[locID]?.id1}
                                            {/* <br />{tempId[locID]?.value.substring(0, 11) + "..."} */}
                                            {/* <br />{"..." + tempId[locID]?.value.substring((tempId[locID]?.value.length - 11), tempId[locID]?.value.length)} */}
                                        </>
                                        ) : (
                                            // <>{tempId[tempId.length - 1].id1}<br />{tempId[tempId.length - 1].value.substring(0, 11) + "..."}<br />{"..." + tempId[tempId.length - 1].value.substring((tempId[tempId.length - 1].value.length - 11), tempId[tempId.length - 1].value.length)}</>
                                            <>ID Display</>
                                        )}
                                </div>
                                <div className="my-2 bg-blue-800 text-blue-200 text-center rounded-xl">
                                    {/* New Board{ResultE} */}
                                    {Resultb ?
                                        (<>{ResultE ?
                                            (<><div className="font-bold bg-lime-500 text-yellow-900 p-2 rounded-lg" data-tooltip-target="tooltip-right" data-tooltip-placement="right">
                                                {/* <div className="tooltip"> */}
                                                Enroll Successful
                                            </div></>
                                            ) : (
                                                <><div className="font-bold bg-red-500 text-yellow-400 p-2 rounded-lg" data-tooltip-target="tooltip-right" data-tooltip-placement="right">
                                                    {/* <div className="tooltip"> */}
                                                    {/* {ResultE.Error ?
                                                    (<span className="tooltiptext4">Error: {ResultE?.Error.map(Resultee => (<p>{ResultE?.Error.replace(/([a-z])([A-Z])/g, '$1 $2')} <br /></p>))}</span>) : (<span className="tooltiptext4">No Errors {":)"}</span>)} */}
                                                    {/* </div> */}
                                                    Enroll Failed
                                                </div></>)}</>
                                        ) : (
                                            <><h1 className="p-2 text-center bg-blue-500 hover:underline hover:bg-red-400 hover:text-gray-900 rounded-lg">Enroll Result
                                            </h1></>)
                                    }
                                </div>
                                <div className="my-2 bg-blue-800 text-blue-200 text-center rounded-xl">
                                    {/* New Board{ResultE} */}
                                    {Resultb ?
                                        (<>{ResultVr ?
                                            (<><div className="font-bold bg-lime-500 text-yellow-900 p-2 rounded-lg" data-tooltip-target="tooltip-right" data-tooltip-placement="right">
                                                {/* <div className="tooltip"> */}
                                                Verify Successful
                                            </div></>
                                            ) : (
                                                <><div className="font-bold bg-red-500 text-yellow-400 p-2 rounded-lg" data-tooltip-target="tooltip-right" data-tooltip-placement="right">
                                                    {/* <div className="tooltip"> */}
                                                    {/* {ResultE.Error ?
                                                    (<span className="tooltiptext4">Error: {ResultE?.Error.map(Resultee => (<p>{ResultE?.Error.replace(/([a-z])([A-Z])/g, '$1 $2')} <br /></p>))}</span>) : (<span className="tooltiptext4">No Errors {":)"}</span>)} */}
                                                    {/* </div> */}
                                                    Verify Failed
                                                </div></>)}</>
                                        ) : (
                                            <><h1 className="p-2 text-center bg-blue-500 hover:underline hover:bg-red-400 hover:text-gray-900 rounded-lg">Verify Result
                                            </h1></>)
                                    }
                                </div>
                            </div>
                            <div className="p-2 w-46 rounded-lg">
                                <div className="flex flex-col rounded-lg">
                                    {/* <div className="flex flex-wrap m-1 justify-center p-2 bg-indigo-900 text-blue-200 shadow-inner hover:text-white rounded-lg">
                                        {Resultb ?
                                            (<><div className="flex flex-wrap justify-center">Accuracy is {Result ? (<h1 className="flex flex-wrap justify-center text-base text-green-500 font-bold mx-1">5</h1>) : (<h1 className="flex flex-wrap justify-center text-red-500 font-bold mx-1">0</h1>)}</div></>) : (<><h1 className="flex flex-wrap py-2 px-2 mx-2 text-center hover:underline hover:bg-red-400 hover:text-gray-900 rounded-lg">False Image</h1></>)}
                                    </div> */}
                                    <div className="transition duration-500 flex flex-wrap m-2 justify-center bg-blue-900 hover:bg-white text-blue-100 shadow-inner font-bold hover:text-blue-900 border-transparent border-2 hover:border-blue-900 focus:outline-none rounded-xl">
                                        <label className="text-center custom-file-upload p-2 rounded-xl">
                                            <input
                                                style={{ display: "none" }}
                                                type="file"
                                                className="m-4 shadow-inner"
                                                onChange={fileSelectHandler}
                                            />
                                            {/* {Filename ? (<p>{Filename}</p>) : (<p>Upload Image</p>)} */}
                                            Upload Image
                                        </label>
                                    </div>
                                    <div className="flex flex-row rounded-lg">
                                        <button
                                            onClick={Uploader}
                                            // onClick={findSelected}
                                            data-tooltip-target="tooltip-right"
                                            data-tooltip-placement="right"
                                            type="button"
                                            className="shadow-lg transition duration-500 ease-in-out m-auto bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:scale-110 focus:outline-none focus:ring focus:ring-violet-300 py-2 px-3 rounded-lg"
                                        >
                                            <div className="tooltip">Confirm
                                                {/* <span className="tooltiptext3">Click again if Image isn't accepted</span> */}
                                            </div>
                                        </button>
                                        <div className="flex flex-col mr-auto w-10">
                                            <input className="mx-auto w-full h-4" type="checkbox" id="ae_check" onClick={autoEnroll} />
                                            <input className="mx-auto mt-2 w-full h-4" type="checkbox" id="em_check" onClick={enrollMode} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={Enroll}
                                        data-tooltip-target="tooltip-right"
                                        data-tooltip-placement="right"
                                        type="button"
                                        className="shadow-lg mt-2 transition duration-500 ease-in-out m-auto bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:scale-110 focus:outline-none py-2 px-3 rounded-lg"
                                    >
                                        <div className="tooltip">Enrollment
                                            <span className="tooltiptext">This will enroll the images onto the database</span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={onVerify}
                                        data-tooltip-target="tooltip-right"
                                        data-tooltip-placement="right"
                                        type="button"
                                        className="shadow-lg mt-2 transition duration-500 ease-in-out m-auto bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:scale-110 focus:outline-none py-2 px-3 rounded-lg"
                                    >
                                        <div className="tooltip">Verification
                                            <span className="tooltiptext2">Verify the snap is the same person as uploaded database</span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={Delete1}
                                        data-tooltip-target="tooltip-right"
                                        data-tooltip-placement="right"
                                        type="button"
                                        className="shadow-lg mt-2 transition duration-500 ease-in-out m-auto bg-blue-700 hover:bg-gray-700 text-blue-200 font-bold hover:text-white transform hover:scale-110 focus:outline-none py-2 px-3 rounded-lg"
                                    >
                                        <div className="tooltip">Delete class
                                            <span className="tooltiptext2">Deletes bcid database</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Verification;