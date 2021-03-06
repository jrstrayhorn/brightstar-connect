var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var cors = require('../../server/config/allowCORS');

module.exports = function(app) {
    // view engine setup
    app.set('views', path.join(__dirname+'/../../', '/server/views'));
    app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /public
    app.use(favicon(path.join(__dirname+'/../../', 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    var myEnv = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    if(myEnv === 'development') {
        // allowing CORS for development ONLY!!!!
        app.use(cors.allowCrossDomain);
    }

    // initialize passport
    app.use(passport.initialize());

    app.use(express.static(path.join(__dirname+'/../../', 'public')));
};