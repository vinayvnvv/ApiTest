app.directive('chatBot', ['$http', '$timeout', '$rootScope', 'Parser', '$compile', function($http, $timeout, $rootScope, Parser, $compile){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {}, // {} = isolate, true = child, false/undefined = no change
	    controller: function($scope, $element, $attrs, $transclude) {

	    	 


             $scope.msgs = [];
             $scope.is_sub_info = false;
             $scope.sub_info_type = null;
             $scope.sub_info_data = null;
             $scope.isTrack = false;
             $scope.shortcut = false;
             $scope.shortcutType = null;

             


     //          //init vars
     //          $scope.isTypingMsg = false;  //flag to check typing msg is already exists 
			  // $rootScope.chat_scroller = document.getElementById("chat-scroller");
			  // $rootScope.chat_scroller_ele = (angular.element($scope.chat_scroller));



			  $scope.chat_scroller = angular.element($element["0"].children["0"].children.item(1));

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
                 	//parser the msg before push

		            

                    $scope.msgs.push(data[0].module)
                    if(data[0].module.sub_info!=null)
                    	$scope.is_sub_info = true;
                    	$scope.sub_info_type = data[0].module.type;
                        $scope.sub_info_data = data[0].module.sub_info;
                    	$scope.performSuggestion(data[0].module.type,data[0].module.sub_info);
                 });
			  }

              $scope.initBot = function() {
              	var m_ = {
              		by:"bot",
              		msg:"Welcome! I am Your Assistant, How can I Help You?",
              		type:"option",
              		sub_info:{
              			option:[
              			      {
              			      	name:"who ramesh?",
              			      },
              			      {
              			      	name:"Hello"
              			      }
              			  ]
              		}
              	}
              	$scope.playSound("bot");
              	$scope.msgs.push(m_);
              			$scope.is_sub_info = true;
                    	$scope.sub_info_type = m_.type;
                        $scope.sub_info_data = m_.sub_info;
                    	$scope.performSuggestion(m_.type,m_.sub_info);
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

			  	console.log("called getRecords")

			  	
                 
                 var data = { msg: user_msg}; 
                 if($scope.shortcut) {
                   data.shortcut = $scope.shortcutType;	
                   data.userId = $scope.userId;
               }
                 var res = $http.post("http://localhost:3004/api/bot/module",data);
                 res.success(function(data) {

                 	//play bot sound
                 	$scope.playSound("bot")

                 	console.log(typeof (data.module.msg))
                 	if((typeof data.module.msg) == "string")
                 			data.module.msg = Parser.parseMsg(data.module.msg);


                 	//reset flags
			  	$scope.shortcut = false;
                $scope.shortcutType = null;

                 	$scope.popTypingMsg();
                 	if(data) {
                 	console.log(data.module.msg)

                 	//check msgs to display before pushing original msgs
                 	$scope.checkBeforePushMsgs(data.module);

                    $scope.msgs.push({by:"bot",msg:data.module.msg});
                     if(data.module.sub_info!=null) {
                     	$scope.checkSubInfo(data.module);
                   }
                     
                 }
                    console.log($scope.msgs)

                    //check msgs to display after pushing original msgs
                 	$scope.checkAfterPushMsgs(data.module);


                 });


                 



             }


             $scope.checkSubInfo = function(data) {
             		    $scope.is_sub_info = true;
                    	$scope.sub_info_type = data.type;
                        $scope.sub_info_data = data.sub_info;
                    	$scope.performSuggestion(data.type,data.sub_info);
                    	$scope.scrollToBottom();
             }

			  $scope.checkAfterPushMsgs = function(data) {
			  	if(data.afterMsg != null) {
			  		for(var i=0;i<data.afterMsg.length;i++) {
			  			$scope.msgs.push({by:"bot", msg:data.afterMsg[i].msg})
					  			if(data.afterMsg[i].sub_info!=null) {
		                     		$scope.checkSubInfo(data.afterMsg[i]);
		                       }
			  		}
			  	}
			  }


			  $scope.checkBeforePushMsgs = function(data) {
			  	console.log(data.beforeMsg)
			  	if(data.beforeMsg != null) {
			  		for(var i=0;i<data.beforeMsg.length;i++) {
			  			$scope.msgs.push({by:"bot", msg:data.beforeMsg[i].msg})
			  		}
			  	}
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
                  if(type == 'user_list') {
                  	$scope.suggestion_template = "directives/templates/user_card.html";
                  	$scope.suggestion = true;
                  	$scope.suggestionData = data;
                  }


			  }

			  $scope.pushTypingMsg = function() {

			  	 $scope.typing = "block";
			  	
			  }

			  $scope.popTypingMsg = function() {

			  	$scope.typing = "none";

			  }


			  $scope.scrollToBottom = function() {
			  	$scope.chat_scroller[0].scrollTop = ($scope.chat_scroller[0].scrollHeight + 20);
			  }


            $scope.openOptionModule = function(obj) {
             

            	$scope.suggestion = false;
            	$scope.user_msg.msg = obj.name;
            	$scope.msgs.push({
					   	   msg:obj.name,
					   	   by:"me"
					   });
       //      	$timeout(function() {

					  	
					  //   $scope.pushTypingMsg();
					

					  // }, 1000);

            	

            }

            $scope.openListModule = function(obj) {
             

            	$scope.suggestion = false;
            	$scope.user_msg.msg = obj.name;
            	$scope.msgs.push({
					   	   msg:obj.name,
					   	   by:"me"
					   });
       //      	$timeout(function() {

					  	
					  //   $scope.pushTypingMsg();
					

					  // }, 1000);

            	

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
            	
       //      	$timeout(function() {

					  	
					  //   $scope.pushTypingMsg();
					

					  // }, 1000);

            	

            }


            $scope.playSound = function (who) {
            	if(who == "user") {
	            	var audio = new Audio('sound/user.mp3');
					audio.play();
				} else {
					var audio = new Audio('sound/bot.mp3');
					audio.play();
				}
            }

              $scope.bindQueryOnClick = function() {
              	$scope.bindQuery();
              }

              $scope.bindQuery = function() {
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
              }

			  $scope.bindQueryOnPress = function(e) {

			  	var code = (e.keyCode ? e.keyCode : e.which);
					if(code == 13) { //Enter keycode
					
                          $scope.bindQuery();
					}
  				}



  				//call init module
  				//$scope.getModule("588852f155488f5883cd9f63");
  				$timeout(function() {$scope.initBot();}, 1000);
	    },
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'directives/templates/chat-bot.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			 $scope.custom_parent_style = iAttrs.customParentStyle;
			 $scope.chat_custom_height = "height:" + iAttrs.customHeight + "px";
			 $scope.scroller_custom_height = "height:" + (parseInt(iAttrs.customHeight)-105) + "px";
          
			  $scope.$watch('msgs', function (newValue, oldValue, scope) {


			  	$timeout(function() {$scope.scrollToBottom();}, 100);
			  	if($scope.msgs.length>0) {
                       if($scope.msgs[$scope.msgs.length-1].by == 'me') {


                       	$scope.playSound("user");
					    
                          
                          if($scope.isTrack) {
                           	 $scope.matchRegex($scope.msgs[$scope.msgs.length-1].msg);
                          }  else {
                          	console.log("called")
                             $scope.getRecords($scope.msgs[$scope.msgs.length-1].msg);
                           }

                           $timeout(function() {$scope.pushTypingMsg();}, 1100); 
                            
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

app.directive('ngDraggable', function($document) {
  return {
    restrict: 'A',
    scope: {
      dragOptions: '=ngDraggable'
    },
    link: function(scope, elem, attr) {
      var startX, startY, x = 0, y = 0,
          start, stop, drag, container;

      var width  = elem[0].offsetWidth,
          height = elem[0].offsetHeight;

      // Obtain drag options
      if (scope.dragOptions) {
        start  = scope.dragOptions.start;
        drag   = scope.dragOptions.drag;
        stop   = scope.dragOptions.stop;
        var id = scope.dragOptions.container;
        if (id) {
            container = document.getElementById(id).getBoundingClientRect();
        }
      }

      // Bind mousedown event
      elem.on('mousedown', function(e) {
        e.preventDefault();
        startX = e.clientX - elem[0].offsetLeft;
        startY = e.clientY - elem[0].offsetTop;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        if (start) start(e);
      });

      // Handle drag event
      function mousemove(e) {
        y = e.clientY - startY;
        x = e.clientX - startX;
        setPosition();
        if (drag) drag(e);
      }

      // Unbind drag events
      function mouseup(e) {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        if (stop) stop(e);
      }

      // Move element, within container if provided
      function setPosition() {
        if (container) {
          if (x < container.left) {
            x = container.left;
          } else if (x > container.right - width) {
            x = container.right - width;
          }
          if (y < container.top) {
            y = container.top;
          } else if (y > container.bottom - height) {
            y = container.bottom - height;
          }
        }

        elem.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }
    }
  }

})
