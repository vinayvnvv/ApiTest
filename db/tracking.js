var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongo_head = require('./head');
var url = mongo_head.tracking_url;


	var insertDocument = function(db, data, callback_suc, callback_err) {
	   db.collection('track').insertOne(data, function(err, result) {
	    if(err) { callback_err(err); }
	    else {
		    console.log("Inserted a document into the modules collection.");
		    callback_suc();
		}
	  });
	};



	var fetchDocument = function(db, callback_suc, callback_err) {
	   db.collection('track').find().toArray(function(err, docs) {
        assert.equal(null, err);
        callback_suc(docs)
      });
	};


router.get('/get', function(req, res, next) {
		MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
		  fetchDocument(db, function(result) {
		  	  res.json(result);
		      db.close();
		  }, function(err) {
		  	  res.json({success:0,msg:err});
		      db.close();
		  });
		});
});



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