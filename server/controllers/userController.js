const User = require('../models/userModel');
const APIresourceFunc = require('../utils/APIresourceFunc');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const AppError = require('../utils/appError');

exports.createUser = catchAsyncFunc(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).send({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

exports.getUsers = catchAsyncFunc(async (req, res, next) => {
  //EXECUTE A QUERY
  const apiHelpers = new APIresourceFunc(User.find(), req.query)
    .AdvancedFilter()
    .sort()
    .fieldSort()
    .paginate();

  const users = await apiHelpers.query;

  res.status(200).send({
    status: 'Success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.getUser = catchAsyncFunc(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // const user = await User.findOne({user_name: req.params.user_name});
  if (!user) {
    return next(new AppError('There isno user with that id', 404));
  }
  res.status(200).send({
    status: 'Success',
    data: {
      user
    }
  });
});

exports.deleteUser = catchAsyncFunc(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  // const user = await User.findOneAndDelete({user_name: req.params.user_name});
  if (!user) {
    return next(new AppError('There isno user with that id', 404));
  }
  res.status(204).send({
    status: 'Success',
    data: null
  });
});

exports.updateUser = catchAsyncFunc(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new AppError('There isno user with that id', 404));
  }
  // const user = await User.findOne({user_name: req.params.user_name});
  res.status(200).send({
    status: 'Success',
    data: {
      user
    }
  });
});
