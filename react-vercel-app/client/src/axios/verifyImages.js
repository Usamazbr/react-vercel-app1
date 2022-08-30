import React, { useState } from "react";
import axios from "axios";

const apiUrl = `http://localhost:5000/api/lived`;

const verifyImages = ({ liveimage1, liveimage2 }) =>{
  
//   console.log([liveimage1,liveimage2])
  let data = {"liveimage1":liveimage1,"liveimage2":liveimage2}
  axios
    .post(
      apiUrl,data,
    )
    .then((res) => {
      // this.setState({data: res.data});
      console.log({ res });
      // const result1 = res.data;
    })
    .catch((err) => {
        console.log(err);
    })
    ;
    return 

    ;
  }
export default verifyImages;