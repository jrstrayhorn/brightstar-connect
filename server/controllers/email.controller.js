var nodemailer = require('nodemailer');

exports.sendConfirmationEmail = function(req, res, next) {

    var emailData = req.emailData;

    var cancelUrl = process.env.APP_DOMAIN + '/#/registrations/cancel/' + emailData.registrationId;

    var html = '';
    html += '<h2>Registration confirmed!</h2><br>';
    html += 'Thanks for using Bright Star Connect!!<br><br>';
    html += 'You are registered for ' + emailData.eventName + ' on ' + emailData.eventDate + '<br><br>';
    html += 'Name: ' + emailData.registrationName + '<br><br>';
    html += '<a href="' + cancelUrl + '">Click Here to Cancel Your Registration</a><br><br>';
    html += 'Special Note: Please keep this email.  It is the only way to manage your event registration.<br><br>';
    html += 'You are receiving this confirmation email because you registered for an event using Bright Star Connect.';

    var subject = 'Your Registration Confirmation for ' + emailData.eventName;

    sendMail(emailData.toEmail, subject, html);
}

exports.sendCancellationEmail = function(req, res, next) {

    var emailData = req.emailData;

    var eventUrl = process.env.APP_DOMAIN + '/#/events';

    var html = '';
    html += '<h2>Registration canceled!</h2><br>';
    html += 'You have successfully canceled your registration for<br><br>';
    html += emailData.eventName + ' on ' + emailData.eventDate + '<br><br>';
    html += 'Name: ' + emailData.registrationName + '<br><br>';
    html += '<a href="' + eventUrl + '">Click Here to Register for a new Event</a><br><br>';
    
    var subject = 'Your ' + emailData.eventName + ' registration has been canceled';

    sendMail(emailData.toEmail, subject, html);
}

function sendMail(to, subject, html) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: to,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
            //res.json({yo:'error'});
        } else {
            console.log('Message sent: ' + info.response);
            //res.json({yo:info.response});
        };
    });
}