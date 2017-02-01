var app = angular.module("mainApp", []);
app.controller('mainCtrl', ['$scope', function($s){

	console.log("called ctrl");
	$s.action = null;
	$s.action_type = null;


	var action_table = {
	"action": [{
		"matches": ["show", "display", "give", "what"],
		"call_module": "123"
	}, {
		"matches": ["send", "forword"],
		"call_module": "123"
	}]
}


  var action_type_table = {
	"type": [{
		"matches": ["users", "members"],
		"call_module": "123"
	}, {
		"matches": ["mail", "message", "sms"],
		"call_module": "123"
	}]
}

  var greeting_table = {
	"greetings": [{
		"matches": ["hi", "how are you"],
		"call_module": "123"
	}]
};
  

  var concat_table = {
	"content": [{
		"matches": ["to"],
		"call_module": "123"
	}, {
		"matches": ["with"],
		"call_module": "123"
	}, {
		"matches": ["having"],
		"call_module": "123"
	},{
		"matches": ["of"],
		"call_module": "123"
	}
	]
}


$s.findAction = function() {
	$s.action == null;
    mystring = $s.queryText;
    arr = mystring.split(" ", 2);

    firstWord = arr[0];   //the
    theRest = arr[1]; 



    for(var i=0;i<action_table.action.length;i++) {
		    if((act = containsAny(firstWord,action_table.action[i].matches,false)) != null) {
                 $s.action = act;
                 var regex = new RegExp(act, "i");
    			 $s.queryText = $s.queryText.replace(regex,"");
                 return;
		    }

		    }
   
}

$s.findActionType = function() {
	$s.action_type = null;
	for(var i=0;i<action_type_table.type.length;i++) {
		    if((type = containsAny($s.queryText,action_type_table.type[i].matches,true)) != null) {
                 $s.action_type = type;

                 return;
		    }

		    }
}


function containsAny(str, strarray, remove) {
	console.log(str + " - " + strarray + " - " + remove)
    for (var i = 0; i != strarray.length; i++) {
       var substring = strarray[i];
       if ((at = str.indexOf(substring)) != - 1) {
       	console.log("enyeriung")
         if((str[at+substring.length] == ' ' || str[at+substring.length] == null) && (str[at-1] == ' ' || str[at-1] == null) ) {
           
            if(remove) {
            	console.log("enering remove  at:" + at)
            	var res1 = str.substring(0,at-1);
  			    var res2 = str.substring(at+substring.length,str.length);
  			    console.log(str + " - " + res1 + " - "  + res2)
  			    return {
  			    	substring:substring,
  			    	str:res1+res2
  			    };
            } else {
            	return substring;
            }
           }
            	
       }
            
          
    }
    return null; 
}

 $s.exeQuery = function(e) {
 	var code = (e.keyCode ? e.keyCode : e.which);
					if(code == 13) { //Enter keycode
                     $s.queryText = $s.query;


                     $s.findAction();
                     $s.findActionType();
                     console.log($s.action)
                     console.log($s.action_type)







					}
 }

  

  
	
}]);