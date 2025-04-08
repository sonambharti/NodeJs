require('dotenv').config({path: './.env'});
const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserModel = require('./../model/user_model');
const authController = require('./authController');
const sendEmail = require('../utils/sendEmail');
const user_model = require('./../model/user_model');

const jsonSecret = process.env.JWT_SECRET
const jsonExpire = process.env.JWT_EXPIRES_IN


const signToken = (token_id) => {
    return jwt.sign({ id: token_id}, jsonSecret, {
        expiresIn: jsonExpire,
    });
};

const createsendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: { 
            user: user 
        }
    });
};


// Getting all the entries present in the user details
exports.getAllUser =  async (req, res) => {
    try {
        const data = await UserModel.find();
        res.status(201).json({
            status: 'success',
            data: data,
        });
    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: `Failed to get the details...`,
        });
    }
}


// Getting a user detail via it's user_id
exports.getUser = async (req, res) => {

    try {
        const data = await UserModel.find({email: req.body.email});
        // const data = await UserModel.find({email: req.params.email});
        res.status(201).json({
            status: 'success',
            data: data,
        });
    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: `Failed to get the details...`,
        });
    }
}   


// Update User
exports.updateUser = (req, res) => {
    
    res.status(200).json({
        status: 'success',
        message: 'Yet to define.',
    });
}   


// Delete Tour
exports.deleteUser = (req, res) => {
    
    res.status(200).json({
        status: 'success',
        message: 'User deleted. Yet to define.',
        data: null,
    });
} 


// // Adding new entry in the User details
// exports.addUser = (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         message: 'Yet to define.',
//     });
// };


exports.forgotPassword = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if(!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found.',
            });
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const passwordDateExpires = Date.now() + 10 * 60 * 1000;
        user.passwordResetExpires = passwordDateExpires;
        await user.save({ validateBeforeSave: false });

        // send Email
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

        let email = user.email;
        let title = `Reset Password Link`;
        let text = `Please use the following link to reset your password: ${resetURL}`;
        console.log(text);
        await sendEmail({ email, title, text });

        res.status(202).json({
            message: `Email has been sent to ${email} successfully. Follow the instruction to activate your account`,
            token: resetURL,
          });

    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to get the details...',
        });
    };
};



exports.resetPassword = async (req, res) => {
    try {
        const paramPaswordReset = req.params.passwordResetToken;
        passwordResetToken = crypto.createHash('sha256').update(paramPaswordReset).digest('hex');
        const user = await UserModel.findOne({passwordResetToken: passwordResetToken});
        console.log('passwordResetToken: ', passwordResetToken);
        if(!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid token.',
            });
        }

        const passwordDateExpires = user.passwordResetExpires;
        const currTime = Date.now();
        if(currTime > passwordDateExpires) {
            return res.status(404).json({
                status: 'fail',
                message: 'Expired token.',
            });
        }
        
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();
        createsendToken(user, 200, res);

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to get the details...',
        });
    }
}