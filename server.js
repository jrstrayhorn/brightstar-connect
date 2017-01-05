var express = require('express');

var config = require('./server/config/server-config');

var app = express();

// setup mongo/mongoose
require('./server/config/mongoose')(config);

// setup passport
require('./server/config/passport');

// setup express
require('./server/config/express')(app);

// setup routes
require('./server/config/routes')(app);

// setup error handlers
require('./server/config/error-handler')(app);

module.exports = app; 
