const transporter = require('../config/email');

exports.sendEmail = function (req, res, next) {
    var mailOptions = {
        from: 'qmenotifier@gmail.com',
        to: 'kenny.perroni@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy again!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};