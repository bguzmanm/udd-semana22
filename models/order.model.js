const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    require: true,
  },
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      }
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;