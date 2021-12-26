const mongoose = require('mongoose');
const validator = require('validator');

// create userSchema - define data that makes a user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Error! The email you entered is invalid',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 40,
    default: 'Alex'
  }
});

// create model from schema
module.exports = mongoose.model('user', userSchema);