var express = require('express');
var router = express.Router();
var mongo = require('mongojs');
var db = mongo('mongodb://vinaybv:gamapath@ds139288.mlab.com:39288/apitest', ['apitest']);



router.get('/', function(req, res, next) {
	db.apitest.find(function(err, docs) {
          if(err) {
          	res.send(err);
          }
            res.json(docs);

	});
});


module.exports = router;