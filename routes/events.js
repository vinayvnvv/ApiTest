var express = require('express');
var router = express.Router();
var mongo = require('mongojs');
var db = mongo('mongodb://127.0.0.1:27017/test', ['test']); //var db = mongo('mongodb://vinaybv:gamapath@ds139288.mlab.com:39288/apitest', ['apitest']);

console.log(db)


router.get('/', function(req, res, next) {
	// db.test.find(function(err, docs) {
 //          if(err) {
 //          	res.send(err);
 //          }
 //            res.json(docs);

	// });
});


module.exports = router;