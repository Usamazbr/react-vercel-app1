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
      console.log({ res });
    })
    .catch((err) => {
        console.log(err);
    })
    ;
  }
export default verifyImages;