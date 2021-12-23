const mongoose = require('mongoose');

// create userSchema - define data that makes a user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 40,
  }
});

// create model from schema
module.exports = mongoose.model('user', userSchema);