const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

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

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('user_password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.user_password, salt, function(err, hash) {
      if (err) return next(err);
      user.user_password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(recievedPassword, callback) {
  bcrypt.compare(recievedPassword, this.user_password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
