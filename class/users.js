
var request = require("request");

var Users = function(router) {
   var router_req = router[0];
   var router_res = router[1];
   var router_next = router[2];

    this.getUsers = function(params, name) {
       // console.log(this.res)
        console.log(name)

			 var data1 = {
				  "password": "KRs4T",
				  "username": "srinivasan.g@accionlabs.com"
				};

			 var options = {
				  url: 'http://aic1.accionlabs.com/locallogin',
				  method:"POST",
				  form:data1

				};
				 
			 function callback(error, response, body) {
				  
				  // console.log(response);
				   //console.log(response);
				   var token = response.headers['set-cookie'][0];
				   token = token.slice(token.indexOf("=")+1).slice(0,token.indexOf(";"));
				   token = token.slice(0,token.indexOf(";"));
				   //res.send(token)
				  // console.log(error);

				  var options1 = {
				  url: 'http://aic1.accionlabs.com/search?searchTxt='+name,
				  method:"GET",
				  headers: {
				    'Cookie': response.headers['set-cookie'] 
				  }
				};

				   request(options1, callback1);

				  function callback1(error, response, body) {
                   var a = JSON.parse(body);
                   var r_ = {module:{
                                msg:"Total " + a.profiles.length + " Results, Select which " + name + " you want!",
                                sub_info:a.profiles,
                                type:"user_list",
                                track:true
                   			}};
				   router_res.json(r_)
				  }

				}
				 
				request(options, callback);



    }


     this.getUsersShortCutInfo = function(id) {
       // console.log(this.res)

			 var data1 = {
				  "password": "KRs4T",
				  "username": "srinivasan.g@accionlabs.com"
				};

			 var options = {
				  url: 'http://aic1.accionlabs.com/locallogin',
				  method:"POST",
				  form:data1

				};
				 
			 function callback(error, response, body) {
				  
				  // console.log(response);
				   //console.log(response);
				   var token = response.headers['set-cookie'][0];
				   token = token.slice(token.indexOf("=")+1).slice(0,token.indexOf(";"));
				   token = token.slice(0,token.indexOf(";"));
				   //res.send(token)
				  // console.log(error);

				  var options1 = {
				  url: 'http://aicstage.accionlabs.com/profile/' + id,
				  method:"GET",
				  headers: {
				    'Cookie': response.headers['set-cookie'] 
				  }
				};

				   request(options1, callback1);

				  function callback1(error, response, body) {
                   var a = JSON.parse(response.body);
                   console.log(a)
                   a.msg_style = "user-info-card";
                   var r_ = {module:{
                                msg:a
                   			}};
				   router_res.json(r_)
				  }

				}
				 
				request(options, callback);



    }
}

module.exports = Users;