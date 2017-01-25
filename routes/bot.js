var express = require('express');
var router = express.Router();
var mongo = require('mongojs');
var db = mongo('mongodb://127.0.0.1:27017/test', ['test']); //var db = mongo('mongodb://vinaybv:gamapath@ds139288.mlab.com:39288/apitest', ['apitest']);

console.log(db)


router.get('/:id', function(req, res, next) {
	var module_id = new mongo.ObjectID(req.params.id);
	db.test.find({"_id": module_id},function(err, docs) {
          if(err) {
          	res.send(err);
          }

          setTimeout(function(){ res.json(docs); }, 3000);
            

	});

	// res.send('TASK API' + req.params.id);

});


module.exports = router;