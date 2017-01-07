var mongoose = require('mongoose');
var Registration = mongoose.model('Registration');

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
        .exec(function(err, reg) {
            if (err) { return next(err); }
            if (!reg) { return next(new Error("can't find registration")); }

            reg.cancel(function(err, reg) {
                if(err) { return next(err); }

                res.sendStatus(200);
            });
        });
};