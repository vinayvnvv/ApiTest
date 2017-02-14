var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongo_head = require('./head');
var url = mongo_head.module_url;

  var DBHelper = function() {

     this.trackQueryToLocal = function(data) {

     	console.log("tracking query")
     	console.log(data);

     	MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
            db.collection('track').insertOne(data, function(err, result) {
				    if(err) { console.log(err); }
				    else {
					    console.log("Inserted a document into the tracking collection.");
					}
				  });
		});

     }



  }

  module.exports = DBHelper;