
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');


const apiUrl = `https://bws.bioid.com/extension/`;
// const apiUrl1 = `https://bws.bioid.com/extension/token?id=f64d51f8-80c0-4d84-b01d-69f5460574b9&bcid=bws/12001/1`;
const appID = `f64d51f8-80c0-4d84-b01d-69f5460574b9`;
const appSecret =`yOsOFm3+p2tJIN9t45kGkB9x`;
const bcid =`bws/12001/`;

const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { response } = require('express');
// var token = "";
// const [Token, setToken] = useState();
// const lst = [];  
// const populateData = (data) => {lst.push(data)} 

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// function tokret () {
//         console.log("Token req called!")
//         return axios
//                 .get(
//                 apiUrl1,
//                 {
//                     headers: {
//                     Accept : "application/json"
//                     },
//                     auth: {
//                     username: "f64d51f8-80c0-4d84-b01d-69f5460574b9",
//                     password: "yOsOFm3+p2tJIN9t45kGkB9x",
//                     },
//                 }
//                 )
                
//                 .then(response => {
//                     // res.status(200).json(response.data);
//                     response.data
//                     // populateData(response.data);
//                     console.log(response.data)
//                     // setToken(res);
//                 })
//                 // console.log(`token ${dataPromise}`);
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         // return dataPromise
// }

app.get('/api/token', (req, res) => {
    axios
    .get(
        apiUrl + 'token?id=' + appID + '&bcid=' + bcid + '1',
      {
        headers: {
          Accept : "application/json"
        },
        auth: {
          username: "f64d51f8-80c0-4d84-b01d-69f5460574b9",
          password: "yOsOFm3+p2tJIN9t45kGkB9x",
        },
      }
    )
    .then(response => {
        res.status(200).json(response.data);
        token = res;
        // setToken(res);
    })
    .catch((err) => {
        res.status(500).json({ message: err });
    });
});



app.post('/api/upload', (req, res) => {
    var token = "";
    // const {token:response} = tokret();
    axios
        .get(
        apiUrl + 'token?id=' + appID + '&bcid=' + bcid + '1',
        {
            headers: {
            Accept : "application/json"
            },
            auth: {
            username: appID,
            password: appSecret,
            },
        }
        )
        
        .then(response => {
            // res.status(200).json(response.data);
            token = response.data
            // populateData(response.data);
            // console.log(response.data)
            // setToken(res);
        })
        // console.log(`token ${dataPromise}`);
        .catch((err) => {
            console.log(err);
        });
    // console.log(token);
    // console.log(`bearer ${token}`)
    setTimeout(() => {
        const base64img = req.body.material;
        axios
            .post(
            apiUrl + 'upload',base64img,
            {
                headers: {
                Accept : "application/json",
                'Authorization': 'Bearer ' + token 
                },
            }
            )
            .then(response => {
                res.status(200).json(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                const error = err;
                // const error1 = error[Object.keys(error)[0]];
                const error1 = error;
                console.log(err);
            });
    }, 2000);
    
});

app.post('/api/lived', (req, res) => {
    // let data2 = 5;
    // console.log(data2);
    // console.log(res.data);
    axios
        .post(
        apiUrl + 'livedetection',req.body,
        {
            headers: {
            Accept : "application/json"
            },
            auth: {
            username: "f64d51f8-80c0-4d84-b01d-69f5460574b9",
            password: "yOsOFm3+p2tJIN9t45kGkB9x",
            },
        }
        )
        .then(response => {
            res.status(200).json(response.data);
            // console.log(response.data);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
        // res.send(
        //   `I received your POST request. This is what you sent me: ${req.body.post}`,
        // );
        
    // console.log(response.data);
});

app.post('/api/photov', (req, res) => {
  // let data2 = 5;
  // console.log(data2);
  // console.log(res.data);

  axios
      .post(
      apiUrl + 'photoverify2?accuracy={4}',req.body,
      {
          headers: {
          Accept : "application/json"
          },
          auth: {
          username: "f64d51f8-80c0-4d84-b01d-69f5460574b9",
          password: "yOsOFm3+p2tJIN9t45kGkB9x",
          },
      }
      )
      .then(response => {
          res.status(200).json(response.data);
        //   console.log(response.data);
      })
      .catch((err) => {
          res.status(500).json({ message: err });
      });
});

app.listen(port, () => console.log(`Listening on port ${port}`));