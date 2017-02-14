var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongo_head = require('./head');
var url = mongo_head.module_url;


	var deleteModule = function(db, id, callback_suc, callback_err) {
        db.collection('modules').remove({_id:ObjectId(id)},function(err) {
        	callback_suc();
        });
	};

	var editModule = function(db, data, id, callback_suc, callback_err) {
		console.log(data)
        db.collection('modules').update({_id:ObjectId(id)}, {$set:{req:data.req, res:data.res}}, function(err) {
        	callback_suc();
        });
	};




	var insertDocument = function(db, data, callback_suc, callback_err) {
	   db.collection('modules').insertOne(data, function(err, result) {
	    if(err) { callback_err(err); }
	    else {
		    console.log("Inserted a document into the modules collection.");
		    callback_suc();
		}
	  });
	};



	var fetchDocument = function(db, callback_suc, callback_err) {
	   db.collection('modules').find().toArray(function(err, docs) {
        assert.equal(null, err);
        callback_suc(docs)
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

//58a2f1bb273d0169968d9899



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


router.post('/edit/:id', function(req, res, next) {
		MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
		  editModule(db, req.body, req.params.id, function() {
		  	  res.json({success:1});
		      db.close();
		  }, function(err) {
		  	  res.json({success:0,msg:err});
		      db.close();
		  });
		});
});


router.delete('/delete/:id', function(req, res, next) {
		MongoClient.connect(url, function(err, db) {
		  deleteModule(db, req.params.id, function() {
		  	  res.json({success:1});
		      db.close();
		  }, function(err) {
		  	  res.json({success:0,msg:err});
		      db.close();
		  });
		});
});



module.exports = router;