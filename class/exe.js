var request = require("request");
var rp = require('request-promise');
var parser_ = require('./../class/parser');
var custom_parser_ = require('./../class/custom_parser');
var users_class = require('./users')
var parser = new parser_();
var custom_parser = new custom_parser_();


var Exe = function(router) {
   this.req = router[0];
   this.res = router[1];
   this.next = router[2];
   var routerRes = this.res;
   var Users = new users_class(router);
   var $s = {
      action:null,
      action_type:null,
      concat:null,
      res_case:null,
      last_str:null
   }; 
         this.initModule = function() {

                 $s.queryText = this.req.body.msg.replace(/\s\s+/g, ' ').toLowerCase(); // init by removing multiple spaces
                                    
                                    // this.res.send($s.action_type)
                                     checkCustomParse(function(match) {
                                          if(!match) defaultParse();

                                          console.log("not matched")


                                          
                                     });


                                    // if(this.checkGreeting($s.queryText))
                                    //    return;

         }

          function checkCustomParse(callback) {

             custom_parser.parseCustomQuery($s.queryText, function(obj) {
                 if(obj!=null) {
                              routerRes.json(obj);
                              return callback(true);
                    } else {
                      callback(false);
                    }                  

             });

          }


          function defaultParse() {

                if(checkGreeting($s.queryText)) return;

                 console.log("entering next line")
                  var p_ = parser.findAction($s.queryText);
                  if(p_!=null) {
                  $s.action = p_.act;
                  $s.queryText = p_.q;
                  $s.res_case = p_.res_case;
               }


                  p_ = parser.findActionType($s.queryText);
                  if(p_!=null) {
                  $s.action_type = p_.act_type;
                  $s.action_type_of_match = p_.type_of_match;
                  console.log("type of mtch:" + $s.action_type_of_match)
                  $s.queryText = p_.q;
                }


                  p_ = parser.findConcat($s.queryText);
                  $s.concat = p_.coct;
                  $s.queryText = p_.q;

                  $s.queryText = parser.removeExtra($s.queryText);


                  console.log($s.action)
                  console.log($s.action_type)
                  console.log("*************\nparameter mapping")
                  console.log($s.concat)
                  console.log("*************")
                  console.log($s.queryText);

                  $s.last_str = parser.forceExtractQuery($s.queryText)
                  console.log("filter for: " + $s.last_str)

                  startChecking();



          }


          function checkGreeting(query) {
          
             var p_ = parser.findGreetingTable(query);
                      if(p_!=null) {
                        console.log("quote enable:" + p_.is_quote)
                            if(p_.is_quote == true)  {//send random bye quote

                               rp("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=").then(function(res){
                               // console.log(res);
                                var aftr = [{msg:"i have a quote for You : "},{msg:JSON.parse(res)[0].content}, {msg:"by - " + JSON.parse(res)[0].title}];
                                routerRes.json({module:{id:1,msg:p_.greetText,afterMsg:aftr}});
                             })   
                             
                             
                            } else {
                               routerRes.json({module:{id:1,msg:p_.greetText}});
                            } 
                            return true;
                      } else {
                           return false;
                      }

         }

         function startChecking() {
            if($s.action_type == null) {
          
              if($s.action!=null) {

                if($s.res_case == "question") {
                  if($s.last_str == null || $s.last_str.length==0) {
                  routerRes.json({module:{id:1,msg:"Sorry, I am unable to understand your language!! try something usefull!"}})
               } else {
                  var params = {}
                  Users.getUsers($s.concat, $s.last_str)
               }


                } else if($s.res_case == "yesorno") {
                  routerRes.send("yes or no : filter:" +  $s.last_str)

                }



              } else {
               //list users or projects
              }
 

            } else {

               if($s.action_type_of_match == 'work') {





                   var res_ = this.users.fetchUsersList($s.last_str);
                  // var dd = this.users.Test(this.res);
                   
                   res_.then(function(res__) {
                              

                               var a = JSON.parse(res__);
                                  if(a.profiles.length == 0) {
                                             var r_ = {module:{
                                                        msg:"Sorry ! No user with specified name!!"
                                                }};
                                   router_res.json(r_)

                                    } else {
                                           var r_ = {module:{
                                                        msg:"Which " + $s.last_str + " you are asking About?  ",
                                                        sub_info:a.profiles,
                                                        type:"user_list",
                                                        track:false
                                                }};
                                   routerRes.json(r_)
                                 }

                       

                   });
                   res_.catch(function(res) {
                      console.log(res)
                   });
                   console.log("data__")

                   
               }

            // if($s.res_case == "question") {
            //       //this.res.send("Question : type=" + $s.action_type + ",filter:" + $s.last_str)

            //     } else if($s.res_case == "yesorno") {
            //       //this.res.send("yes or no :type=" + $s.action_type + ",filter:" + $s.last_str)

            //     }

            }
         }

         this.initShortcutModule = function() {
            console.log(this.req.body.shortcut)

             if(this.req.body.shortcut == "userInfo") {
                  Users.getUsersShortCutInfo(this.req.body.userId)
             }
   


         }

}


module.exports = Exe;