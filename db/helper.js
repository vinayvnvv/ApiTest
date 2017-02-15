var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongo_head = require('./head');
var url = mongo_head.module_url;

  var DBHelper = function() {

    console.log("called DBHelper Class")

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

     this.getModules = function(callback) {

      console.log("getting modules")

      MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
            db.collection('modules').find().toArray(function(err, docs) {
            assert.equal(null, err);
            callback(docs);
            db.close();
      });
    });

     }



  }

  module.exports = DBHelper;