var config = require('../../server/config/server-config');

var nodemailer = require('nodemailer');

exports.sendConfirmationEmail = function(req, res, next) {

    var emailData = req.emailData;

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
        user: config.emailUser,
        pass: config.emailPwd
        }
    });

    var cancelUrl = config.appDomain + '/#/registrations/cancel/' + emailData.registrationId;

  var html = '';
  html += '<h2>Registration confirmed!</h2><br>';
  html += 'Thanks for using Bright Star Connect!!<br><br>';
  html += 'You are registered for ' + emailData.eventName + ' on ' + emailData.eventDate + '<br><br>';
  html += 'Name: ' + emailData.registrationName + '<br><br>';
  html += '<a href="' + cancelUrl + '">Click Here to Cancel Your Registration</a><br><br>';
  html += 'Special Note: Please keep this email.  It is the only way to manage your event registration.<br><br>';
  html += 'You are receiving this confirmation email because you registered for an event using Bright Star Connect.';


  var mailOptions = {
    from: config.emailFrom,
    to: emailData.toEmail,
    subject: 'Your Registration Confirmation for ' + emailData.eventName,
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