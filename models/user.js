const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 10,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
