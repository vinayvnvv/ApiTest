
var request = require("request");
var rp = require('request-promise');
var Auth = require('./auth_info')

var auth = new Auth();

var Users = function(router) {
   var router_req = router[0];
   var router_res = router[1];
   var router_next = router[2];

    this.getUsers = function(params, name) {


    	var res_ = auth.getAuth();
    	res_.then(function(response) {

    		  var options1 = {
				  url: 'http://aic1.accionlabs.com/search?searchTxt='+name,
				  method:"GET",
				  headers: {
				    'Cookie': res_.response.caseless.dict['set-cookie']
				  }
				};

				var res__ = rp(options1) ;
				res__.then(function(response) {
                   var a = JSON.parse(response);
                   if(a.profiles.length == 0) {
                   	     var r_ = {module:{
		                                msg:"Sorry ! No user with specified name!!"
		                   			}};
						   router_res.json(r_)

                   } else {
		                   var r_ = {module:{
		                                msg:"Total " + a.profiles.length + " Results, Select which " + name + " you want!",
		                                sub_info:a.profiles,
		                                type:"user_list",
		                                track:false
		                   			}};
						   router_res.json(r_)
				   }
				});

    	});
       

			 



    }


     this.getUsersShortCutInfo = function(id) {

     	   var res_ = auth.getAuth();
		    	res_.then(function(response) {
                    var options1 = {
						  url: 'http://aic1.accionlabs.com/profile/' + id,
						  method:"GET",
						  headers: {
						    'Cookie': res_.response.caseless.dict['set-cookie']
						  }
						};

						var res__ = rp(options1);
						res__.then(function(response) {
                                       var a = JSON.parse(response);
					                   a.msg_style = "user-info-card";
					                   var before = [{msg:"here is the details of " + a.name}];
					                   var m_ = {
					              		by:"bot",
					              		msg:"You can also ask --",
					              		type:"list",
					              		sub_info:{
					              			items:[
					              			      {
					              			      	name:"who is ramesh?",
					              			      },
					              			      {
					              			      	name:"Hello Bot!"
					              			      },
					              			      {
					              			      	name:"Good Morning Bot!"
					              			      }
					              			  ]
					              		}
					              	}
					                   var after = [m_];
					                   var r_ = {module:{
					                                msg:a,
					                                beforeMsg : before,
					                                afterMsg : after
					                   			}};
									   router_res.json(r_);
						});
                      res__.catch(function(err) {
                           console.log(err)
                      });
		    	}); 
				 
			 



    }

    this.fetchUsersList = function(user) {
        var res_ = auth.getAuth();
    	return res_.then(function(response) {

    		  var options1 = {
				  url: 'http://aic1.accionlabs.com/search?searchTxt='+user,
				  method:"GET",
				  headers: {
				    'Cookie': res_.response.caseless.dict['set-cookie']
				  }
				};

				return rp(options1) ;
			});
    }


    this.Test = function (rr) { 

    	var res_ =  auth.getAuth();
    	res_.then(function(response) {
             var a = res_.response.caseless.dict['set-cookie'];
    		 rr.send(a)

		   //         



    	});
    	res_.catch(function(res) {
    		//console.log(res)
           return res_;
    	});
    }
}

module.exports = Users;