const mongoose = require('mongoose');
const validator =require('validator');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const User = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z.]],
    validate: [validator.isEmail, 'Email is invalid']
  },
  photo: String,
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ['user', 'guide', 'manager', 'admin', 'leadguide'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false, // to not show to the user in select query
  },
  confirmPassword: {
    type: String,
    required: [true, 'Required to confirm password'],
    validate: {
      validator: function(input){ // custom validator
          return input === this.password;
      },
      message: 'Passwords does not match',
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});


User.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  // this.confirmPassword = '';
  this.confirmPassword = undefined;
  next();
});

module.exports = mongoose.model('user', User);