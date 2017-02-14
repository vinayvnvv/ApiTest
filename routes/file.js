var fs = require('fs');
var uniqid = require('uniqid');
var express = require('express');
var router = express.Router()
var file_location = 'json/custom_table.json';

router.post('/insert', function(req, res, next) {

	req.body.id_ = uniqid();

	setTimeout(addModule, 2000);


	function addModule() {
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

	}

    
  

});


router.get('/read', function(req, res, next) {
    
    setTimeout(readModule, 3000);
    function readModule() {
    	fs.readFile(file_location, (err, data) => {
		  if (err) { throw err; }
		  else {
		  data = String(data);
		  data = data.slice(data.indexOf("{"), data.lastIndexOf("}") + 1);
		  data = `{"custom_table" : [` + data + `]}`;
		  console.log(data)
		  res.json(data);
		}
    });
    }
  

});

router.post('/edit/:id', function(req, res, next) {

	console.log("module id" + req.params.id);

    //var data = ',' + JSON.stringify(req.body);

    setTimeout(editModule, 2000);

    function editModule () {

    	fs.readFile(file_location, (err, data) => {
		  if (err) { throw err; }
		  else {
		  data = String(data);
		  var i = data.indexOf("{");
		  data = data.slice(i);
		  data = `[` + data + `]`;
		  data = JSON.parse(data);
		  for(var i;i<data.length;i++) {
               if(data[i].id_ == req.params.id) {
               	   data[i] = req.body;
               	   data[i].id_ = req.params.id;
               	   break;
               }
		  }
		  data = JSON.stringify(data);
		  data = data.slice(data.indexOf("{"),data.lastIndexOf("}")+1);

		  console.log(data)
		  //res.json(data);

		  fs.writeFile(file_location, data, (err) => {
			  if (err) { throw err }
			  else {

			  	res.json({success:1,msg:"Updated successfully!"})
			         
				}
			});
		}
    });

    }
    
    
  

});

router.delete('/delete/:id', function(req, res, next) {

	console.log("delete module id" + req.params.id);

    //var data = ',' + JSON.stringify(req.body);
    
    fs.readFile(file_location, (err, data) => {
		  if (err) { throw err; }
		  else {
		  data = String(data);
		  var i = data.indexOf("{");
		  data = data.slice(i);
		  data = `[` + data + `]`;
		  data = JSON.parse(data);
		  console.log(data.length)
		  for(var i;i<data.length;i++) {
               if(data[i].id_ == req.params.id) {
               	console.log("***********************	")
               	   data.splice(i, 1);
               	   break;
               }
		  }
		  console.log(data.length)
		  data = JSON.stringify(data);
		  data = data.slice(data.indexOf("{"),data.lastIndexOf("}")+1);

		  console.log(data)
		  //res.json(data);

		  fs.writeFile(file_location, data, (err) => {
			  if (err) { throw err }
			  else {
			         res.json({success:1,msg:"Deleted successfully!"})
				}
			});
		}
    });
  

});





module.exports = router;





