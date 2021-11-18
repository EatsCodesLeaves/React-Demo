let item = require("./model");
const express = require("express");
require('dotenv').config();
const app = express();
const router = express.Router();
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
app.use(cors());
const bodyParser = require("body-parser");

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use("/", router);


router.route("/getData").get(function(req, res) {
  item.find({}, function(error, result) {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

router.route("/addData").post(function(req, res) {
  item.create(req.body, (error, specs) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send(specs);
    }
  })
});

router.route("/setData/:id").put(function(req, res) {
  console.log(`setting name to: ${req.body.newName}`);
  item.findOneAndUpdate({ _id: req.params.id }, { name: req.body.newName }, {new: true}, function (error, foundItem) {
    if (error) {
      console.log(error);
      res.send(error);
    }else {
      console.log("Updated the item successfully!");
      res.send("Updated the item successfully!");
    }
  })
});

router.route("/delData/:id").delete(function(req, res) {
  console.log(`deleting product with the id: ${req.params.id}`);
  item.remove({ _id: req.params.id }, function (error, foundItem) {
    if (error) {
      console.log(error);
      res.send(error);
    }else {
      console.log("Removed the item!");
      res.send("Removed the item successfully!");
    }
  })
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});