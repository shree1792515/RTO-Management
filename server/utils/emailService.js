const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // your email password
    },
});

// Function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
    };

    return transporter.sendMail(mailOptions);
};

// Export the sendEmail function
module.exports = {
    sendEmail,
};