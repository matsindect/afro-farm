const User = require('../models/userModel');
const APIresourceFunc = require('../utils/APIresourceFunc');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'Fail',
      massage: err
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).send({
      status: 'Failed',
      message: err
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // const user = await User.findOne({user_name: req.params.user_name});
    res.status(200).send({
      status: 'Success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'Failed',
      message: err
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    // const user = await User.findOneAndDelete({user_name: req.params.user_name});
    res.status(204).send({
      status: 'Success',
      data: null
    });
  } catch (err) {
    res.status(400).send({
      status: 'Failed',
      message: err
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    // const user = await User.findOne({user_name: req.params.user_name});
    res.status(200).send({
      status: 'Success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'Failed',
      message: err
    });
  }
};
