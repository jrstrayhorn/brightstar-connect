var express = require('express');

var app = express();

// TESTING
if(!process.env.MONGO_URL) {
  var env = require('./server/config/env');
}

// setup mongo/mongoose
require('./server/config/mongoose');

// setup passport
require('./server/config/passport');

// setup express
require('./server/config/express')(app);

// setup routes
require('./server/config/routes')(app);

// setup error handlers
require('./server/config/error-handler')(app); 

module.exports = app; 
