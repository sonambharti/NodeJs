const fs = require('fs');

// Getting all the entries present in the user details
exports.getAllUsers =  (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Yet to define',
    });
}


// Getting a user detail via it's user_id
exports.getUser = (req, res) => {

    res.status(200).json({
        status: 'success',
        message: 'Yet to define',
    });
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


// Adding new entry in the User details
exports.addUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Yet to define.',
    });
};

