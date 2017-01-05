var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../../server/config/server-config');

var UserSchema = new mongoose.Schema({
    lastname: String,
    username: {type: String, lowercase: true, unique: true},
    hash: String,
    salt: String,
    roles: [String]
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');

    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

    // set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        roles: this.roles,
        exp: parseInt(exp.getTime() / 1000)
    }, config.secretKey);
};

var User = mongoose.model('User', UserSchema);

function createDefaultAdminUsers() {
    User.find({}).exec(function(err, collection){
        if(collection.length === 0) {
            var user = new User();

            user.firstname = config.defaultAdminFirstName;
            user.lastname = config.defaultAdminLastName;
            user.username = config.defaultAdminUser;
            user.roles = ['admin'];
            user.setPassword(config.defaultAdminPwd);

            user.save();
        }
    });
}

exports.createDefaultAdminUsers = createDefaultAdminUsers;