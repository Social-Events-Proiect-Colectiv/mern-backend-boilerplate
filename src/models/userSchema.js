const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  type: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});


const User = mongoose.model('User', userSchema);

module.exports = User;
