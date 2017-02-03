var parser_ = require('./../class/parser');
var Users = require('./users')
var parser = new parser_();


var Exe = function(router) {
   this.req = router[0];
   this.res = router[1];
   this.next = router[2];
   this.users = new Users(router);
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

                                    if(this.checkGreeting($s.queryText))
                                       return;

                                    console.log("entering next line")
                                    var p_ = parser.findAction($s.queryText);
                                    $s.action = p_.act;
                                    $s.queryText = p_.q;
                                    $s.res_case = p_.res_case;


                                    p_ = parser.findActionType($s.queryText);
                                    if(p_!=null) {
                                    $s.action_type = p_.act_type;
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

                                    this.startChecking();

         }

          this.checkGreeting = function(query) {
          
             var p_ = parser.findGreetingTable(query);
                                    if(p_!=null) {
                                       this.res.json({module:{id:1,msg:p_.greetText}});
                                       return true;
                                    } else {
                                       return false;
                                    }

         }

         this.startChecking = function() {
            if($s.action_type == null) {
          
              if($s.action!=null) {

                if($s.res_case == "question") {
                  if($s.last_str == null || $s.last_str.length==0) {
                  this.res.json({module:{id:1,msg:"Sorry, I am unable to understand your language!! try something usefull!"}})
               } else {
                  var params = {}
                  this.users.getUsers($s.concat, $s.last_str)
               }


                } else if($s.res_case == "yesorno") {
                  this.res.send("yes or no : filter:" +  $s.last_str)

                }



              } else {
               //list users or projects
              }
 

            } else {

            if($s.res_case == "question") {
                  this.res.send("Question : type=" + $s.action_type + ",filter:" + $s.last_str)

                } else if($s.res_case == "yesorno") {
                  this.res.send("yes or no :type=" + $s.action_type + ",filter:" + $s.last_str)

                }

            }
         }

         this.initShortcutModule = function() {
            console.log(this.req.body.shortcut)

             if(this.req.body.shortcut == "userInfo") {
                  this.users.getUsersShortCutInfo(this.req.body.userId)
             }
   


         }

}


module.exports = Exe;