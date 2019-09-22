const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgot-password', authController.fogortPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch(
  '/update-mypassword',
  authController.protect,
  authController.updatePassword
);

router
  .route('/')
  .get(authController.protect, userController.getUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  )
  .patch(userController.updateUser);

module.exports = router;
