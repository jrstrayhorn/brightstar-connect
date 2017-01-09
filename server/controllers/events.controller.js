var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Registration = mongoose.model('Registration');

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
        var index = existRegistration(regs, req.body.email);
        if (index >= 0) {
            var existingReg = regs[index];
            if(existingReg.active) {
                return res.status(400).json({message: 'There is already a registration to this event for this email address.'});
            } else {
                // update existing registration
                var regUpdates = {};

                regUpdates.name = req.body.name;
                regUpdates.phone = req.body.phone;
                regUpdates.active = true;

                Registration
                    .findByIdAndUpdate(existingReg._id, { $set: regUpdates })
                    .populate('event')
                    .exec(function (err, reg) {
                        if (err)  { return next(err); }

                        res.sendStatus(200);

                        // adding email data to request to be used by further middleware
                        var emailData = {};

                        emailData.toEmail = reg.email;
                        emailData.eventName = reg.event.name;
                        var eventDate = new Date(reg.event.date);
                        emailData.eventDate = (eventDate.getMonth()+1) + '/' + eventDate.getDate() + '/' + eventDate.getFullYear();
                        emailData.registrationName = reg.name;
                        emailData.registrationId = reg._id;

                        req.emailData = emailData;
                        next();
                    });
            }
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

                        // adding email data to request to be used by further middleware
                        var emailData = {};

                        emailData.toEmail = registration.email;
                        emailData.eventName = event.name;
                        var eventDate = new Date(event.date);
                        emailData.eventDate = (eventDate.getMonth()+1) + '/' + eventDate.getDate() + '/' + eventDate.getFullYear();
                        emailData.registrationName = registration.name;
                        emailData.registrationId = registration._id;

                        req.emailData = emailData;
                        next();
                    });
                });
            });
        }
    });
};

function existRegistration(regArray, email) {
    var found = -1;  // assume failure

    for(var i=0; i < regArray.length; i++) {
        if (regArray[i].email === email) {
            found = i;
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