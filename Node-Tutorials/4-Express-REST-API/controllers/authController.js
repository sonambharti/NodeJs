// User authentication related function
require('dotenv').config({path: './.env'});
const User = require('./../model/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const util = require('util')
const catchAsync = require('./../utils/catchAsync');
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


exports.signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const confirmPassword = req.body.confirmPassword;
        const newUser = await User.create({name, email, password, confirmPassword});

        // const token = signToken(newUser._id);

        createsendToken(newUser, 201, res); // hide encrypted password from user to showup in response
        // res.status(201).json({
        //     status: 'success',
        //     token: token,
        //     data: { 
        //         user: newUser 
        //     }
        // });
    }catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: `Error: ${err.message}`,
        })
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // const newUser = await User.find({email: email});
        // const newUser = await User.find({email: email}).select('+password'); // to show the password
        const newUser = await User.findOne({email: email}).select('+password'); // to show the password

        if(newUser.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        // const isValidPassword = await bcrypt.compare(password, newUser[0].password);
        const isValidPassword = await bcrypt.compare(password, newUser.password);
        if(!isValidPassword) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid password',
            });
        }

        const token = signToken(newUser._id);
        
        res.status(200).json({
            status: 'successful login',
            token: token,
            // data: {
            //     user: newUser
            // },
        });
    }catch(err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: `Error: ${err.message}`,
        })
    }
}

exports.protect = async (req, res, next) => {
    try {
        // Getting token if it exists
        let token = req.headers.authorization;
        // const token = req.headers.authorization.split(' ')[1];

        if(token && token.split(' ')[0] == 'Bearer'){
            token = token.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You do not have permission to access this resource',
            });
        }
        
        // Verify token
        // const decoded = await jwt.verify(token, jsonSecret);
        const decoded = await util.promisify(jwt.verify)(token, jsonSecret); // Promisifying everything
        console.log(decoded);

        // check if user exists or if someone has stolen the passsword
        const currUser = await User.findById(decoded.id);
        if(!currUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        
        // check if password is changed when token is issued
        if(currUser.passwordChangedAt){
            const changedTimeStamp = parseInt(
                currUser.passwordChangedAt.getTime()/1000, 10
                )
            const tokenIssuedAt = decoded.iat;
            if (changedTimeStamp > tokenIssuedAt){
                return res.status(401).json({
                    status: 'fail',
                    message: 'User recently changed password, please log in again',
                });
            }
        }
        req.user = currUser;
    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: `Error: ${err.message}`,
        })
    };
    next();
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to access this resource',
            });
        }
        next();
    }
}