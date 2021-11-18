const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let item = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  img: {
    type: String
  },
  price: {
    type: Number
  }
});

module.exports = mongoose.model("item", item);