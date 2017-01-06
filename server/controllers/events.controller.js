var mongoose = require('mongoose');
var Event = mongoose.model('Event');

exports.getEvents = function(req, res, next) {
    Event.find(function(err, events){
        if(err) { return next(err); }

        res.json(events);
    });
};

exports.getEventById = function(req, res, next) {
    Event.findById(req.params._id).exec(function(err, event) {
        if (err) { return next(err); }
        if (!event) { return next(new Error("can't find course")); }

        res.json(event);
    });
};

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