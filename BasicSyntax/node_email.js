// Code to send a mail 
require('dotenv').config();
var nodemailer = require('nodemailer');

password = process.env.NODEMAILER_PASS;
console.log('password = ', password);
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '2021pcs2040@iitjammu.ac.in',
        pass: password
    }
});

var mailOptions = {
    from: '2021pcs2040@iitjammu.ac.in',
    to: '202117014@daiict.ac.in',
    subject: 'Sending Email using Node.js',
    text: 'Today I have a interview and I am practising.'
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});