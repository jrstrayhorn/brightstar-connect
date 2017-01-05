var mongoose = require('mongoose');

module.exports = function(config) {

    var userModel = require('../../server/models/Users');

    // connect to MongoDB
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongoUrlDev);

    // create default admin userModel
    userModel.createDefaultAdminUsers();
};