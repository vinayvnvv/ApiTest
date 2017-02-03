var table = require('./tables');


  var action_table = table.action_table;
  var action_type_table = table.action_type_table;
  var greeting_table = table.greeting_table;
  var concat_table = table.concat_table;
  var extra_ch_table = table.extra_ch_table;

var Parser = function () {


    this.fullName = function () { 
        return this.firstName + ' ' + this.lastName;
    }


    this.mapConcat = function (str, strarray) {
    for (var i = 0; i != strarray.length; i++) {
       var ch = strarray[i];
       var regex = new RegExp("(.*)(\\s" + ch + "\\s([a-z]*))", "i");
       var match = str.match(regex);
           if(match!=null) {

            str = str.replace(match[2],'');

             return {
              map:{
                type:ch,
                value:match[3]
              },
              str:str
             }

              
        }
       }
       return null;
}



    /* parameters
              str : query to match
              strarray : array of words to match with queries
              force to loop : check all the word matches
              trim_both : match only words
              remove : remove word if matches
    */
    this.containsAny = function(str, strarray, remove , force_to_loop, trim_both) {
    	if(force_to_loop == undefined) force_to_loop = false;
    	if(trim_both == undefined) trim_both = false;
		  console.log(str + " - " + strarray + " - " + remove)
		    for (var i = 0; i != strarray.length; i++) {
		       var substring = strarray[i].toLowerCase();
		       if ((at = str.indexOf(substring)) != - 1) {
		        console.log("enyeriung")
		         if((str[at-1] == ' ' || str[at-1] == null) ) {  //removed cond  = str[at+substring.length] == ' ' || str[at+substring.length] == null) && 
		            if(trim_both){ if(!(str[at+substring.length] == ' ' || str[at+substring.length] == null)) continue;}   //check for word only
		            if(remove) {
				              console.log("enering remove  at:" + at)
				              var res1 = str.substring(0,at-1);
				              var res2 = str.substring(at+substring.length,str.length);
				              console.log(str + " - " + res1 + " - "  + res2)
				              if(!force_to_loop) {
						            	return {
						              substring:substring,
						              str:res1+res2
						            };
					            } else {
					            	  str = res1+res2;
					            }
		            } else {
				              return substring;
				            }
		           }
		              
		       }
		            
		          
		    }	
		    if(force_to_loop)
		    	return {str:str};
		    return null; 
		}

		this.removeExtra = function(string) {
				  for(var i=0;i<extra_ch_table.extra.length;i++) {
				        if((type = this.containsAny(string,extra_ch_table.extra[i].matches,true,true,true)) != null) {
				                 string = type.str;
				        }

				        }
				   return string;     
    	}



    	  this.findAction = function(qText) {
			  var action = null;
			    mystring = qText;
			    arr = mystring.split(" ", 2);

			    firstWord = arr[0];   //the
			    theRest = arr[1]; 



			    for(var i=0;i<action_table.action.length;i++) {
			        if((act = this.containsAny(qText,action_table.action[i].matches,false)) != null) {
			                 action = act;
			                 var regex = new RegExp(act, "i");
			          		 qText = qText.replace(regex,"");
			                 return {q:qText, act:action, res_case:action_table.action[i].res_case};
			        }

			        }
   
		}

		this.findGreetingTable = function(qText) {
			  for(var i=0;i<greeting_table.greetings.length;i++) {
			        if((greet = this.containsAny(qText,greeting_table.greetings[i].matches,true)) != null) {
			                 greetText = greet.substring;
			                 qText = greet.str;
			                 var rand_gt = greeting_table.greetings[i].resMsg[this.getRandomInt(0,greeting_table.greetings[i].resMsg.length-1)]
			                 return {greetText:rand_gt,q:qText};
			        }

			        }
		}

		this.findActionType = function(qText) {
			  var action_type = null;
			  for(var i=0;i<action_type_table.type.length;i++) {
			        if((type = this.containsAny(qText,action_type_table.type[i].matches,true)) != null) {
			                 action_type = type.substring;
			                 qText = type.str;
			                 
			                 return {act_type:action_type,q:qText};
			        }

			        }
		}


	  this.findConcat = function(qText) {
			  var concat_ = [];
			  for(var i=0;i<concat_table.concats.length;i++) {
			        if((concat = this.mapConcat(qText,concat_table.concats[i].matches)) != null) {
			                 if(concat != null ) {
			                  concat_.push(concat.map);
			                  qText = concat.str;
			                 }
			        }

			        }

			     return {coct:concat_,q:qText};   
		}

		this.forceExtractQuery = function (qText) {

		    return qText.trim().match(/([a-z])*/)[0];
		   
		}

		this.getRandomInt = function(min, max) {
   			 return Math.floor(Math.random() * (max - min + 1)) + min;
		}





}

module.exports = Parser;