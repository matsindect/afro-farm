const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    select: false
  },
  user_password: {
    type: String,
    required: [true, 'User password is required'],
    select: false
  },
  user_email_address: {
    type: String,
    required: [true, 'Email address is requred']
  },
  date_created: {
    type: Date,
    required: [true, 'Date is neccessary'],
    default: Date.now()
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
