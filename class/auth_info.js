var request = require("request");
var rp = require('request-promise');


var Auth = function() {
	 var auth = {
				  "password": "KRs4T",
				  "username": "srinivasan.g@accionlabs.com"
				};


    //set-cookie headers in = {returnId}.response.caseless.dict['set-cookie'];
   this.getAuth = function() {
   	   var data1 = auth;

			 var options = {
				  url: 'http://aic1.accionlabs.com/locallogin',
				  method:"POST",
				  form:data1

				};

    	return rp(options);
   }				
}

module.exports = Auth;