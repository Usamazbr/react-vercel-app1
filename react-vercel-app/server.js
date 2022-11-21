
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');


const apiUrl = `https://bws.bioid.com/extension/`;
// const apiUrl1 = `https://bws.bioid.com/extension/token?id=f64d51f8-80c0-4d84-b01d-69f5460574b9&bcid=bws/12001/1`;
const appID = `f64d51f8-80c0-4d84-b01d-69f5460574b9`;
const appSecret =`vH2BTRYvc53seSkNMI1ljtfX`;
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



app.get('/api/token', (req, res) => {
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
        res.status(200).json(response.data);
        token = res;
        // setToken(res);
    })
    .catch((err) => {
        res.status(500).json({ message: err });
    });
});

app.post('/api/delete', (req, res) => {
    const classid = req.body.class_id;
    axios
    .delete(
        apiUrl + '/deleteclass?bcid=' + classid,
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
        res.status(200).json(response.data);
        console.log(res);
    })
    .catch((err) => {
        res.status(500).json({ message: err, status1: err.response.status, errormsg: err.response.data.Message });
        const error1 = err.response.data.Message;
        const error2 = err.response.status;
        console.log(err);
        console.log("\x1b[31m - Error:\x1b[0m","\x1b[31m"+ error2 + " " + error1 + "\x1b[0m");
    });
});


app.post('/api/enroll', (req, res) => {

    
    const token = req.body.biov_id;
    console.log(token);
    axios
    .get(
        apiUrl + 'enroll',
      {
        headers: {
        Accept : "application/json",
        'Authorization': 'Bearer ' + token 
        },
      }
    )
    .then(response => {
        res.status(200).json(response.data);
        console.log(response.data)
    })
    .catch((err) => {
        res.status(500).json({ message: err });
        const error1 = err.response.data.Message;
        const error2 = err.response.status;
        // console.log(err);
        console.log("\x1b[31m - Error:\x1b[0m","\x1b[31m"+ error2 + " " + error1 + "\x1b[0m");
    });
});

app.post('/api/verify', (req, res) => {

    
    const token = req.body.biov_id;
    console.log(token);
    axios
    .get(
        apiUrl + 'verify',
      {
        headers: {
        Accept : "application/json",
        'Authorization': 'Bearer ' + token 
        },
      }
    )
    .then(response => {
        res.status(200).json(response.data);
        console.log(response.data)
    })
    .catch((err) => {
        res.status(500).json({ message: err });
        const error1 = err.response.data.Message;
        const error2 = err.response.status;
        // console.log(err);
        console.log("\x1b[31m - Error:\x1b[0m","\x1b[31m"+ error2 + " " + error1 + "\x1b[0m");
    });
});

app.post('/api/upload', (req, res) => {
    // var token = "";
    var token = req.body.bcidt;
    var aeswitch = req.body.autoen;
    var enswitch = req.body.en_mode;
    console.log("Enroll Mode: " + enswitch);
    var comUrl = apiUrl + 'token?id=' + appID + '&bcid=' + bcid + '1' + '&autoenroll=' + aeswitch;
    if (enswitch){comUrl = apiUrl + 'token?id=' + appID + '&bcid=' + bcid + '1' + '&task=enroll'}
    console.log(comUrl);
    // console.log("token: "+ token);
    if (token === ""){
        // console.log("if loop called!");
        axios
            .get(
                comUrl,
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
            })
            // console.log(`token ${dataPromise}`);
            .catch((err) => {
                console.log(err);
            });
    }
    // console.log(token);
    // console.log(`bearer ${token}`)
    console.log("upload called");
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
                response.data.tokenr = token;
                res.status(200).json(response.data);
                console.log("Accepted:",response.data.Accepted);
                if (response.data.Accepted){
                    // console.log("\x1b[33mWarning:",response.data.Warnings[0] + ", " + response.data.Warnings[1] + ", " + response.data.Warnings[2] + ", " + response.data.Warnings[3] + "\x1b[0m");
                    console.log("\x1b[33m - Warning: " + response.data.Warnings.map(ResultWar => (ResultWar.replace(/([a-z])([A-Z])/g, '$1 $2'))) + "\x1b[0m")
                }
                // console.log(response.data);
            })
            .catch((err) => {
                const error = err;
                // const error1 = error[Object.keys(error)[0]];
                res.status(500).json({ message: err, status1: error.response.status });
                const error1 = error.response.data.Message;
                const error2 = error.response.status;
                console.log("\x1b[31m - Error:\x1b[0m","\x1b[31m"+ error2 + " " + error1 + "\x1b[0m");
            });
    }, 1000);
    
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
            username: appID,
            password: appSecret,
            },
        }
        )
        .then(response => {
            res.status(200).json(response.data);
            // console.log(response.data);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
            const error1 = err.response.data.Message;
            const error2 = err.response.status;
            console.log(err);
            console.log("\x1b[31m - Error:\x1b[0m","\x1b[31m"+ error2 + " " + error1 + "\x1b[0m");
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