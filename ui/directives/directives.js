app.directive('chatBot', ['$http', '$timeout', '$rootScope', function($http, $timeout, $rootScope){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
	    controller: function($scope, $element, $attrs, $transclude) {


             $scope.msgs = [];
             $scope.is_sub_info = false;
             $scope.sub_info_type = null;
             $scope.sub_info_data = null;
             $scope.isTrack = false;
             $scope.shortcut = false;
             $scope.shortcutType = null;

             


              //init vars
              $scope.isTypingMsg = false;  //flag to check typing msg is already exists 
			  $rootScope.chat_scroller = document.getElementById("chat-scroller");
			  $rootScope.chat_scroller_ele = (angular.element($scope.chat_scroller));

			  $scope.user_msg =  {
					   	   msg:null,
					   	   by:"me"
					   };

			  

			 

			  //$scope.typing = "<li class='msg bot' id='typing'>Typing..</li>";

			 // $scope.chat_scroller_ele.append(ele)

			  console.log($scope.msgs);

			  $scope.getModule = function (id) {
			  	//$scope.isTrack = true;
                 var res = $http.get("http://127.0.0.1:3004/api/bot/module");
                 res.success(function(data) {
                 	console.log(data[0].module)
                 	$scope.popTypingMsg();
                    $scope.msgs.push(data[0].module)
                    if(data[0].module.sub_info!=null)
                    	$scope.is_sub_info = true;
                    	$scope.sub_info_type = data[0].module.type;
                        $scope.sub_info_data = data[0].module.sub_info;
                    	$scope.performSuggestion(data[0].module.type,data[0].module.sub_info);
                 });
			  }


			  $scope.matchRegex = function(user_msg) {

			  	//option type
			  	console.log($scope.sub_info_type)
			  	if($scope.sub_info_type == 'option') {

			  		  var u = user_msg.trim().toLowerCase();
			  		  var b = $scope.sub_info_data.option;
			  		  for(var i=0;i<b.length;i++) {
			  		  	if(u.includes(b[i].name.trim().toLowerCase())) {
			  		  		if(u.length == b[i].name.length) {
			  		  			$scope.msgs.push({
							   	   msg:"You are selected " + user_msg,
							   	   by:"bot"
							   });

			  		  		  $scope.getModule(b[i].call_module)	
			  		  		}
			  		  	} else { //tracking failed , changed state
                           $scope.isTrack = false;
                           $scope.getRecords(user_msg);
			  		  	}
			  		  }



			  	}
			  }

			  $scope.getRecords = function (user_msg) {

			  	
                 
                 var data = { msg: user_msg}; 
                 if($scope.shortcut) {
                   data.shortcut = $scope.shortcutType;	
                   data.userId = $scope.userId;
               }
                 var res = $http.post("http://localhost:3004/api/bot/module",data);
                 res.success(function(data) {


                 	//reset flags
			  	$scope.shortcut = false;
                $scope.shortcutType = null;



                 	console.log(data)
                 	$scope.popTypingMsg();
                 	if(data) {
                    $scope.msgs.push({by:"bot",msg:data.module.msg});
                     if(data.module.sub_info!=null) {
                    	$scope.is_sub_info = true;
                    	$scope.sub_info_type = data.module.type;
                        $scope.sub_info_data = data.module.sub_info;
                    	$scope.performSuggestion(data.module.type,data.module.sub_info);
                   }
                     $scope.scrollToBottom();
                 }
                    console.log($scope.msgs)

                 });

			  }


			  $scope.performSuggestion = function(type, data) {
			  	console.log("type:" + type)
                  console.log(data)

                  if(type == 'option') {
                  	$scope.suggestion_template = "directives/templates/option.html";
                  	$scope.suggestion = true;
                  	$scope.suggestionData = data.option;
                  }

                  if(type == 'list') {
                  	$scope.suggestion_template = "directives/templates/list.html";
                  	$scope.suggestion = true;
                  	$scope.suggestionData = data.list;
                  }
                  if(type == 'user_card') {
                  	$scope.suggestion_template = "directives/templates/user_card.html";
                  	$scope.suggestion = true;
                  	$scope.suggestionData = data;
                  }


			  }

			  $scope.pushTypingMsg = function() {

			  	 //add typing div
					   // $rootScope.chat_scroller_ele.append($scope.typing)
					   //  $scope.chat_scroller.scrollTop = ($scope.chat_scroller.scrollHeight + 20);

                 if(!$scope.isTypingMsg) {
				  	 $scope.msgs.push({msg:"Getting Help..", mode:"typing"});
				     $scope.scrollToBottom();
				     $scope.isTypingMsg = true;
			   }
			  	
			  }

			  $scope.popTypingMsg = function() {

			  	 //remove typing div id if exists
			  	 if($scope.isTypingMsg) {
			            if($scope.msgs[$scope.msgs.length-1].mode == "typing") {
			            	$scope.msgs.pop();
			            	$scope.isTypingMsg = false;
			            }
			  	 }

			  }


			  $scope.scrollToBottom = function() {
			  	$scope.chat_scroller.scrollTop = ($scope.chat_scroller.scrollHeight + 20);
			  }


            $scope.openOptionModule = function(obj) {
             

            	$scope.suggestion = false;
            	$scope.user_msg.msg = obj.name;
            	$scope.msgs.push({
					   	   msg:obj.name,
					   	   by:"me"
					   });
            	$timeout(function() {

					  	
					    $scope.pushTypingMsg();
					

					  }, 1000);

            	

            }

            $scope.openListModule = function(obj) {
             

            	$scope.suggestion = false;
            	$scope.user_msg.msg = obj.name;
            	$scope.msgs.push({
					   	   msg:obj.name,
					   	   by:"me"
					   });
            	$timeout(function() {

					  	
					    $scope.pushTypingMsg();
					

					  }, 1000);

            	

            }

             $scope.openUserInfoModule = function(obj) {
             
                $scope.shortcut = true;
                $scope.shortcutType = "userInfo";
                $scope.userId = obj.id;
            	$scope.suggestion = false;
            	$scope.user_msg.msg = obj.name;
            	$scope.msgs.push({
					   	   msg:obj.name,
					   	   by:"me"
					   });
            	$timeout(function() {

					  	
					    $scope.pushTypingMsg();
					

					  }, 1000);

            	

            }



			  $scope.bindQuery = function(e) {

			  	var code = (e.keyCode ? e.keyCode : e.which);
					if(code == 13) { //Enter keycode

					$scope.suggestion = false; //hide suggestion section

					   
					   //check empty
					   if($scope.query.length == 0)
					   	return;

					  $scope.popTypingMsg();


					   $scope.msgs.push({
					   	   msg:$scope.query,
					   	   by:"me"
					   });
					   $scope.query = "";


					  


					   //scrooll to bottom
					   console.log($scope.chat_scroller.scrollHeight)
			           $scope.scrollToBottom();
					}
  				}



  				//call init module
  				$scope.getModule("588852f155488f5883cd9f63");
	    },
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'directives/templates/chat-bot.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
          
			  $scope.$watch('msgs', function (newValue, oldValue, scope) {
			  	if($scope.msgs.length>0) {
                       if($scope.msgs[$scope.msgs.length-1].by == 'me') {
					    
                          
                          if($scope.isTrack) {
                           	 $scope.matchRegex($scope.msgs[$scope.msgs.length-1].msg);
                          }  else {
                          	console.log("called")
                             $scope.getRecords($scope.msgs[$scope.msgs.length-1].msg);
                           }
                            
                        }	 else {
                        	$scope.popTypingMsg();
                        }
                    }

                 }, true);
			

			
			
		}
	};
}]);
































app.directive('ripple', ['$mdInkRipple', function($mdInkRipple){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		 restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			iElm.bind("click", function(ev) {

				 var dim = iAttrs.ripple;
				 if(dim == 'dim')
				 	dim = true;
				 else
				 	dim = false;

				 $mdInkRipple.attach($scope, angular.element(iElm[0]), {center: false, dimBackground: dim});

			});
			
		}
	};
}]);
