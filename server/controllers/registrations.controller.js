var mongoose = require('mongoose');
var Registration = mongoose.model('Registration');

var Event = mongoose.model('Event');

exports.getRegistrationById = function(req, res, next) {
    Registration.findById(req.params._id)
        .populate('event', 'name date')
        .exec(function(err, reg) {
            if (err) { return next(err); }
            if (!reg) { return next(new Error("can't find registration")); }

            res.json(reg);
        });
};

exports.cancelRegistration = function(req, res, next) {
    Registration.findById(req.params._id)
        .populate('event')
        .exec(function(err, reg) {
            if (err) { return next(err); }
            if (!reg) { return next(new Error("can't find registration")); }

            reg.cancel(function(err, reg) {
                if(err) { return next(err); }

                res.sendStatus(200);

                // adding email data to request to be used by further middleware
                var emailData = {};

                emailData.toEmail = reg.email;
                emailData.eventName = reg.event.name;
                var eventDate = new Date(reg.event.date);
                emailData.eventDate = (eventDate.getMonth()+1) + '/' + eventDate.getDate() + '/' + eventDate.getFullYear();
                emailData.registrationName = reg.name;

                req.emailData = emailData;
                next();
            });
        });
};