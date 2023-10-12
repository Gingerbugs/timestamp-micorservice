// index.js
// where your node app starts

// init project

const express = require('express');
const app = express();
require("dotenv").config();
const {param} = require('express-validator');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:time?",
  //Validate date field
  param("time").escape(),

  //Process request
  (req, res) => {
  if (req.params.time === undefined) {
    date = new Date();
  } else if (isNaN(req.params.time)) {
    date = new Date(req.params.time);
    if (date == "Invalid Date") {
      res.json({"error": "Invalid Date"});
      return;
    }
  } else {
    date = new Date(Number(req.params.time));
  }

  timestamp = date.getTime();
  utc = date.toUTCString();
  res.json({"unix": timestamp, "utc": utc});
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('App listening on port ' + listener.address().port);
});
