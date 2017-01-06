var mongoose = require('mongoose');
var Event = mongoose.model('Event');

exports.getEvents = function(req, res, next) {
    Event.find(function(err, events){
        if(err) { return next(err); }

        res.json(events);
    });
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