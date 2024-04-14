// models/User.js

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  
});

const usermodel = mongoose.model("user1",userSchema);
module.exports =usermodel
