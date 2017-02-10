app.controller('createCtrl', ['$scope', '$mdDialog', '$rootScope', function($scope, $mdDialog, $rootScope){
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


	 



	
}]);