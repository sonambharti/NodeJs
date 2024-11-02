const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);
router.get('/', userController.getAllUser);
// router.get('/:email', userController.getUser); // email is in params
router.post('/', userController.getUser); // email is in body

router.post('/forgotPassword', userController.forgotPassword);
router.patch('/resetPassword/:passwordResetToken', userController.resetPassword);

module.exports = router;