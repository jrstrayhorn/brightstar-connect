var mongoose = require('mongoose');

module.exports = function(config) {

    var userModel = require('../../server/models/Users');
    var eventModel = require('../../server/models/Events');
    require('../../server/models/Registrations');

    // connect to MongoDB
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongoUrlDev);

    // create default admin user
    userModel.createDefaultAdminUsers();

    // create default Events
    eventModel.createDefaultEvents();
};