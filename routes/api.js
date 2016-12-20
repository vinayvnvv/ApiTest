var express = require('express');
var router = express.Router();

var events = require('./events');

router.use('/events', events)



router.get('/api/:id', function(req, res, next) {
   res.send('TASK API' + req.params.id);
});

module.exports = router;
