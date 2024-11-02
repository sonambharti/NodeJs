require('dotenv').config({path: './.env'});
const nodeMailer = require('nodemailer');

const password = process.env.NODEMAILER_PASS;
const userid = process.env.NODEMAILER_email;

const sendEmail = async ({ email, title, text }) => {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    // var transporter = nodeMailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //     user: "626f1a0a0fe455",
    //     pass: "93939b41289bcd"
    //     }
    // });
    var transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: userid,
            pass: password
        }
    });
    var mailOptions = {
        from: userid,
        // to: {email},
        to: email,
        subject: title,
        text: text
    };
    // console.log(`Mail options: ${mailOptions}`)
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("There is an error:\n", error);
        } else {
            console.log(response[0].statusCode);
            console.log(response[0].headers);
            console.log('Email sent: ' + info.response);
        }
    });
};
module.exports = sendEmail;