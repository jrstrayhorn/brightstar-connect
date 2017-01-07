var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = require('../../server/config/auth');

var config = require('../../server/config/server-config');

var events = require('../../server/controllers/events.controller');

// middleware for authenticating jwt
var authJWT = jwt({secret: config.secretKey, userProperty: 'payload'});

/* events routes */
router.get('/api/events', events.getEvents);
router.post('/api/events', authJWT, events.createEvent);
router.get('/api/events/:_id', events.getEventById);
router.put('/api/events/:_id', events.updateEvent);

/* events - registration routes */
router.get('/api/events/:_id/registrations', authJWT, events.getEventByIdWithRegistrations);
router.post('/api/events/:_id/registrations', events.saveRegistration);

/* authentication routes */
router.post('/login', auth.authenticate);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
