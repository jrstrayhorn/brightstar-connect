var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = require('../../server/config/auth');

var config = require('../../server/config/server-config');

var events = require('../../server/controllers/events.controller');
var registrations = require('../../server/controllers/registrations.controller');

var emailCtrl = require('../../server/controllers/email.controller');

// middleware for authenticating jwt
var authJWT = jwt({secret: config.secretKey, userProperty: 'payload'});

/* events routes */
router.get('/api/events', events.getEvents);
router.post('/api/events', authJWT, events.createEvent);
router.get('/api/events/:_id', events.getEventById);
router.put('/api/events/:_id', events.updateEvent);

/* events - registration routes */
router.get('/api/events/:_id/registrations', authJWT, events.getEventByIdWithRegistrations);
router.post('/api/events/:_id/registrations', events.saveRegistration, emailCtrl.sendConfirmationEmail);

/* registration routes */
router.get('/api/registrations/:_id', registrations.getRegistrationById);
router.put('/api/registrations/:_id/cancel', registrations.cancelRegistration);

/* authentication routes */
router.post('/login', auth.authenticate);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
