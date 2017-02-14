app.controller('trackCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
	console.log("tracking ctrl is called!!");

	$scope.isLoading = true;

	$http.get("api/track/get").success(function(res) {
         $scope.track_data = res;
         $scope.isLoading = false;
	});


	$scope.back = function() {
       $state.go("manager");
	}

	
}])