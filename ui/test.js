var app = angular.module("mainApp", []);
app.controller('mainCtrl', ['$scope', '$http', function($s, $http){

var data1 = {"msg":"what the phone of srini ?", "username":"srinivasan.g@accionlabs.com"};







// var res = $http({method: "POST", url: 'http://aicstage.accionlabs.com/locallogin', 
// 	headers: { 'withCredentials': 'false'} , params : data1 
// });
// res.then(function(val, s, h){
// 	console.log(h);
// })


   $s.text = ["vinay"];



	console.log("called ctrl");
	$s.action = null;
	$s.action_type = null;


	var action_table	 = {
	"action": [{
		"matches": ["show", "display", "give"],
		"call_module": "123"
	}, {
		"matches": ["send", "forword"],
		"call_module": "123"
	},{
		"matches": ["who", "does","where","which","what"],
		"call_module": "123"
	}]
}


  var action_type_table = {
	"type": [{
		"matches": ["users", "members", "skills", "skill"],
		"call_module": "123"
	}, {
		"matches": ["mail", "message", "sms", "phone", "email"],
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
	"concats": [{
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
	},{
		"matches": ["in"],
		"call_module": "123"
	}, {
		"matches": ["at"],
		"call_module": "123"
	}
	]
}

var extra_ch_table = {
	"extra": [{
		"matches": ["is","at","are","the"],
		"call_module": "123"
	},
	{
		"matches": ["office","email","mail","phone", "works","work"],
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
                 $s.action_type = type.substring;
                 $s.queryText = type.str;
                 
                 return;
		    }

		    }
}

$s.findConcat = function() {
	$s.concat = [];
	for(var i=0;i<concat_table.concats.length;i++) {
		    if((concat = mapConcat($s.queryText,concat_table.concats[i].matches)) != null) {
                 if(concat != null ) {
                 	$s.concat.push(concat.map);
                 	$s.queryText = concat.str;
                 }
		    }

		    }
}



function containsAny(str, strarray, remove) {
	console.log(str + " - " + strarray + " - " + remove)
    for (var i = 0; i != strarray.length; i++) {
       var substring = strarray[i].toLowerCase();
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

function mapConcat(str, strarray) {
    for (var i = 0; i != strarray.length; i++) {
       var ch = strarray[i];
       var regex = new RegExp("(.*)(\\s" + ch + "\\s([a-z]*))", "i");
       var match = str.match(regex);
		       if(match!=null) {

		       	str = str.replace(match[2],'');

		       	 return {
		       	 	map:{
		       	 		map:ch,
		       	 		value:match[3]
		       	 	},
		       	 	str:str
		       	 }

		          
		    }
       }
       return null;
}

$s.removeExtra = function() {
	for(var i=0;i<extra_ch_table.extra.length;i++) {
		    if((type = containsAny($s.queryText,extra_ch_table.extra[i].matches,true)) != null) {
                 $s.queryText = type.str;
		    }

		    }
}


 $s.exeQuery = function(e) {
 	var code = (e.keyCode ? e.keyCode : e.which);
					if(code == 13) { //Enter keycode
                     $s.queryText = $s.query.replace(/\s\s+/g, ' ').toLowerCase(); // init by removing multiple spaces


                     $s.findAction();
                     $s.findActionType();
                     $s.findConcat();
                     $s.removeExtra();
                     console.log($s.action)
                     console.log($s.action_type)
                     console.log($s.concat)
                     console.log($s.queryText);







					}
 }

  

  
	
}]);

app.directive('autoInput', ['$compile', function($compile){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			data : "=ngModel"
		}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {

			$scope.$initialized = false;
			$scope.data_dup = $scope.data;
			$scope.data_dup_at_remove = [];
			for(var i=0;i<$scope.data.length;i++) $scope.data_dup_at_remove.push(false);
			$scope.removeTemplate = "<span class='auto_input_remove' ng-if>Remove</span>";
           $scope.appendEle = function(template) {

				 var el = $compile(template)( $scope );
                 $element.parent().append(el);

			}

			$scope.templateAt = function(i) {

			   var e_tem = $scope.removeTemplate.replace("ng-if","ng-if='data_dup[" + i + "] != null' ng-click='data_dup[" + i + "] = null' ng-hide='data_dup_at_remove[" + i + "]'");
               return "<div ng-if='data_dup[" + i + "] != null'" + $scope.template.replace(/data-array\=['"]\$index['"]/,"ng-model='data_dup[" + i + "]' ng-if='data_dup[" + i + "] != null'") + e_tem + "</div>"	;
			}

			$scope.init = function() {
				var template;
				for(var i=0;i<$scope.data_dup.length;i++) {
					template = $scope.templateAt(i);
					$scope.appendEle(template);
				}

				
			}

		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			$scope.template = String.prototype.valueOf.call(iElm[0].innerHTML);
			iElm[0].innerHTML = "";

            //$scope.appendEle(template)
			//iElm[0].innerHTML = template;



			

            
			
			console.log("called auto")
			console.log($scope.data_dup[$scope.data_dup+1])
			console.log($scope.template)


			$scope.init();

			 $scope.$watch('data_dup', function(newValue, oldValue) {
                          	if($scope.data_dup[$scope.data_dup.length-1].length>0) {
                          			$scope.appendEle($scope.templateAt($scope.data_dup.length, true));
                          			$scope.data_dup[$scope.data_dup.length] = '';
                          			$scope.data_dup_at_remove.push(true);
                          			console.log($scope.data_dup_at_remove);
                          			$scope.data_dup_at_remove[$scope.data_dup_at_remove.length-2] = false;
                          			console.log($scope.data_dup_at_remove);
                          			
                          	}
                          
                          $scope.data = $scope.data_dup.filter(function(d) { return (d!='' && d!=null) ;});
                          

                          }, true);
		}
	};
}]);