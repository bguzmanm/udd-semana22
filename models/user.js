const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    require: true,
    default: false,
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;