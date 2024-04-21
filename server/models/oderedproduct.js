const mongoose = require('mongoose')

const ordredSchema = new mongoose.Schema({
  useremail: String,
  imagepath: String,
  name: String,
  code: String,
  price:Number,
});

const oderedproductmodel = mongoose.model("orderedproduct",ordredSchema);
module.exports =oderedproductmodel
