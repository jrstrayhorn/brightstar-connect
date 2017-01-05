var passport = require('passport');

exports.authenticate = function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    req.body.username = req.body.username.toLowerCase();

    passport.authenticate('local', function(err, user, info){
        if (err) { return next(err); }

        if (user) {
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
};