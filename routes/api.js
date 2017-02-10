var express = require('express');
var router = express.Router();

var events = require('./events');
var bot = require('./bot');
var file = require('./file');

router.use('/events', events);
router.use('/bot', bot);
router.use('/file', file)



router.get('/api/:id', function(req, res, next) {
   res.send('TASK API' + req.params.id);
});

module.exports = router;
