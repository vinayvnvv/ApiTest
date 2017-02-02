var express = require('express');
var request = require("request");
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var mongo = require('mongojs');
var db = mongo('mongodb://127.0.0.1:27017/test', ['test','records']); //var db = mongo('mongodb://vinaybv:gamapath@ds139288.mlab.com:39288/apitest', ['apitest']);
var mdb = db;


var table = require('./../class/tables');
var Exe = require('./../class/exe');

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {

	mdb = db;

	});


  var action_table = table.action_table;
  var action_type_table = table.action_type_table;
  var greeting_table = table.greeting_table;
  var concat_table = table.concat_table;
  var extra_ch_table = table.extra_ch_table;





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

 router.post("/module", function(req, res, next) {
  console.log(res)
  
//init()

var exe = new Exe([req,res,next])
if(req.body.shortcut == undefined) {
exe.initModule();
} else {
  exe.initShortcutModule();
}

// var data1 = {
//   "password": "KRs4T",
//   "username": "srinivasan.g@accionlabs.com"
// };

//   var options = {
//   url: 'http://aic1.accionlabs.com/locallogin',
//   method:"POST",
//   form:data1

// };
 
// function callback(error, response, body) {
  
//   // console.log(response);
//    //console.log(response);
//    var token = response.headers['set-cookie'][0];
//    token = token.slice(token.indexOf("=")+1).slice(0,token.indexOf(";"));
//    token = token.slice(0,token.indexOf(";"));
//    //res.send(token)
//   // console.log(error);

//   var options1 = {
//   url: 'http://aic1.accionlabs.com/search',
//   method:"GET",
//   headers: {
//     'Cookie': response.headers['set-cookie'] 
//   }
// };

//    request(options1, callback1);

//   function callback1(error, response, body) {

//     res.json(response)
//   }

// }
 
// request(options, callback);


});




module.exports = router;