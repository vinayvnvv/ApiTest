app.controller('chatCtrl', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
	console.log("called chat ctrl");


 //  $rootScope.chat_scroller = document.getElementById("chat-scroller");
 //  $rootScope.chat_scroller_ele = (angular.element($scope.chat_scroller));

  

 //  $scope.msgs = [

 //   { 
 //     msg:"Hello World!!! Ask Help",
 //     module:23
 //   }

 //  ];

 //  //$scope.typing = "<li class='msg bot' id='typing'>Typing..</li>";

 // // $scope.chat_scroller_ele.append(ele)

 //  console.log($scope.msgs);

 //  $scope.pushTypingMsg = function() {
  	
 //  }


 //  $scope.bindQuery = function(e) {
 //  	var code = (e.keyCode ? e.keyCode : e.which);
	// 	if(code == 13) { //Enter keycode
	// 	   var new_msg = {
	// 	   	   msg:$scope.query,
	// 	   	   by:"me"
	// 	   };

		   
	// 	   //check empty
	// 	   if($scope.query.length == 0)
	// 	   	return;

	// 	   //remove typing div id if exists
 //            if($scope.msgs[$scope.msgs.length-1].mode == "typing")
 //            	$scope.msgs.pop();


	// 	   $scope.msgs.push(new_msg);
	// 	   $scope.query = "";


	// 	  $timeout(function() {

	// 	  	 //add typing div
	// 	   // $rootScope.chat_scroller_ele.append($scope.typing)
	// 	   //  $scope.chat_scroller.scrollTop = ($scope.chat_scroller.scrollHeight + 20);
	// 	   $scope.msgs.push({msg:"Typing..", mode:"typing"});
	// 	     $scope.chat_scroller.scrollTop = ($scope.chat_scroller.scrollHeight + 20);
		

	// 	  }, 1000);


	// 	   //scrooll to bottom
	// 	   console.log($scope.chat_scroller.scrollHeight)
 //            $scope.chat_scroller.scrollTop = ($scope.chat_scroller.scrollHeight + 20);
	// 	}
 //  }


}]);