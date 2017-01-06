var express = require('express');
var router = express.Router();

var auth = require('../../server/config/auth');

var events = require('../../server/controllers/events.controller');

/* events routes */
router.get('/api/events', events.getEvents);

/* authentication routes */
router.post('/login', auth.authenticate);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
