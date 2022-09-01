// import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = `http://localhost:5000/api/lived`;

const VerifyImages = ({ liveimage1, liveimage2 }) => {
  // const [Result, setResult] = useState();
  let result2 = null;
  //   console.log([liveimage1,liveimage2])
  let data = { "liveimage1": liveimage1, "liveimage2": liveimage2 }
  axios
    .post(
      apiUrl, data,
    )
    .then((res) => {
      // const result1 = res.data;
      // setResult(result1);
      // setResult((state) => {
      //   console.log(state);
      //   return state;
      // })
      // this.setState({data: res.data});
      result2 = res.data;
      console.log({ res });
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log({ Result });
  return (
    <div className="max-w-6xl mx-auto flex p-6 bg-gray-900 text-blue-200 mt-10 py-6 px-6 rounded-lg">
      <p>
        VerifyImages
      </p>
      <h1>{result2}</h1>
    </div>
  );
}
export default VerifyImages;