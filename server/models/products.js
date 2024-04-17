// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  
  category: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const productmodel = mongoose.model('Product', productSchema);

module.exports = productmodel;
