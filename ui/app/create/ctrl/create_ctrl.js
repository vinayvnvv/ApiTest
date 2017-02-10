app.controller('createCtrl', ['$scope', '$mdDialog', '$rootScope', '$http', function($scope, $mdDialog, $rootScope, $http){
	console.log("called createCtrl");


	 $scope.openCreateModule = function(ev) {
	    $mdDialog.show({
		      controller: 'NewModuleDialogController',
		      templateUrl: 'templates/create_module_model.html',
		      //parent: angular.app(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: false // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		      $scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.status = 'You cancelled the dialog.';
		    });
	  };

	  $scope.getModules = function() {

       var res = $http.get("http://localhost:3004/api/file/read");
       res.success(function(res) {
       	console.log(res)
       	console.log(JSON.parse(res))
       })

	  }





	 



	
}]);