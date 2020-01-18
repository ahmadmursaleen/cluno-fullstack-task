const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
const fs = require("fs");
const jwt = require("jsonwebtoken");

let rawdata = fs.readFileSync("cluno.json");
let clunoData = JSON.parse(rawdata);
var cors = require("cors");

//Middleware used
let app = express();
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(errorhandler());
app.use(cors());

// Functionality to get data about all the cars with JWT verification
app.post("/accounts", verifyToken, (req, res) => {
  console.log(req.token);
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      console.log("success");
      res.send(clunoData);
    }
  });
});

// Functionality to get data about a specific car with JWT verification
app.post("/accounts/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      var foundCar = null;
      for (key in clunoData.Items) {
        if (clunoData.Items[key].id.S == req.params.id) {
          console.log("found");
          foundCar = clunoData.Items[key];
          break;
        }
      }
      if (foundCar) {
        res.status(200).send(foundCar);
      } else {
        res.status(404).send("Car not found");
      }
    }
  });
});

// Login functionality to get a JWT
app.post("/login", (req, res) => {
  const user = req.body;
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
      token
    });
  });
});

//fucntionality to verify and extract the sent JWT token
function verifyToken(req, res, next) {
  const jwtToken = req.body["token"];

  if (jwtToken != null) {
    req.token = jwtToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(8000);
