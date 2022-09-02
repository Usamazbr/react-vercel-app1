
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const apiUrl = `https://bws.bioid.com/extension/token?id=f64d51f8-80c0-4d84-b01d-69f5460574b9&bcid=bws/12001/1`;
const apiUrl2 = `https://bws.bioid.com/extension/livedetection`;
const apiUrl3 = `https://bws.bioid.com/extension/photoverify2?accuracy={4}`;
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { response } = require('express');

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get('/api/token', (req, res) => {
    axios
    .get(
      apiUrl,
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
    })
    .catch((err) => {
        res.status(500).json({ message: err });
    });
});



app.post('/api/lived', (req, res) => {
    // let data2 = 5;
    // console.log(data2);
    // console.log(res.data);
    axios
        .post(
        apiUrl2,req.body,
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
            console.log(response.data);
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
      apiUrl3,req.body,
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
          console.log(response.data);
      })
      .catch((err) => {
          res.status(500).json({ message: err });
      });
});

app.listen(port, () => console.log(`Listening on port ${port}`));