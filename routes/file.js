var fs = require('fs');
var express = require('express');
var router = express.Router()
var file_location = 'json/custom_table.json';

router.post('/insert', function(req, res, next) {

    var data = ',' + JSON.stringify(req.body);
    console.log(data)
    fs.appendFile(file_location, data, (err) => {
		  if(err) { 
		  	res.json({success:0,msg:"insertion failed!"});
		  	throw err;
		  } else {
		  	console.log('The "data to append" was appended to file!');
		  	res.json({success:1,msg:"inserted successfully"});
		  }
		  
		});
  

});

module.exports = router;

router.get('/read', function(req, res, next) {

    var data = ',' + JSON.stringify(req.body);
    console.log(data)
    fs.readFile(file_location, (err, data) => {
		  if (err) { throw err; }
		  else {
		  data = String(data);
		  var i = data.indexOf("{");
		  data = data.slice(i);
		  data = `{"custom_table" : [` + data + `]}`;
		  res.json(data);
		}
    });
  

});




