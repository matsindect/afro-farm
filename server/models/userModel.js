const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
let SALT_WORK_FACTOR = 12;

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    select: false
  },
  user_firstname: {
    type: String,
    required: [true, 'User First name is required']
  },
  user_lastname: {
    type: String,
    required: [true, 'User Last mame is required']
  },
  user_password: {
    type: String,
    required: [true, 'User password is required'],
    select: false,
    minlength: 8
  },
  user_passwordChangedAt: Date,
  user_Confirmpassword: {
    type: String,
    required: [true, 'User Confirm password is required'],
    select: false,
    minlength: 8,
    validate: {
      // this kind of validation only works for create and save
      validator: function(pwd) {
        return pwd === this.user_password;
      },
      message: 'Passwords do not match'
    }
  },
  user_email_address: {
    type: String,
    required: [true, 'Email address is requred'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  user_role: {
    type: String,
    enum: ['admin', 'user', 'customer', 'store-manager', 'accounts-admin'],
    default: 'user'
  },
  date_created: {
    type: Date,
    required: [true, 'Date is neccessary'],
    default: Date.now()
  },
  passwordResetToken: String,
  passwordResetExpire: Date
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
      user.user_Confirmpassword = undefined;
      next();
    });
  });
});

userSchema.pre('save', function(next) {
  if (!this.isModified('user_password') || this.isNew) return next();

  this.user_passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.comparePassword = async function(
  recievedPassword,
  userPassword
) {
  return await bcrypt.compare(recievedPassword, userPassword);
};

userSchema.methods.passwordChanged = function(JWTTimestamp) {
  if (this.user_passwordChangedAt) {
    const changeTimestamp = parseInt(
      this.user_passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changeTimestamp;
  }
  return false;
};

userSchema.methods.creatUserResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
