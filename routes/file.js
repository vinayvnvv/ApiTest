var fs = require('fs');
var express = require('express');
var router = express.Router()


router.post('/insert', function(req, res, next) {

    var data = ',' + JSON.stringify(req.body);
    console.log(data)
    fs.appendFile('json/custom_table.json', data, (err) => {
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

