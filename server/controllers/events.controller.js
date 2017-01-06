var mongoose = require('mongoose');
var Event = mongoose.model('Event');

exports.getEvents = function(req, res, next) {
    Event.find(function(err, events){
        if(err) { return next(err); }

        res.json(events);
    });
};