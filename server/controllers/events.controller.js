var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Registration = mongoose.model('Registration');

var config = require('../../server/config/server-config');

var nodemailer = require('nodemailer');

exports.getEvents = function(req, res, next) {
    Event.find({}, 'name date publish',function(err, events){
        if(err) { return next(err); }

        res.json(events);
    });
};

exports.getEventById = function(req, res, next) {
    Event.findById(req.params._id)
        .select('name date publish')
        .exec(function(err, event) {
            if (err) { return next(err); }
            if (!event) { return next(new Error("can't find event")); }

            res.json(event);
        });
};

exports.getEventByIdWithRegistrations = function(req, res, next) {
    Event.findById(req.params._id)
        .populate('registrations')
        .exec(function(err, event) {
            if (err) { return next(err); }
            if (!event) { return next(new Error("can't find event")); }

            res.json(event);
        });
};

exports.saveRegistration = function(req, res, next) {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({message: 'Please fill out all required fields'});
    }

    // Check if any existing registrations for event and email address
    Registration
    .find({event:req.params._id})
    .exec(function(err, regs){
        // check registrations for one with same email address
        if (existRegistration(regs, req.body.email)) {
            return res.status(400).json({message: 'There is already a registration to this event for this email address.'});
        } else {
            // new registration continue with processing

            // Get Event for registration - will need later
            Event.findById(req.params._id).exec(function(err, event) {
                if (err) { return next(err); }
                if (!event) { return next(new Error("can't find event")); }

                var registration = new Registration(req.body);
                // create ref from registration to event
                registration.event = event;
                
                // save registration to db
                registration.save(function(err, registration) {
                    if(err) { return next(err); }

                    // add registration ref to event
                    event.registrations.push(registration);
                    event.save(function(err, event) {
                        if(err) { return next(err); }

                        res.sendStatus(200);

                        // sending email confirmation
                        var emailData = {};

                        emailData.toEmail = registration.email;
                        emailData.eventName = event.name;
                        var eventDate = new Date(event.date);
                        emailData.eventDate = (eventDate.getMonth()+1) + '/' + eventDate.getDate() + '/' + eventDate.getFullYear();
                        emailData.registrationName = registration.name;
                        emailData.registrationId = registration._id;
                                                
                        sendConfirmationEmail(emailData);
                    });
                });
            });
        }
    });
};

function sendConfirmationEmail(emailData) {
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

function existRegistration(regArray, email) {
    var found = false;  // assume failure

    for(var i=0; i < regArray.length; i++) {
        if (regArray[i].email === email && regArray[i].active) {
            found = true;
        }
    }

    return found;
}

exports.updateEvent = function(req, res, next) {
    if(!req.body.name || !req.body.date) {
        return res.status(400).json({message: 'Please fill out all required fields'});
    }

    var eventUpdates = {};

    eventUpdates.name = req.body.name;
    eventUpdates.date = req.body.date;
    eventUpdates.publish = req.body.publish;

    Event.findByIdAndUpdate(req.body._id, {
        $set: eventUpdates
    }, function (err, user) {
        if (err) return res.status(400).json({message: err.toString()});
        res.sendStatus(200);
    })
};

exports.createEvent = function(req, res, next) {
    if(!req.body.name || !req.body.date) {
        return res.status(400).json({message: 'Please fill out all required fields'});
    }

    var event = new Event(req.body);

    event.save(function(err, event) {
        if (err) { return next(err); }

        res.sendStatus(200);
    })
};