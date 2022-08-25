const express = require("express");
// Router
const router = express.Router();
// DataBase
const mongoose = require("mongoose");
// For Get From Data
const bodyParser = require("body-parser");

const cors = require("cors");
router.use(cors());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//  Connect Database
mongoose.connect("mongodb://localhost/oatvadmindb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Use Model
var channel = require("../../model/channel.js");

const jwt = require("jsonwebtoken");
const { Router } = require("express");

router.post("/add", (req, res) => {
  console.log(req.body.title)
  channel.find({ position: req.body.position }, (err, dataChannelPosition) => {
    if (dataChannelPosition.length == 0) {
      let Channel = new channel({
        url: req.body.url,
        position: req.body.position,
        title: req.body.title,
      });
      Channel.save((err, data) => {
        if (err) {
          res.status(400).json({
            errorMessage: err,
            status: false,
          });
        } else {
          res.status(200).json({
            status: true,
            title: "Channel Added Successfully.",
          });
        }
      });
    } else {
      channel.updateOne(
        { position: req.body.position },
        {
          url:req.body.url,
          title:req.body.title,
        },
        function (err, channelUpdate) {
          if (err) {
            res.status(400).json({
              status: false,
              errorMessage: err,
            });
          } else {
            res.send("Channel Updated");
            console.log("channel updated");
          }
        }
      );
    }
  });
});

// Get Channel Data

router.get("/getAlldata", (req, res) => {
  if (req.headers.token) {
    jwt.verify(req.headers.token, "shhhhh11111", function (err) {
      channel.find({}, function (err, data) {
        if (err) throw error;
        res.send(data);
      });
    });
  } else {
    return res.json({ status: 400, errors: "Unauthorised User" });
  }
});

module.exports = router;
