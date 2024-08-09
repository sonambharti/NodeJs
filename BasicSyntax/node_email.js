// Code to send a mail 
require('dotenv').config();
var nodemailer = require('nodemailer');

const password = process.env.NODEMAILER_PASS;
const email = process.env.NODEMAILER_email;
const to_email = process.env.NODEMAILER_toemail;

console.log('password = ', password);
console.log('email = ', email);
console.log('to_email = ', to_email);

var transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    service: 'Gmail',
    auth: {
        user: email,
        pass: password
    }
});

var mailOptions = {
    from: email,
    to: to_email,
    subject: 'Sending Email using Node.js',
    text: 'Today I have a interview and I am practising.'
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log("There is an error:\n", error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});