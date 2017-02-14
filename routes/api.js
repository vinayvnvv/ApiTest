var express = require('express');
var router = express.Router();

var events = require('./events');
var bot = require('./bot');
var file = require('./file');
var modules = require('./../db/modules')

router.use('/events', events);
router.use('/bot', bot);
router.use('/file', file)
router.use('/modules', modules)



router.get('/api/:id', function(req, res, next) {
   res.send('TASK API' + req.params.id);
});

module.exports = router;
