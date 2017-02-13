app.controller('createCtrl', ['$scope', '$mdDialog', '$rootScope', '$http', '$mdToast', '$timeout', function($scope, $mdDialog, $rootScope, $http, $mdToast, $timeout){
	console.log("called createCtrl");


     $scope.createModule = function(m) {
     	$rootScope.module_open_type = "insert";
     	$scope.openModuleModel();

     }

	 $scope.openModuleModel = function() {
	    $mdDialog.show({
		      controller: 'NewModuleDialogController',
		      templateUrl: 'templates/create_module_model.html',
		      //parent: angular.app(document.body),
		      clickOutsideToClose:false,
		      fullscreen: false // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		      $scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.status = 'You cancelled the dialog.';
		    });
	  };

	  $rootScope.getModules = function() {

	  	//$rootScope.isLoading = true;
	  	$scope.isRefreshing = true;

       var res = $http.get("http://localhost:3004/api/file/read");
       res.success(function(res) {
       	console.log(res)
       	console.log($scope.modules_data = JSON.parse(res));
          	$rootScope.isLoading = false;
          	$scope.isRefreshing = false;
          	console.log($scope.modules_data)
       })
       res.error(function(res) {
       	$rootScope.isLoading = false;
       })

	  }

	  $rootScope.refresh = function () {
	  	$scope.isRefreshing = true;
	  	$mdToast.show(
						      $mdToast.simple()
						        .textContent('Refreshing Modules !')
						        .position("bottom")
						        .hideDelay(3000)
						    );
	  	$scope.getModules();
	  }


	  $scope.editModule = function(m) {
	  	console.log(m)
	  	$rootScope.module_open_type = "edit";
	  	$rootScope.selectedModuleForEdit = m;
	    $scope.openModuleModel();	
	  }

	  $scope.deleteModule = function(m) {

	  	var confirm = $mdDialog.confirm()
          .title('Would you like to delete your Module?')
          .textContent('It will not able to recover after delete ')
          .ariaLabel('Delete')
          .ok('Confirm')
          .clickOutsideToClose(true)
          .cancel('Cancel');

			    $mdDialog.show(confirm).then(function() {
			      
			       var res = $http.delete("http://localhost:3004/api/file/delete/" + m.id_);
					  	res.success(function(res) {
					  		console.log(res)
					  		$mdToast.show(
						      $mdToast.simple()
						        .textContent('Module Deleted !')
						        .position("bottom")
						        .hideDelay(3000)
						    );

					  		$timeout(function() {$rootScope.refresh();}, 2000);
					  	})


			    }, function() {
			      $mdToast.show(
						      $mdToast.simple()
						        .textContent('Cancelled Deletion !')
						        .position("bottom")
						        .hideDelay(3000)
						    );
			    });



	  	
	  }


    	$rootScope.cancel = function() {
	      $mdDialog.cancel();
	    };


	  $rootScope.getModules();





	 



	
}]);


app.directive('loader', ['$compile', function($compile){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		 template: `
            
            <div class="loader">
               <div class="dim"></div>
               <div class="content"><h2 style="color:#fff">Loading...</h2><br/>
               <md-progress-circular class="md-primary" md-diameter="40" style="left: 48%;top: -27px;"></md-progress-circular></div>

            </div>

		 `,
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}]);