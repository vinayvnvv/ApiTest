var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


	var insertDocument = function(db, data, callback_suc, callback_err) {
	   db.collection('modules').insertOne(data, function(err, result) {
	    if(err) { callback_err(err); }
	    else {
		    console.log("Inserted a document into the modules collection.");
		    callback_suc();
		}
	  });
	};

router.post('/insert', function(req, res, next) {
		MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
		  insertDocument(db, req.body, function() {
		  	  res.json({success:1});
		      db.close();
		  }, function(err) {
		  	  res.json({success:0,msg:err});
		      db.close();
		  });
		});
});


module.exports = router;