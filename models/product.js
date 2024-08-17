const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  stock: {
    type: Number,
    require: true,
    default: 0,
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;