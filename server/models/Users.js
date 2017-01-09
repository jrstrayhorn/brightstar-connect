var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var UserSchema = new mongoose.Schema({
    firstname: String,
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
    }, process.env.SECRET_KEY);
};

var User = mongoose.model('User', UserSchema);

function createDefaultAdminUsers() {
    User.find({}).exec(function(err, collection){
        if(collection.length === 0) {
            var user = new User();

            user.firstname = process.env.DEFAULT_ADMIN_FIRST_NAME;
            user.lastname = process.env.DEFAULT_ADMIN_LAST_NAME;
            user.username = process.env.DEFAULT_ADMIN_USER;
            user.roles = ['admin'];
            user.setPassword(process.env.DEFAULT_ADMIN_PWD);

            user.save();
        }
    });
}

exports.createDefaultAdminUsers = createDefaultAdminUsers;