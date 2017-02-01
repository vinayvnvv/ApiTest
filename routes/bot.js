var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var mongo = require('mongojs');
var db = mongo('mongodb://127.0.0.1:27017/test', ['test','records']); //var db = mongo('mongodb://vinaybv:gamapath@ds139288.mlab.com:39288/apitest', ['apitest']);
var mdb = db;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {

	mdb = db;

	});




router.get('/module/:id', function(req, res, next) {
	var module_id = new mongo.ObjectID(req.params.id);
	db.test.find({"_id": module_id},function(err, docs) {
          if(err) {
          	res.send(err);
          }

          setTimeout(function(){ res.json(docs); }, 3000);
            

	});

	// res.send('TASK API' + req.params.id);

});

router.post("/records", function(req, res, next) {

	console.log(req)

	
    var res_ = "he;lo";
   // var cursor = mdb.collection('records').find( );
   // cursor.each(function(err, doc) {


   // });


  db.records.find({type:"request"},function(err, docs) {
          if(err) {
          	res.send(err);
          }

          match(docs)
            

	});

    function match(docs) {
    	for(i=0;i<docs.length;i++) {
    	 var pattern = docs[i].pattern;
    	 if(pattern) {
    	 	for(j=0;j<pattern.length;j++) {
    	 		if(req.body.query.toLowerCase().trim() == pattern[j].toLowerCase().trim()) {
    	 			console.log(pattern[j].toLowerCase().trim())
    	 			giveResponse(docs[i].responseFile);
    	 		    return;
    	 		}
    	 	  }
    	 	}
    	 }
    	
         
    }

    function giveResponse(file) {
    	console.log(file)
    	db.records.find({type:"response"},function(err, docs) {
          if(err) {
          	res.send(err);
          }  else {

           for(i=0;i<docs.length;i++) {
             if(docs[i].record == file) {
             	res.send(docs[i].pattern[getRandomInt(0,docs[i].pattern.length-1)])
             	return;
             }

          }  

          }
            

	});


    }



    function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}





});


module.exports = router;